import * as THREE from 'three';
import { Part, CommandPod, FuelTank, Engine, StructuralComponent } from '../types/part.js';
import { CommandPodGenerator } from '../generators/command-pod-generator.js';
import { FuelTankGenerator } from '../generators/fuel-tank-generator.js';
import { EngineGenerator } from '../generators/engine-generator.js';
import { StructuralComponentGenerator } from '../generators/structural-generator.js';

/**
 * Wraps a Part with its Three.js representation
 * Similar to CelestialBodyObject for celestial bodies
 */
export class PartObject {
  public part: Part;
  public mesh: THREE.Group;
  public isActive: boolean = false;

  // Generators (static to share across all instances)
  private static commandPodGenerator = new CommandPodGenerator();
  private static fuelTankGenerator = new FuelTankGenerator();
  private static engineGenerator = new EngineGenerator();
  private static structuralGenerator = new StructuralComponentGenerator();

  constructor(part: Part) {
    this.part = part;
    this.mesh = this.generateMesh();
    this.updateTransform();
  }

  /**
   * Generate the Three.js mesh for this part based on its type
   */
  private generateMesh(): THREE.Group {
    const category = this.part.category;

    switch (category) {
      case 'command':
        return PartObject.commandPodGenerator.generateCommandPod(this.part as CommandPod);

      case 'fuel':
        return PartObject.fuelTankGenerator.generateFuelTank(this.part as FuelTank);

      case 'propulsion':
        return PartObject.engineGenerator.generateEngine(this.part as Engine);

      case 'structural':
      case 'utility':
      case 'aerodynamic':
        return PartObject.structuralGenerator.generateStructuralComponent(this.part as StructuralComponent);

      default:
        // Fallback: create a simple placeholder cube
        console.warn(`Unknown part category: ${category}, using placeholder`);
        return this.createPlaceholder();
    }
  }

  /**
   * Create a simple placeholder mesh for unknown part types
   */
  private createPlaceholder(): THREE.Group {
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xFF00FF,
      roughness: 0.7,
      metalness: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);
    return group;
  }

  /**
   * Update the mesh position and rotation from part data
   */
  public updateTransform(): void {
    this.mesh.position.copy(this.part.position);
    this.mesh.quaternion.copy(this.part.rotation);
  }

  /**
   * Update part state (called each frame)
   */
  public update(deltaTime: number): void {
    // Update active modules
    for (const module of this.part.modules) {
      if (module.isActive) {
        this.updateModule(module, deltaTime);
      }
    }

    // Sync transform in case part moved
    this.updateTransform();
  }

  /**
   * Update a specific module
   */
  private updateModule(module: any, deltaTime: number): void {
    switch (module.type) {
      case 'engine':
        this.updateEngine(module, deltaTime);
        break;

      case 'rcs':
        this.updateRCS(module, deltaTime);
        break;

      case 'parachute':
        this.updateParachute(module, deltaTime);
        break;

      // Add other module types as needed
    }
  }

  /**
   * Update engine visuals and consume fuel
   */
  private updateEngine(module: any, deltaTime: number): void {
    if (!module.isActive || module.currentThrottle === 0) {
      // Hide exhaust effects
      this.setExhaustVisibility(false);
      return;
    }

    // Show exhaust effects
    this.setExhaustVisibility(true, module.currentThrottle);

    // Consume fuel if part has resources
    if (this.part.resources && module.fuelConsumption) {
      for (const consumption of module.fuelConsumption) {
        const resource = this.part.resources.find(
          r => r.resourceType === consumption.resourceType
        );

        if (resource) {
          const consumedAmount = consumption.rate * module.currentThrottle * deltaTime;
          resource.amount = Math.max(0, resource.amount - consumedAmount);

          // If out of fuel, deactivate engine
          if (resource.amount === 0) {
            module.isActive = false;
            module.currentThrottle = 0;
          }
        }
      }
    }
  }

  /**
   * Set exhaust effect visibility and intensity
   */
  private setExhaustVisibility(visible: boolean, throttle: number = 1.0): void {
    // Find exhaust flame mesh
    this.mesh.traverse((child) => {
      if (child.name === 'exhaust-flame' || child.name === 'ion-beam') {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = visible ? 0.7 * throttle : 0;
        }
      }

      if (child.name === 'ion-glow') {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = visible ? 0.3 * throttle : 0;
        }
      }
    });
  }

  /**
   * Update RCS (Reaction Control System)
   */
  private updateRCS(module: any, deltaTime: number): void {
    // RCS updates would go here
    // For now, just a placeholder
  }

  /**
   * Update parachute state
   */
  private updateParachute(module: any, deltaTime: number): void {
    // Parachute deployment logic would go here
    // For now, just a placeholder
  }

  /**
   * Activate a specific module
   */
  public activateModule(moduleType: string): boolean {
    const module = this.part.modules.find(m => m.type === moduleType);
    if (module && module.canToggle) {
      module.isActive = true;
      return true;
    }
    return false;
  }

  /**
   * Deactivate a specific module
   */
  public deactivateModule(moduleType: string): boolean {
    const module = this.part.modules.find(m => m.type === moduleType);
    if (module && module.canToggle) {
      module.isActive = false;

      // Special handling for engines
      if (moduleType === 'engine' && 'currentThrottle' in module) {
        module.currentThrottle = 0;
      }

      return true;
    }
    return false;
  }

  /**
   * Set engine throttle (0-1)
   */
  public setThrottle(throttle: number): boolean {
    const engineModule = this.part.modules.find(m => m.type === 'engine');
    if (engineModule && 'throttleable' in engineModule && engineModule.throttleable) {
      engineModule.currentThrottle = Math.max(0, Math.min(1, throttle));
      return true;
    }
    return false;
  }

  /**
   * Get current mass including resources
   */
  public getTotalMass(): number {
    let mass = this.part.mass;

    // Add resource mass (assuming 1 unit = 1 kg for simplicity)
    if (this.part.resources) {
      for (const resource of this.part.resources) {
        mass += resource.amount;
      }
    }

    return mass;
  }

  /**
   * Dispose of Three.js resources
   */
  public dispose(): void {
    this.mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  }
}
