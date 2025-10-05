import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { Part, Stage, Vehicle as VehicleData } from '../types/part.js';
import { PartObject } from './part.js';
import { PhysicsWorld } from './physics-world.js';

/**
 * Represents an assembled vehicle (rocket/spacecraft) in the game
 * Manages the physics, structure, and behavior of connected parts
 */
export class Vehicle {
  public id: string;
  public name: string;
  public parts: Map<string, PartObject>;
  public rootPartId: string;
  public stages: Stage[];

  // Three.js representation
  public group: THREE.Group;

  // Physics
  private rigidBody: RAPIER.RigidBody | null = null;
  private physicsWorld: PhysicsWorld | null = null;

  // Computed properties
  private _totalMass: number = 0;
  private _centerOfMass: THREE.Vector3 = new THREE.Vector3();
  private _centerOfThrust: THREE.Vector3 = new THREE.Vector3();
  private _momentOfInertia: THREE.Vector3 = new THREE.Vector3(1, 1, 1);

  // Part connections graph (for structure validation)
  private connections: Map<string, string[]> = new Map();

  // State
  public position: THREE.Vector3 = new THREE.Vector3();
  public rotation: THREE.Quaternion = new THREE.Quaternion();
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public angularVelocity: THREE.Vector3 = new THREE.Vector3();

  constructor(id: string, name: string, rootPartId: string) {
    this.id = id;
    this.name = name;
    this.rootPartId = rootPartId;
    this.parts = new Map();
    this.stages = [];
    this.group = new THREE.Group();
    this.group.name = `vehicle-${id}`;
  }

  /**
   * Add a part to the vehicle
   */
  public addPart(part: Part): PartObject {
    const partObject = new PartObject(part);
    this.parts.set(part.id, partObject);
    this.group.add(partObject.mesh);

    // Update connections graph
    if (part.attachedTo) {
      this.addConnection(part.id, part.attachedTo.partId);
    }

    // Recalculate vehicle properties
    this.recalculateProperties();

    return partObject;
  }

  /**
   * Remove a part from the vehicle
   */
  public removePart(partId: string): boolean {
    const partObject = this.parts.get(partId);
    if (!partObject) return false;

    // Remove from scene
    this.group.remove(partObject.mesh);

    // Dispose of Three.js resources
    partObject.dispose();

    // Remove from parts map
    this.parts.delete(partId);

    // Remove from connections
    this.removeConnection(partId);

    // Check if vehicle is still valid
    if (partId === this.rootPartId && this.parts.size > 0) {
      // If we removed the root, find a new root
      const firstCommandPod = Array.from(this.parts.values()).find(
        p => p.part.category === 'command'
      );
      if (firstCommandPod) {
        this.rootPartId = firstCommandPod.part.id;
      } else {
        // No command pod, use any part as root
        this.rootPartId = this.parts.keys().next().value;
      }
    }

    // Recalculate vehicle properties
    this.recalculateProperties();

    return true;
  }

  /**
   * Get a part by ID
   */
  public getPart(partId: string): PartObject | undefined {
    return this.parts.get(partId);
  }

  /**
   * Get all parts as an array
   */
  public getAllParts(): PartObject[] {
    return Array.from(this.parts.values());
  }

  /**
   * Add a connection between two parts
   */
  private addConnection(partId: string, connectedPartId: string): void {
    if (!this.connections.has(partId)) {
      this.connections.set(partId, []);
    }
    if (!this.connections.has(connectedPartId)) {
      this.connections.set(connectedPartId, []);
    }

    this.connections.get(partId)!.push(connectedPartId);
    this.connections.get(connectedPartId)!.push(partId);
  }

  /**
   * Remove all connections for a part
   */
  private removeConnection(partId: string): void {
    const connectedParts = this.connections.get(partId) || [];

    // Remove this part from all connected parts' lists
    for (const connectedPartId of connectedParts) {
      const connections = this.connections.get(connectedPartId);
      if (connections) {
        const index = connections.indexOf(partId);
        if (index > -1) {
          connections.splice(index, 1);
        }
      }
    }

    // Remove this part's connections
    this.connections.delete(partId);
  }

