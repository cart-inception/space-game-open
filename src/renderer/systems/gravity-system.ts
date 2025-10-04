import * as THREE from 'three';
import { CelestialBody } from '../types/celestial-body.js';

/**
 * N-Body gravity simulation system
 * Calculates gravitational forces between multiple bodies for accurate physics simulation
 * Used for vehicles/spacecraft that need multi-body gravitational influence
 */
export class GravitySystem {
  private G = 6.67430e-11; // Gravitational constant (m³/kg·s²)
  private celestialBodies: Map<string, CelestialBody> = new Map();
  private bodyPositions: Map<string, THREE.Vector3> = new Map();
  private bodyVelocities: Map<string, THREE.Vector3> = new Map();
  private useNBodySimulation: boolean = false; // Toggle between Keplerian and N-body

  constructor() {
    console.log('GravitySystem initialized');
  }

  /**
   * Register a celestial body for gravity calculations
   */
  public registerBody(body: CelestialBody): void {
    this.celestialBodies.set(body.id, body);
    this.bodyPositions.set(body.id, body.position.clone());

    // Initialize velocity (will be calculated from orbital elements if needed)
    const velocity = new THREE.Vector3(0, 0, 0);
    this.bodyVelocities.set(body.id, velocity);
  }

  /**
   * Unregister a celestial body
   */
  public unregisterBody(id: string): void {
    this.celestialBodies.delete(id);
    this.bodyPositions.delete(id);
    this.bodyVelocities.delete(id);
  }

  /**
   * Update a celestial body's position (called when using Keplerian mechanics)
   */
  public updateBodyPosition(id: string, position: THREE.Vector3): void {
    this.bodyPositions.set(id, position.clone());
  }

  /**
   * Calculate gravitational acceleration at a point from all bodies
   * @param position - Position to calculate gravity at
   * @param excludeBody - Optional body ID to exclude from calculation (e.g., the body itself)
   * @returns Gravitational acceleration vector (m/s²)
   */
  public calculateGravityOnPoint(position: THREE.Vector3, excludeBody?: string): THREE.Vector3 {
    const totalAcceleration = new THREE.Vector3(0, 0, 0);

    this.celestialBodies.forEach((body, id) => {
      // Skip excluded body (e.g., don't calculate a body's gravity on itself)
      if (id === excludeBody) return;

      // Get the current position of the body
      const bodyPosition = this.bodyPositions.get(id);
      if (!bodyPosition) return;

      // Calculate vector from point to body
      const r = new THREE.Vector3().subVectors(bodyPosition, position);
      const distance = r.length();

      // Avoid division by zero and unrealistic forces at very close distances
      if (distance < 1) return;

      // Calculate gravitational acceleration: a = GM/r²
      const accelerationMagnitude = (this.G * body.mass) / (distance * distance);

      // Add acceleration vector (normalized direction * magnitude)
      r.normalize().multiplyScalar(accelerationMagnitude);
      totalAcceleration.add(r);
    });

    return totalAcceleration;
  }

  /**
   * Update orbits using N-body simulation with Velocity Verlet integration
   * This is more accurate than Keplerian mechanics but computationally expensive
   * @param deltaTime - Time step in seconds
   */
  public updateOrbits(deltaTime: number): void {
    if (!this.useNBodySimulation) return;

    const newPositions = new Map<string, THREE.Vector3>();
    const newVelocities = new Map<string, THREE.Vector3>();

    // Calculate new positions and velocities using Velocity Verlet
    this.celestialBodies.forEach((body, id) => {
      // Skip stationary bodies (like the Sun)
      if (body.orbitalElements.period === 0) {
        newPositions.set(id, this.bodyPositions.get(id)!.clone());
        newVelocities.set(id, new THREE.Vector3(0, 0, 0));
        return;
      }

      const position = this.bodyPositions.get(id)!;
      const velocity = this.bodyVelocities.get(id)!;

      // Calculate current acceleration
      const acceleration = this.calculateGravityOnPoint(position, id);

      // Update position: x(t + dt) = x(t) + v(t) * dt + 0.5 * a(t) * dt²
      const newPosition = position.clone()
        .add(velocity.clone().multiplyScalar(deltaTime))
        .add(acceleration.clone().multiplyScalar(0.5 * deltaTime * deltaTime));

      // Calculate acceleration at new position
      const newAcceleration = this.calculateGravityOnPoint(newPosition, id);

      // Update velocity: v(t + dt) = v(t) + 0.5 * (a(t) + a(t + dt)) * dt
      const newVelocity = velocity.clone()
        .add(acceleration.clone().add(newAcceleration).multiplyScalar(0.5 * deltaTime));

      newPositions.set(id, newPosition);
      newVelocities.set(id, newVelocity);
    });

    // Update all positions and velocities
    newPositions.forEach((position, id) => {
      this.bodyPositions.set(id, position);
    });
    newVelocities.forEach((velocity, id) => {
      this.bodyVelocities.set(id, velocity);
    });
  }

