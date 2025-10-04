import * as THREE from 'three';

/**
 * Physics-related type definitions
 */

/**
 * Physical state of an object
 */
export interface PhysicsState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  rotation: THREE.Quaternion;
  angularVelocity: THREE.Vector3;
  mass: number;
}

/**
 * Force applied to an object
 */
export interface Force {
  vector: THREE.Vector3; // Force vector in Newtons
  applicationPoint?: THREE.Vector3; // Point where force is applied (world space)
  type: ForceType;
}

/**
 * Types of forces
 */
export enum ForceType {
  GRAVITY = 'gravity',
  THRUST = 'thrust',
  DRAG = 'drag',
  LIFT = 'lift',
  REACTION = 'reaction',
  COLLISION = 'collision',
  CONTROL = 'control',
}

/**
 * Collision event data
 */
export interface CollisionEvent {
  objectA: string; // Object A ID
  objectB: string; // Object B ID
  position: THREE.Vector3; // Collision point in world space
  normal: THREE.Vector3; // Collision normal
  impulse: number; // Collision impulse magnitude
  relativeVelocity: THREE.Vector3; // Relative velocity at collision
  timestamp: number; // Game time when collision occurred
}

/**
 * Trajectory prediction point
 */
export interface TrajectoryPoint {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  time: number; // Time from start of trajectory (seconds)
}

/**
 * Orbital maneuver node
 */
export interface ManeuverNode {
  time: number; // Time of maneuver (game time)
  deltaV: THREE.Vector3; // Change in velocity vector
  position: THREE.Vector3; // Position where maneuver occurs
  resultingOrbit?: {
    apoapsis: number;
    periapsis: number;
    inclination: number;
  };
}

/**
 * Physics material properties
 */
export interface PhysicsMaterial {
  density: number; // kg/m³
  friction: number; // Coefficient of friction (0-1)
  restitution: number; // Coefficient of restitution (bounciness, 0-1)
  dragCoefficient: number; // Aerodynamic drag coefficient
  heatCapacity?: number; // J/(kg·K) - specific heat capacity
  thermalConductivity?: number; // W/(m·K)
  maxTemperature?: number; // K - maximum operating temperature
}

/**
 * Rigid body definition for physics
 */
export interface RigidBody {
  id: string;
  mass: number;
  centerOfMass: THREE.Vector3; // Local space
  momentOfInertia: THREE.Vector3; // Principal moments (I_x, I_y, I_z)
  shape: RigidBodyShape;
  material: PhysicsMaterial;
}

/**
 * Rigid body shape types
 */
export type RigidBodyShape =
  | { type: 'sphere'; radius: number }
  | { type: 'box'; size: THREE.Vector3 }
  | { type: 'cylinder'; radius: number; height: number }
  | { type: 'capsule'; radius: number; height: number }
  | { type: 'mesh'; vertices: THREE.Vector3[]; indices: number[] };

/**
 * Integration method for physics simulation
 */
export enum IntegrationMethod {
  EULER = 'euler', // Simple but less accurate
  VERLET = 'verlet', // Good for orbital mechanics
  RK4 = 'rk4', // Runge-Kutta 4th order - more accurate
}

/**
 * Physics simulation settings
 */
export interface PhysicsSettings {
  timeStep: number; // Fixed timestep in seconds
  maxSubSteps: number; // Maximum substeps per frame
  integrationMethod: IntegrationMethod;
  enableCollisions: boolean;
  enableAtmospherics: boolean;
  enableNBodyGravity: boolean;
  gravityAccuracy: 'low' | 'medium' | 'high'; // Controls number of bodies considered
}
