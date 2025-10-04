import * as CANNON from 'cannon-es';
import * as THREE from 'three';

/**
 * Collision groups for physics bodies
 */
export enum CollisionGroup {
  CELESTIAL_BODY = 1,
  VEHICLE = 2,
  PARTICLE = 4,
  TERRAIN = 8,
}

/**
 * PhysicsWorld manages the Cannon.js physics simulation
 * Handles collision detection, rigid body physics, and integration with the game world
 */
export class PhysicsWorld {
  private world: CANNON.World;
  private bodies: Map<string, CANNON.Body> = new Map();
  private fixedTimeStep: number = 1 / 60; // 60 FPS physics
  private maxSubSteps: number = 3;

  constructor() {
    // Create the physics world
    this.world = new CANNON.World();

    // Set gravity to zero - we'll handle gravity with our custom N-body system
    // Cannon.js will only be used for collision detection and rigid body dynamics
    this.world.gravity.set(0, 0, 0);

    // Configure world parameters
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.solver.tolerance = 0.01;

    // Allow bodies to sleep for performance
    this.world.allowSleep = true;

    console.log('PhysicsWorld initialized');
  }

  /**
   * Update the physics simulation
   */
  public update(deltaTime: number, timeScale: number = 1): void {
    // Apply time scaling to physics
    const scaledDeltaTime = deltaTime * timeScale;

    // Step the physics world with fixed timestep
    this.world.step(this.fixedTimeStep, scaledDeltaTime, this.maxSubSteps);
  }

  /**
   * Add a physics body to the world
   */
  public addBody(id: string, body: CANNON.Body): void {
    this.world.addBody(body);
    this.bodies.set(id, body);
  }

  /**
   * Remove a physics body from the world
   */
  public removeBody(id: string): void {
    const body = this.bodies.get(id);
    if (body) {
      this.world.removeBody(body);
      this.bodies.delete(id);
    }
  }

  /**
   * Get a physics body by ID
   */
  public getBody(id: string): CANNON.Body | undefined {
    return this.bodies.get(id);
  }

  /**
   * Create a sphere physics body for a celestial body
   */
  public createCelestialBody(
    id: string,
    radius: number,
    mass: number,
    position: THREE.Vector3
  ): CANNON.Body {
    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
      mass: 0, // Celestial bodies are static in the physics world
      shape: shape,
      position: new CANNON.Vec3(position.x, position.y, position.z),
      collisionFilterGroup: CollisionGroup.CELESTIAL_BODY,
      collisionFilterMask: CollisionGroup.VEHICLE | CollisionGroup.PARTICLE,
    });

    this.addBody(id, body);
    return body;
  }

  /**
   * Create a physics body for a vehicle
   */
  public createVehicleBody(
    id: string,
    shape: CANNON.Shape,
    mass: number,
    position: THREE.Vector3,
    rotation?: THREE.Quaternion
  ): CANNON.Body {
    const body = new CANNON.Body({
      mass: mass,
      shape: shape,
      position: new CANNON.Vec3(position.x, position.y, position.z),
      collisionFilterGroup: CollisionGroup.VEHICLE,
      collisionFilterMask: CollisionGroup.CELESTIAL_BODY | CollisionGroup.TERRAIN | CollisionGroup.VEHICLE,
    });

    if (rotation) {
      body.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    }

    this.addBody(id, body);
    return body;
  }

  /**
   * Apply a force to a physics body
   */
  public applyForce(id: string, force: THREE.Vector3, worldPoint?: THREE.Vector3): void {
    const body = this.bodies.get(id);
    if (body) {
      const cannonForce = new CANNON.Vec3(force.x, force.y, force.z);
      if (worldPoint) {
        const cannonPoint = new CANNON.Vec3(worldPoint.x, worldPoint.y, worldPoint.z);
        body.applyForce(cannonForce, cannonPoint);
      } else {
        body.applyForce(cannonForce);
      }
    }
  }

  /**
   * Apply an impulse to a physics body
   */
  public applyImpulse(id: string, impulse: THREE.Vector3, worldPoint?: THREE.Vector3): void {
    const body = this.bodies.get(id);
    if (body) {
      const cannonImpulse = new CANNON.Vec3(impulse.x, impulse.y, impulse.z);
      if (worldPoint) {
        const cannonPoint = new CANNON.Vec3(worldPoint.x, worldPoint.y, worldPoint.z);
        body.applyImpulse(cannonImpulse, cannonPoint);
      } else {
        body.applyImpulse(cannonImpulse);
      }
    }
  }

  /**
   * Get the position of a physics body
   */
  public getPosition(id: string): THREE.Vector3 | null {
    const body = this.bodies.get(id);
    if (body) {
      return new THREE.Vector3(body.position.x, body.position.y, body.position.z);
    }
    return null;
  }

  /**
   * Get the velocity of a physics body
   */
  public getVelocity(id: string): THREE.Vector3 | null {
    const body = this.bodies.get(id);
    if (body) {
      return new THREE.Vector3(body.velocity.x, body.velocity.y, body.velocity.z);
    }
    return null;
  }

  /**
   * Set the position of a physics body
   */
  public setPosition(id: string, position: THREE.Vector3): void {
    const body = this.bodies.get(id);
    if (body) {
      body.position.set(position.x, position.y, position.z);
    }
  }

  /**
   * Set the velocity of a physics body
   */
  public setVelocity(id: string, velocity: THREE.Vector3): void {
    const body = this.bodies.get(id);
    if (body) {
      body.velocity.set(velocity.x, velocity.y, velocity.z);
    }
  }

  /**
   * Get the rotation of a physics body
   */
  public getRotation(id: string): THREE.Quaternion | null {
    const body = this.bodies.get(id);
    if (body) {
      return new THREE.Quaternion(
        body.quaternion.x,
        body.quaternion.y,
        body.quaternion.z,
        body.quaternion.w
      );
    }
    return null;
  }

  /**
   * Set the rotation of a physics body
   */
  public setRotation(id: string, rotation: THREE.Quaternion): void {
    const body = this.bodies.get(id);
    if (body) {
      body.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    }
  }

  /**
   * Raycast from a point in a direction
   */
  public raycast(
    from: THREE.Vector3,
    to: THREE.Vector3,
    options?: {
      skipBackfaces?: boolean;
      collisionFilterMask?: number;
      collisionFilterGroup?: number;
    }
  ): CANNON.RaycastResult | null {
    const fromVec = new CANNON.Vec3(from.x, from.y, from.z);
    const toVec = new CANNON.Vec3(to.x, to.y, to.z);

    const result = new CANNON.RaycastResult();
    const hasHit = this.world.raycastClosest(
      fromVec,
      toVec,
      {
        skipBackfaces: options?.skipBackfaces ?? false,
        collisionFilterMask: options?.collisionFilterMask ?? -1,
        collisionFilterGroup: options?.collisionFilterGroup ?? -1,
      },
      result
    );

    return hasHit ? result : null;
  }

  /**
   * Get the Cannon.js world instance
   */
  public getWorld(): CANNON.World {
    return this.world;
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    // Remove all bodies
    this.bodies.forEach((body) => {
      this.world.removeBody(body);
    });
    this.bodies.clear();

    console.log('PhysicsWorld disposed');
  }
}