  /**
   * Predict trajectory of a point mass over time
   * Uses Runge-Kutta 4 (RK4) integration for better accuracy
   * @param initialPosition - Starting position
   * @param initialVelocity - Starting velocity
   * @param steps - Number of prediction steps
   * @param stepSize - Time step size in seconds (default: 100s)
   * @returns Array of position vectors representing the trajectory
   */
  public predictTrajectory(
    initialPosition: THREE.Vector3,
    initialVelocity: THREE.Vector3,
    steps: number,
    stepSize: number = 100
  ): THREE.Vector3[] {
    const trajectory: THREE.Vector3[] = [];
    let position = initialPosition.clone();
    let velocity = initialVelocity.clone();

    trajectory.push(position.clone());

    for (let i = 0; i < steps; i++) {
      // RK4 integration
      const k1v = this.calculateGravityOnPoint(position);
      const k1x = velocity.clone();

      const k2x = velocity.clone().add(k1v.clone().multiplyScalar(stepSize * 0.5));
      const k2v = this.calculateGravityOnPoint(
        position.clone().add(k1x.clone().multiplyScalar(stepSize * 0.5))
      );

      const k3x = velocity.clone().add(k2v.clone().multiplyScalar(stepSize * 0.5));
      const k3v = this.calculateGravityOnPoint(
        position.clone().add(k2x.clone().multiplyScalar(stepSize * 0.5))
      );

      const k4x = velocity.clone().add(k3v.clone().multiplyScalar(stepSize));
      const k4v = this.calculateGravityOnPoint(
        position.clone().add(k3x.clone().multiplyScalar(stepSize))
      );

      // Update position and velocity
      position.add(
        k1x.clone()
          .add(k2x.clone().multiplyScalar(2))
          .add(k3x.clone().multiplyScalar(2))
          .add(k4x)
          .multiplyScalar(stepSize / 6)
      );

      velocity.add(
        k1v.clone()
          .add(k2v.clone().multiplyScalar(2))
          .add(k3v.clone().multiplyScalar(2))
          .add(k4v)
          .multiplyScalar(stepSize / 6)
      );

      trajectory.push(position.clone());
    }

    return trajectory;
  }

  /**
   * Calculate the dominant gravitational body at a position
   * Useful for determining sphere of influence
   */
  public getDominantBody(position: THREE.Vector3): string | null {
    let dominantBodyId: string | null = null;
    let maxAcceleration = 0;

    this.celestialBodies.forEach((body, id) => {
      const bodyPosition = this.bodyPositions.get(id);
      if (!bodyPosition) return;

      const r = new THREE.Vector3().subVectors(bodyPosition, position);
      const distance = r.length();

      if (distance < 1) return;

      const acceleration = (this.G * body.mass) / (distance * distance);

      if (acceleration > maxAcceleration) {
        maxAcceleration = acceleration;
        dominantBodyId = id;
      }
    });

    return dominantBodyId;
  }

  /**
   * Calculate escape velocity from a position
   */
  public calculateEscapeVelocity(position: THREE.Vector3): number {
    let totalMass = 0;
    let averageDistance = 0;
    let count = 0;

    this.celestialBodies.forEach((body) => {
      const bodyPosition = this.bodyPositions.get(body.id);
      if (!bodyPosition) return;

      const distance = position.distanceTo(bodyPosition);
      if (distance < 1) return;

      totalMass += body.mass;
      averageDistance += distance;
      count++;
    });

    if (count === 0) return 0;

    averageDistance /= count;
    return Math.sqrt((2 * this.G * totalMass) / averageDistance);
  }

  /**
   * Enable or disable N-body simulation
   * When disabled, the system only calculates gravity on demand (for vehicles)
   */
  public setNBodySimulation(enabled: boolean): void {
    this.useNBodySimulation = enabled;
    console.log(`N-body simulation ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Check if N-body simulation is enabled
   */
  public isNBodySimulationEnabled(): boolean {
    return this.useNBodySimulation;
  }

  /**
   * Get all registered celestial bodies
   */
  public getBodies(): Map<string, CelestialBody> {
    return this.celestialBodies;
  }

  /**
   * Get position of a celestial body
   */
  public getBodyPosition(id: string): THREE.Vector3 | undefined {
    return this.bodyPositions.get(id);
  }

  /**
   * Get velocity of a celestial body
   */
  public getBodyVelocity(id: string): THREE.Vector3 | undefined {
    return this.bodyVelocities.get(id);
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    this.celestialBodies.clear();
    this.bodyPositions.clear();
    this.bodyVelocities.clear();
    console.log('GravitySystem disposed');
  }
}