  /**
   * Recalculate all vehicle properties (mass, CoM, CoT, etc.)
   */
  public recalculateProperties(): void {
    this.calculateTotalMass();
    this.calculateCenterOfMass();
    this.calculateCenterOfThrust();
    this.calculateMomentOfInertia();
  }

  /**
   * Calculate total mass of the vehicle
   */
  private calculateTotalMass(): void {
    this._totalMass = 0;
    for (const partObject of this.parts.values()) {
      this._totalMass += partObject.getTotalMass();
    }
  }

  /**
   * Calculate center of mass
   */
  private calculateCenterOfMass(): void {
    if (this.parts.size === 0) {
      this._centerOfMass.set(0, 0, 0);
      return;
    }

    const weightedSum = new THREE.Vector3(0, 0, 0);
    let totalMass = 0;

    for (const partObject of this.parts.values()) {
      const partMass = partObject.getTotalMass();
      const partPos = partObject.part.position.clone();

      weightedSum.add(partPos.multiplyScalar(partMass));
      totalMass += partMass;
    }

    if (totalMass > 0) {
      this._centerOfMass.copy(weightedSum.divideScalar(totalMass));
    } else {
      this._centerOfMass.set(0, 0, 0);
    }
  }

  /**
   * Calculate center of thrust from active engines
   */
  private calculateCenterOfThrust(): void {
    const weightedSum = new THREE.Vector3(0, 0, 0);
    let totalThrust = 0;

    for (const partObject of this.parts.values()) {
      const engineModule = partObject.part.modules.find(m => m.type === 'engine');

      if (engineModule && engineModule.isActive && engineModule.thrust) {
        const thrust = engineModule.thrust;
        const partPos = partObject.part.position.clone();

        weightedSum.add(partPos.multiplyScalar(thrust));
        totalThrust += thrust;
      }
    }

    if (totalThrust > 0) {
      this._centerOfThrust.copy(weightedSum.divideScalar(totalThrust));
    } else {
      this._centerOfThrust.copy(this._centerOfMass);
    }
  }

  /**
   * Calculate moment of inertia tensor (simplified to principal axes)
   */
  private calculateMomentOfInertia(): void {
    if (this.parts.size === 0) {
      this._momentOfInertia.set(1, 1, 1);
      return;
    }

    let Ixx = 0, Iyy = 0, Izz = 0;

    for (const partObject of this.parts.values()) {
      const mass = partObject.getTotalMass();
      const pos = partObject.part.position.clone().sub(this._centerOfMass);

      // Parallel axis theorem
      Ixx += mass * (pos.y * pos.y + pos.z * pos.z);
      Iyy += mass * (pos.x * pos.x + pos.z * pos.z);
      Izz += mass * (pos.x * pos.x + pos.y * pos.y);
    }

    this._momentOfInertia.set(
      Math.max(Ixx, 0.1),
      Math.max(Iyy, 0.1),
      Math.max(Izz, 0.1)
    );
  }

  /**
   * Get total mass
   */
  public getTotalMass(): number {
    return this._totalMass;
  }

  /**
   * Get dry mass (without fuel)
   */
  public getDryMass(): number {
    let dryMass = 0;
    for (const partObject of this.parts.values()) {
      dryMass += partObject.part.mass;
    }
    return dryMass;
  }

  /**
   * Get center of mass
   */
  public getCenterOfMass(): THREE.Vector3 {
    return this._centerOfMass.clone();
  }

  /**
   * Get center of thrust
   */
  public getCenterOfThrust(): THREE.Vector3 {
    return this._centerOfThrust.clone();
  }

  /**
   * Get moment of inertia
   */
  public getMomentOfInertia(): THREE.Vector3 {
    return this._momentOfInertia.clone();
  }

