import * as THREE from 'three';
import { CelestialBody, CelestialBodyData } from '../types/celestial-body.js';
import { CelestialBodyObject } from './celestial-body.js';
import { CelestialBodyGenerator } from '../generators/celestial-body-generator.js';
import { OrbitalMechanics } from './orbital-mechanics.js';
import { TimeManager } from './time-manager.js';

export class CelestialBodiesManager {
  private bodies: Map<string, CelestialBodyObject> = new Map();
  private bodyData: Map<string, CelestialBody> = new Map();
  private generator: CelestialBodyGenerator;
  private orbitalMechanics: OrbitalMechanics;
  private timeManager: TimeManager;
  private scene: THREE.Scene | null = null;
  private camera: THREE.Camera | null = null;
  private orbitLines: Map<string, THREE.Line> = new Map();
  
  constructor(timeManager: TimeManager) {
    this.generator = new CelestialBodyGenerator();
    this.orbitalMechanics = new OrbitalMechanics();
    this.timeManager = timeManager;
    
    // Listen for time changes
    this.timeManager.onTimeChange((time) => {
      this.updatePositions(time);
    });
  }
  
  /**
   * Initialize the celestial bodies manager with a scene and camera
   */
  public init(scene: THREE.Scene, camera: THREE.Camera): void {
    this.scene = scene;
    this.camera = camera;
    
    // Create skybox
    const skybox = this.generator.generateSkybox();
    scene.background = skybox;
  }
  
  /**
   * Load celestial bodies from data
   */
  public async loadFromData(data: CelestialBodyData): Promise<void> {
    for (const bodyData of data.bodies) {
      this.bodyData.set(bodyData.id, bodyData);
      const bodyObject = this.generator.generateCelestialBody(bodyData);
      this.bodies.set(bodyData.id, bodyObject);
      
      if (this.scene) {
        bodyObject.addToScene(this.scene);
      }
      
      // Create orbit line
      this.createOrbitLine(bodyData);
    }
  }
  
  /**
   * Load celestial bodies from a JSON file
   */
  public async loadFromFile(filePath: string): Promise<void> {
    try {
      const response = await fetch(filePath);
      const data: CelestialBodyData = await response.json();
      await this.loadFromData(data);
    } catch (error) {
      console.error(`Failed to load celestial bodies from ${filePath}:`, error);
    }
  }
  
  /**
   * Update all celestial bodies
   */
  public update(deltaTime: number): void {
    // Update time manager
    this.timeManager.update(deltaTime);
    
    // Update LOD for all bodies
    if (this.camera) {
      const cameraPosition = new THREE.Vector3();
      this.camera.getWorldPosition(cameraPosition);
      
      this.bodies.forEach(body => {
        body.updateLOD(cameraPosition);
      });
    }
    
    // Update body animations
    this.bodies.forEach(body => {
      body.update(deltaTime);
    });
  }
  
  /**
   * Update positions of all celestial bodies based on current time
   */
  private updatePositions(time: number): void {
    this.bodies.forEach((bodyObject, id) => {
      const bodyData = this.bodyData.get(id);
      if (!bodyData) return;
      
      // Calculate new position based on orbital mechanics
      const newPosition = this.orbitalMechanics.calculatePosition(bodyData, time);
      
      // Apply distance scaling for rendering
      const scaledPosition = this.timeManager.scalePositionForRender(newPosition);
      
      // Update the mesh position
      bodyObject.mesh.position.copy(scaledPosition);
      
      // Update LOD mesh positions
      bodyObject.lodLevels.forEach(lod => {
        lod.position.copy(scaledPosition);
      });
      
      // Update atmosphere position if it exists
      if (bodyObject.atmosphereMesh) {
        bodyObject.atmosphereMesh.position.copy(scaledPosition);
      }
    });
  }
  
