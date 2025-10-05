import * as THREE from 'three';
import { Vehicle } from './vehicle.js';
import { VehicleManager } from './vehicle-manager.js';
import { InputManager } from './input-manager.js';
import { Part, AttachPoint } from '../types/part.js';
import { PartObject } from './part.js';

/**
 * Manages part placement in the assembly editor
 * Handles raycasting, snapping to attachment points, and placement validation
 */
export class PartPlacement {
  private vehicleManager: VehicleManager;
  private vehicle: Vehicle;
  private inputManager: InputManager;
  private camera: THREE.Camera;
  private domElement: HTMLElement;

  // Raycasting
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  // Current placement state
  private selectedPartTemplate: Part | null = null;
  private ghostPart: PartObject | null = null;
  private ghostGroup: THREE.Group | null = null;
  private hoveredPart: PartObject | null = null;
  private hoveredAttachPoint: AttachPoint | null = null;

  // Symmetry mode
  private symmetryMode: number = 1; // 1, 2, 3, 4, 6, 8
  private symmetryAxis: 'x' | 'y' | 'z' = 'y';

  // Highlighting
  private highlightedMeshes: THREE.Mesh[] = [];
  private originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map();

  // Attach point visualization
  private attachPointMarkers: THREE.Group[] = [];

  constructor(
    vehicleManager: VehicleManager,
    vehicle: Vehicle,
    inputManager: InputManager,
    camera: THREE.Camera,
    domElement: HTMLElement
  ) {
    this.vehicleManager = vehicleManager;
    this.vehicle = vehicle;
    this.inputManager = inputManager;
    this.camera = camera;
    this.domElement = domElement;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Set up mouse event listeners
    this.setupEventListeners();
  }

  /**
   * Set up mouse event listeners
   */
  private setupEventListeners(): void {
    this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.domElement.addEventListener('click', this.onClick.bind(this));
  }