  /**
   * Calculate delta-v for a specific stage
   */
  public calculateDeltaV(stageIndex: number): number {
    // Get parts in this stage and all subsequent stages
    const partsInStage = new Set<string>();
    for (let i = stageIndex; i < this.stages.length; i++) {
      this.stages[i].partIds.forEach(id => partsInStage.add(id));
    }

    // Calculate mass before and after stage
    let wetMass = 0;
    let dryMass = 0;
    let totalIsp = 0;
    let engineCount = 0;

    for (const [partId, partObject] of this.parts.entries()) {
      if (partsInStage.has(partId)) {
        wetMass += partObject.getTotalMass();
        dryMass += partObject.part.mass;

        // Get engine Isp
        const engineModule = partObject.part.modules.find(m => m.type === 'engine');
        if (engineModule && engineModule.specificImpulse) {
          totalIsp += engineModule.specificImpulse;
          engineCount++;
        }
      }
    }

    if (engineCount === 0 || wetMass === 0 || dryMass === 0) {
      return 0;
    }

    const avgIsp = totalIsp / engineCount;
    const g0 = 9.80665; // Standard gravity

    // Tsiolkovsky rocket equation: Δv = Isp * g0 * ln(m0 / mf)
    return avgIsp * g0 * Math.log(wetMass / dryMass);
  }

  /**
   * Calculate thrust-to-weight ratio
   */
  public calculateTWR(gravityAccel: number = 9.80665): number {
    let totalThrust = 0;

    for (const partObject of this.parts.values()) {
      const engineModule = partObject.part.modules.find(m => m.type === 'engine');
      if (engineModule && engineModule.thrust) {
        totalThrust += engineModule.thrust * (engineModule.currentThrottle || 0);
      }
    }

    const weight = this._totalMass * gravityAccel;
    return weight > 0 ? totalThrust / weight : 0;
  }

  /**
   * Activate a stage
   */
  public activateStage(stageIndex: number): void {
    if (stageIndex < 0 || stageIndex >= this.stages.length) {
      return;
    }

    const stage = this.stages[stageIndex];

    for (const partId of stage.partIds) {
      const partObject = this.parts.get(partId);
      if (!partObject) continue;

      if (stage.action === 'activate') {
        // Activate engines or other modules
        for (const module of partObject.part.modules) {
          if (module.canToggle) {
            module.isActive = true;
          }
        }
      } else if (stage.action === 'decouple') {
        // Find decoupler module and activate it
        const decouplerModule = partObject.part.modules.find(m => m.type === 'decoupler');
        if (decouplerModule) {
          decouplerModule.isActive = true;
          decouplerModule.isDecoupled = true;

          // TODO: Apply separation force and split vehicle
          this.separatePart(partId, decouplerModule.ejectionForce || 0);
        }
      }
    }

    // Recalculate after stage activation
    this.recalculateProperties();
  }

  /**
   * Separate a part from the vehicle (for staging)
   */
  private separatePart(partId: string, ejectionForce: number): void {
    // Get all parts connected to this part (downstream)
    const partsToRemove = this.getDownstreamParts(partId);

    // Remove all downstream parts
    for (const id of partsToRemove) {
      this.removePart(id);
    }

    // TODO: Create a new separate vehicle entity for the separated parts
    // This would require integration with a VehicleManager
  }

  /**
   * Get all parts downstream from a given part (BFS)
   */
  private getDownstreamParts(partId: string): string[] {
    const downstream: string[] = [];
    const visited = new Set<string>();
    const queue: string[] = [partId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;

      visited.add(current);
      downstream.push(current);

      const connections = this.connections.get(current) || [];
      for (const connectedId of connections) {
        if (!visited.has(connectedId)) {
          // Only add if it's truly downstream (not the parent)
          const connectedPart = this.parts.get(connectedId);
          if (connectedPart && connectedPart.part.attachedTo?.partId === current) {
            queue.push(connectedId);
          }
        }
      }
    }

    return downstream;
  }