  /**
   * Create an orbit line for a celestial body
   */
  private createOrbitLine(bodyData: CelestialBody): void {
    if (bodyData.orbitalElements.period === 0) {
      // No orbit for the Sun or other stationary bodies
      return;
    }
    
    const orbitData = this.orbitalMechanics.calculateOrbit(bodyData);
    
    // Scale the orbit points for rendering
    const scaledPoints = orbitData.points.map(point => 
      this.timeManager.scalePositionForRender(point)
    );
    
    // Create geometry from the points
    const geometry = new THREE.BufferGeometry().setFromPoints(scaledPoints);
    
    // Create material with the orbit color
    const material = new THREE.LineBasicMaterial({
      color: orbitData.color,
      opacity: 0.5,
      transparent: true
    });
    
    // Create the line
    const orbitLine = new THREE.Line(geometry, material);
    
    // Add to scene
    if (this.scene) {
      this.scene.add(orbitLine);
    }
    
    // Store reference
    this.orbitLines.set(bodyData.id, orbitLine);
  }
  
  /**
   * Get a celestial body by ID
   */
  public getBody(id: string): CelestialBodyObject | undefined {
    return this.bodies.get(id);
  }
  
  /**
   * Get all celestial bodies
   */
  public getAllBodies(): CelestialBodyObject[] {
    return Array.from(this.bodies.values());
  }
  
  /**
   * Get celestial bodies by type
   */
  public getBodiesByType(type: 'planet' | 'moon' | 'asteroid' | 'star'): CelestialBodyObject[] {
    return Array.from(this.bodies.values()).filter(body => 
      body.body.type === type
    );
  }
  
  /**
   * Get the data for a celestial body by ID
   */
  public getBodyData(id: string): CelestialBody | undefined {
    return this.bodyData.get(id);
  }
  
  /**
   * Focus the camera on a specific celestial body
   */
  public focusOnBody(id: string): void {
    const body = this.bodies.get(id);
    if (!body || !this.camera) return;
    
    const bodyPosition = body.mesh.position.clone();
    const bodyRadius = body.body.radius;
    
    // Calculate camera position based on body size
    const distance = Math.max(bodyRadius * 5, bodyRadius * 0.0001); // Scale down for visualization
    
    // Set camera position
    this.camera.position.set(
      bodyPosition.x + distance,
      bodyPosition.y + distance * 0.5,
      bodyPosition.z + distance
    );
    
    // Look at the body
    this.camera.lookAt(bodyPosition);
  }
  
  /**
   * Toggle orbit lines visibility
   */
  public toggleOrbitLines(visible?: boolean): void {
    const isVisible = visible !== undefined ? visible : !this.areOrbitLinesVisible();
    
    this.orbitLines.forEach(orbitLine => {
      orbitLine.visible = isVisible;
    });
  }
  
  /**
   * Check if orbit lines are visible
   */
  public areOrbitLinesVisible(): boolean {
    if (this.orbitLines.size === 0) return false;
    
    const firstOrbit = this.orbitLines.values().next().value;
    return firstOrbit ? firstOrbit.visible : false;
  }
  
  /**
   * Set the visibility of a specific celestial body
   */
  public setBodyVisibility(id: string, visible: boolean): void {
    const body = this.bodies.get(id);
    if (!body) return;
    
    body.mesh.visible = visible;
    
    // Update LOD meshes
    body.lodLevels.forEach(lod => {
      lod.visible = visible && lod === body.lodLevels[body.currentLOD];
    });
    
    // Update atmosphere
    if (body.atmosphereMesh) {
      body.atmosphereMesh.visible = visible;
    }
  }
  
  /**
   * Get the orbital mechanics calculator
   */
  public getOrbitalMechanics(): OrbitalMechanics {
    return this.orbitalMechanics;
  }
  
  /**
   * Get the time manager
   */
  public getTimeManager(): TimeManager {
    return this.timeManager;
  }
  
  /**
   * Clean up resources
   */
  public dispose(): void {
    // Remove all bodies from scene
    if (this.scene) {
      this.bodies.forEach(body => {
        body.removeFromScene(this.scene!);
      });
      
      this.orbitLines.forEach(orbitLine => {
        this.scene!.remove(orbitLine);
      });
    }
    
    // Clear maps
    this.bodies.clear();
    this.bodyData.clear();
    this.orbitLines.clear();
  }
}