  /**
   * Handle mouse move
   */
  private onMouseMove(event: MouseEvent): void {
    // Calculate normalized device coordinates
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  /**
   * Handle click
   */
  private onClick(_event: MouseEvent): void {
    if (this.ghostPart && this.hoveredAttachPoint) {
      this.placePart();
    }
  }

  /**
   * Select a part template to place
   */
  public selectPartTemplate(partTemplateId: string): void {
    const template = this.vehicleManager.getPartTemplate(partTemplateId);
    if (!template) {
      console.error(`Part template ${partTemplateId} not found`);
      return;
    }

    this.selectedPartTemplate = template;

    // Create ghost preview
    this.createGhostPart();
  }

  /**
   * Create ghost part for preview
   */
  private createGhostPart(): void {
    // Remove existing ghost
    this.removeGhostPart();

    if (!this.selectedPartTemplate) return;

    // Create a new part instance
    const newPart = this.vehicleManager.createPartFromTemplate(this.selectedPartTemplate.id);
    if (!newPart) return;

    // Create ghost part object
    this.ghostPart = new PartObject(newPart);

    // Make it semi-transparent
    this.ghostGroup = new THREE.Group();
    this.ghostGroup.add(this.ghostPart.mesh);

    this.ghostPart.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(mat => {
            if (mat instanceof THREE.Material) {
              mat.transparent = true;
              mat.opacity = 0.5;
              mat.depthWrite = false;
            }
          });
        }
      }
    });

    // Add to scene (will be positioned in update)
    if (this.vehicle.group.parent) {
      this.vehicle.group.parent.add(this.ghostGroup);
    }
  }

  /**
   * Remove ghost part
   */
  private removeGhostPart(): void {
    if (this.ghostGroup && this.ghostGroup.parent) {
      this.ghostGroup.parent.remove(this.ghostGroup);
    }

    if (this.ghostPart) {
      this.ghostPart.dispose();
      this.ghostPart = null;
    }

    this.ghostGroup = null;
  }

  /**
   * Cancel current part placement
   */
  public cancelPlacement(): void {
    this.selectedPartTemplate = null;
    this.removeGhostPart();
    this.clearHighlight();
    this.clearAttachPointMarkers();
  }

  /**
   * Place the current ghost part
   */
  private placePart(): void {
    if (!this.ghostPart || !this.hoveredAttachPoint || !this.hoveredPart) {
      return;
    }

    // Create actual part instances based on symmetry mode
    const parts = this.createSymmetricParts();

    for (const part of parts) {
      this.vehicle.addPart(part);
    }

    // Clear selection
    this.cancelPlacement();

    console.log(`Placed ${parts.length} part(s)`);
  }

  /**
   * Create parts with symmetry
   */
  private createSymmetricParts(): Part[] {
    if (!this.ghostPart || !this.selectedPartTemplate) {
      return [];
    }

    const parts: Part[] = [];
    const basePart = this.ghostPart.part;

    // Create primary part
    const primaryPart = this.vehicleManager.createPartFromTemplate(this.selectedPartTemplate.id)!;
    primaryPart.position.copy(basePart.position);
    primaryPart.rotation.copy(basePart.rotation);
    primaryPart.attachedTo = basePart.attachedTo;
    parts.push(primaryPart);

    // Create symmetric parts
    if (this.symmetryMode > 1) {
      for (let i = 1; i < this.symmetryMode; i++) {
        const angle = (360 / this.symmetryMode) * i * (Math.PI / 180);
        const symmetricPart = this.vehicleManager.createPartFromTemplate(this.selectedPartTemplate.id)!;

        // Rotate position around symmetry axis
        const rotatedPos = this.rotateAroundAxis(
          basePart.position.clone(),
          this.symmetryAxis,
          angle
        );

        symmetricPart.position.copy(rotatedPos);
        symmetricPart.rotation.copy(basePart.rotation); // TODO: Also rotate the part's orientation
        symmetricPart.attachedTo = basePart.attachedTo;

        parts.push(symmetricPart);
      }
    }

    return parts;
  }

  /**
   * Rotate a vector around an axis
   */
  private rotateAroundAxis(vec: THREE.Vector3, axis: 'x' | 'y' | 'z', angle: number): THREE.Vector3 {
    const quaternion = new THREE.Quaternion();

    switch (axis) {
      case 'x':
        quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
        break;
      case 'y':
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
        break;
      case 'z':
        quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
        break;
    }

    vec.applyQuaternion(quaternion);
    return vec;
  }

  /**
   * Set symmetry mode
   */
  public setSymmetryMode(mode: number): void {
    if ([1, 2, 3, 4, 6, 8].includes(mode)) {
      this.symmetryMode = mode;
      console.log(`Symmetry mode set to ${mode}x`);
    }
  }

  /**
   * Get current symmetry mode
   */
  public getSymmetryMode(): number {
    return this.symmetryMode;
  }

  /**
   * Update (called each frame)
   */
  public update(): void {
    // Handle keyboard shortcuts
    this.handleKeyboardInput();

    // Update raycasting
    this.updateRaycasting();

    // Update ghost part position
    if (this.ghostPart && this.ghostGroup) {
      this.updateGhostPosition();
    }
  }

  /**
   * Handle keyboard input
   */
  private handleKeyboardInput(): void {
    // Cancel placement with Escape
    if (this.inputManager.isKeyPressed('Escape')) {
      this.cancelPlacement();
    }

    // Symmetry mode shortcuts
    if (this.inputManager.isKeyPressed('Digit1')) {
      this.setSymmetryMode(1);
    } else if (this.inputManager.isKeyPressed('Digit2')) {
      this.setSymmetryMode(2);
    } else if (this.inputManager.isKeyPressed('Digit3')) {
      this.setSymmetryMode(3);
    } else if (this.inputManager.isKeyPressed('Digit4')) {
      this.setSymmetryMode(4);
    } else if (this.inputManager.isKeyPressed('Digit6')) {
      this.setSymmetryMode(6);
    } else if (this.inputManager.isKeyPressed('Digit8')) {
      this.setSymmetryMode(8);
    }
  }

  /**
   * Update raycasting to find hovered parts and attach points
   */
  private updateRaycasting(): void {
    // Clear previous highlighting
    this.clearHighlight();
    this.clearAttachPointMarkers();

    this.hoveredPart = null;
    this.hoveredAttachPoint = null;

    // Only raycast if we have a part selected
    if (!this.selectedPartTemplate) {
      return;
    }

    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Get all meshes in the vehicle
    const meshes: THREE.Mesh[] = [];
    this.vehicle.group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
      }
    });

    // Perform raycast
    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;

      // Find which part this mesh belongs to
      let parentGroup: THREE.Object3D | null = intersectedMesh;
      while (parentGroup && parentGroup.parent !== this.vehicle.group) {
        parentGroup = parentGroup.parent;
      }

      if (parentGroup) {
        // Find the PartObject
        for (const partObject of this.vehicle.getAllParts()) {
          if (partObject.mesh === parentGroup) {
            this.hoveredPart = partObject;
            break;
          }
        }

        if (this.hoveredPart) {
          // Highlight the part
          this.highlightPart(this.hoveredPart);

          // Find closest attach point
          const worldIntersectPoint = intersects[0].point;
          this.hoveredAttachPoint = this.findClosestAttachPoint(
            this.hoveredPart,
            worldIntersectPoint
          );

          if (this.hoveredAttachPoint) {
            // Show attach point marker
            this.showAttachPointMarker(this.hoveredPart, this.hoveredAttachPoint);
          }
        }
      }
    }
  }

  /**
   * Find closest attach point to a world position
   */
  private findClosestAttachPoint(partObject: PartObject, worldPoint: THREE.Vector3): AttachPoint | null {
    let closest: AttachPoint | null = null;
    let minDistance = Infinity;

    for (const attachPoint of partObject.part.attachPoints) {
      // Convert attach point to world coordinates
      const worldAttachPoint = attachPoint.position.clone();
      worldAttachPoint.add(partObject.part.position);

      const distance = worldAttachPoint.distanceTo(worldPoint);

      if (distance < minDistance) {
        minDistance = distance;
        closest = attachPoint;
      }
    }

    // Only return if within reasonable distance (2 meters)
    return minDistance < 2 ? closest : null;
  }

  /**
   * Update ghost part position based on hovered attach point
   */
  private updateGhostPosition(): void {
    if (!this.ghostPart || !this.ghostGroup || !this.hoveredAttachPoint || !this.hoveredPart) {
      // Hide ghost if no valid attach point
      this.ghostGroup!.visible = false;
      return;
    }

    this.ghostGroup.visible = true;

    // Calculate world position of attach point
    const attachPoint = this.hoveredAttachPoint;
    const targetPos = attachPoint.position.clone().add(this.hoveredPart.part.position);

    // Offset based on attachment type and part's attach points
    // Find the matching attach point on the ghost part
    const ghostAttachPoint = this.ghostPart.part.attachPoints[0]; // Simplified: use first attach point

    if (ghostAttachPoint) {
      const offset = ghostAttachPoint.position.clone().negate();
      targetPos.add(offset);
    }

    // Set position
    this.ghostGroup.position.copy(targetPos);

    // Set attachment info
    this.ghostPart.part.attachedTo = {
      partId: this.hoveredPart.part.id,
      attachPointId: attachPoint.id
    };
  }

  /**
   * Highlight a part
   */
  private highlightPart(partObject: PartObject): void {
    partObject.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Store original material
        if (!this.originalMaterials.has(child)) {
          this.originalMaterials.set(child, child.material);
        }

        // Create highlighted material
        const highlightMaterial = new THREE.MeshStandardMaterial({
          color: 0x00ff00,
          emissive: 0x00ff00,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.7
        });

        child.material = highlightMaterial;
        this.highlightedMeshes.push(child);
      }
    });
  }

  /**
   * Clear highlighting
   */
  private clearHighlight(): void {
    for (const mesh of this.highlightedMeshes) {
      const originalMaterial = this.originalMaterials.get(mesh);
      if (originalMaterial) {
        mesh.material = originalMaterial;
      }
    }

    this.highlightedMeshes = [];
    this.originalMaterials.clear();
  }

  /**
   * Show attach point marker
   */
  private showAttachPointMarker(partObject: PartObject, attachPoint: AttachPoint): void {
    const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.8
    });

    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    // Position in world space
    const worldPos = attachPoint.position.clone().add(partObject.part.position);
    marker.position.copy(worldPos);

    // Add to scene
    if (this.vehicle.group.parent) {
      const markerGroup = new THREE.Group();
      markerGroup.add(marker);
      this.vehicle.group.parent.add(markerGroup);
      this.attachPointMarkers.push(markerGroup);
    }
  }

  /**
   * Clear attach point markers
   */
  private clearAttachPointMarkers(): void {
    for (const marker of this.attachPointMarkers) {
      if (marker.parent) {
        marker.parent.remove(marker);
      }

      // Dispose geometry and material
      marker.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });
    }

    this.attachPointMarkers = [];
  }

  /**
   * Dispose of resources
   */
  public dispose(): void {
    this.cancelPlacement();
    this.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this));
    this.domElement.removeEventListener('click', this.onClick.bind(this));
  }
}