  /**
   * Initialize physics for this vehicle
   */
  public initPhysics(physicsWorld: PhysicsWorld, position: THREE.Vector3): void {
    this.physicsWorld = physicsWorld;

    // Create rigid body descriptor
    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(position.x, position.y, position.z)
      .setAdditionalMass(this._totalMass);

    this.rigidBody = this.physicsWorld.world.createRigidBody(rigidBodyDesc);

    // Create collider for each part
    for (const partObject of this.parts.values()) {
      // Simplified: use bounding sphere for collision
      const boundingSphere = new THREE.Sphere();
      partObject.mesh.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry) {
          child.geometry.computeBoundingSphere();
          if (child.geometry.boundingSphere) {
            boundingSphere.union(child.geometry.boundingSphere);
          }
        }
      });

      const radius = Math.max(boundingSphere.radius, 0.1);
      const colliderDesc = RAPIER.ColliderDesc.ball(radius)
        .setTranslation(
          partObject.part.position.x,
          partObject.part.position.y,
          partObject.part.position.z
        )
        .setDensity(1.0);

      this.physicsWorld.world.createCollider(colliderDesc, this.rigidBody);
    }
  }

  /**
   * Update vehicle (called each frame)
   */
  public update(deltaTime: number): void {
    // Update all parts
    for (const partObject of this.parts.values()) {
      partObject.update(deltaTime);
    }

    // Sync with physics if active
    if (this.rigidBody) {
      const translation = this.rigidBody.translation();
      this.position.set(translation.x, translation.y, translation.z);
      this.group.position.copy(this.position);

      const rotation = this.rigidBody.rotation();
      this.rotation.set(rotation.x, rotation.y, rotation.z, rotation.w);
      this.group.quaternion.copy(this.rotation);

      const linvel = this.rigidBody.linvel();
      this.velocity.set(linvel.x, linvel.y, linvel.z);

      const angvel = this.rigidBody.angvel();
      this.angularVelocity.set(angvel.x, angvel.y, angvel.z);
    }
  }

  /**
   * Apply thrust from engines
   */
  public applyThrust(deltaTime: number): void {
    if (!this.rigidBody) return;

    const totalForce = new THREE.Vector3();
    const totalTorque = new THREE.Vector3();

    for (const partObject of this.parts.values()) {
      const engineModule = partObject.part.modules.find(m => m.type === 'engine');

      if (engineModule && engineModule.isActive && engineModule.thrust) {
        const throttle = engineModule.currentThrottle || 0;
        const thrust = engineModule.thrust * throttle;

        // Thrust direction (local -Y for engines pointing down)
        const thrustDir = new THREE.Vector3(0, 1, 0);
        thrustDir.applyQuaternion(partObject.part.rotation);
        thrustDir.applyQuaternion(this.rotation);

        const force = thrustDir.multiplyScalar(thrust);
        totalForce.add(force);

        // Calculate torque from off-center thrust
        const leverArm = partObject.part.position.clone().sub(this._centerOfMass);
        const torque = leverArm.clone().cross(force);
        totalTorque.add(torque);
      }
    }

    // Apply forces
    if (totalForce.lengthSq() > 0) {
      this.rigidBody.addForce(
        { x: totalForce.x, y: totalForce.y, z: totalForce.z },
        true
      );
    }

    if (totalTorque.lengthSq() > 0) {
      this.rigidBody.addTorque(
        { x: totalTorque.x, y: totalTorque.y, z: totalTorque.z },
        true
      );
    }
  }

  /**
   * Set throttle for all engines
   */
  public setThrottle(throttle: number): void {
    const clampedThrottle = Math.max(0, Math.min(1, throttle));

    for (const partObject of this.parts.values()) {
      const engineModule = partObject.part.modules.find(m => m.type === 'engine');
      if (engineModule && engineModule.throttleable) {
        engineModule.currentThrottle = clampedThrottle;
      }
    }
  }

  /**
   * Serialize vehicle to JSON
   */
  public toJSON(): VehicleData {
    const parts: Part[] = [];
    for (const partObject of this.parts.values()) {
      parts.push(partObject.part);
    }

    return {
      id: this.id,
      name: this.name,
      parts: parts,
      rootPartId: this.rootPartId,
      totalMass: this._totalMass,
      centerOfMass: this._centerOfMass,
      centerOfThrust: this._centerOfThrust,
      stages: this.stages
    };
  }

  /**
   * Dispose of all resources
   */
  public dispose(): void {
    // Dispose all parts
    for (const partObject of this.parts.values()) {
      partObject.dispose();
    }

    // Remove physics body
    if (this.rigidBody && this.physicsWorld) {
      this.physicsWorld.world.removeRigidBody(this.rigidBody);
      this.rigidBody = null;
    }

    this.parts.clear();
    this.connections.clear();
  }
}
