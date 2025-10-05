import * as THREE from 'three';

/**
 * Defines where and how parts can connect to each other
 */
export interface AttachPoint {
  id: string;
  position: THREE.Vector3; // Local position relative to part origin
  normal: THREE.Vector3; // Direction the attach point faces
  size: number; // Diameter of attachment point in meters
  type: 'top' | 'bottom' | 'radial' | 'surface'; // Type of attachment
  allowedParts?: string[]; // Optional filter for which parts can attach
}

/**
 * Resource storage for fuel, oxidizer, electricity, etc.
 */
export interface ResourceContainer {
  resourceType: 'liquidFuel' | 'oxidizer' | 'solidFuel' | 'monopropellant' | 'electricity' | 'xenon';
  amount: number; // Current amount
  maxAmount: number; // Maximum capacity
}

/**
 * Functional module that provides capabilities to a part
 */
export interface Module {
  type: 'engine' | 'rcs' | 'parachute' | 'decoupler' | 'generator' | 'battery' | 'antenna' | 'science';
  isActive: boolean;
  canToggle: boolean;

  // Engine-specific properties
  thrust?: number; // Newtons
  specificImpulse?: number; // Seconds (Isp)
  throttleable?: boolean;
  currentThrottle?: number; // 0-1
  fuelConsumption?: {
    resourceType: string;
    rate: number; // Units per second at full throttle
  }[];

  // RCS-specific properties
  rcsThrust?: number; // Newtons per thruster
  thrusterPositions?: THREE.Vector3[];

  // Parachute-specific properties
  deployAltitude?: number; // Meters
  fullyDeployedDrag?: number;

  // Decoupler-specific properties
  ejectionForce?: number; // Newtons
  isDecoupled?: boolean;

  // Power generation/storage
  powerGeneration?: number; // Watts
  powerStorage?: number; // Watt-hours

  // Communication
  transmissionPower?: number; // Watts
  dataRate?: number; // Mits/sec
}

/**
 * Base interface for all spacecraft parts
 */
export interface Part {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  category: 'command' | 'propulsion' | 'fuel' | 'structural' | 'utility' | 'science' | 'aerodynamic';

  // Physical properties
  mass: number; // kg (dry mass, without resources)
  cost: number; // Currency units

  // Positioning
  position: THREE.Vector3; // World position or relative to parent
  rotation: THREE.Quaternion; // Orientation

  // Connection system
  attachPoints: AttachPoint[];
  attachedTo?: {
    partId: string;
    attachPointId: string;
  };

  // Resources and modules
  resources?: ResourceContainer[];
  modules: Module[];

  // Physics properties
  dragCoefficient: number;
  crashTolerance: number; // m/s impact velocity
  maxTemperature: number; // Kelvin
  heatShielding?: number; // Thermal protection capability

  // Aerodynamics
  liftCoefficient?: number;

  // Visual properties (for procedural generation)
  proceduralConfig: {
    type: string; // Specific part type for generation
    size: 'small' | 'medium' | 'large';
    material: 'metal' | 'carbon-fiber' | 'composite' | 'ceramic';
    colorScheme?: string;
    customParameters?: Record<string, any>;
  };
}

/**
 * Command pod - can be manned or unmanned (probe)
 */
export interface CommandPod extends Part {
  category: 'command';
  crewCapacity: number; // 0 for probes
  hasIVA: boolean; // Internal view available
  electricityStorage: number; // Base battery capacity
  torqueStrength?: THREE.Vector3; // Reaction wheel strength (Nm)

  proceduralConfig: {
    type: 'command-pod' | 'probe-core';
    size: 'small' | 'medium' | 'large';
    material: 'metal' | 'carbon-fiber' | 'composite';
    style?: 'capsule' | 'lander' | 'aircraft' | 'probe';
    hasWindows?: boolean;
    hasAntenna?: boolean;
    customParameters?: {
      windowCount?: number;
      antennaType?: 'dish' | 'rod' | 'array';
    };
  };
}

/**
 * Fuel tank for storing propellants
 */
export interface FuelTank extends Part {
  category: 'fuel';

  proceduralConfig: {
    type: 'fuel-tank';
    size: 'small' | 'medium' | 'large';
    material: 'metal' | 'composite';
    tankType: 'liquid' | 'solid' | 'monopropellant' | 'xenon';
    aspectRatio?: number; // Length/diameter ratio
    customParameters?: {
      hasInsulation?: boolean;
      hasFuelLines?: boolean;
      markerStyle?: 'stripes' | 'warning' | 'minimal';
    };
  };
}

/**
 * Rocket engine
 */
export interface Engine extends Part {
  category: 'propulsion';
  gimbalRange?: number; // Degrees of thrust vectoring
  alternatorPower?: number; // Electricity generation in watts

  proceduralConfig: {
    type: 'engine';
    size: 'small' | 'medium' | 'large';
    material: 'metal' | 'ceramic' | 'composite';
    engineType: 'liquid' | 'solid' | 'ion' | 'nuclear';
    nozzleStyle?: 'bell' | 'aerospike' | 'grid';
    customParameters?: {
      bellLength?: number; // Relative to diameter
      hasGimbal?: boolean;
      hasTurbopump?: boolean;
      exhaustColor?: string;
    };
  };
}

/**
 * Structural component (decouplers, adapters, struts, etc.)
 */
export interface StructuralComponent extends Part {
  category: 'structural';

  proceduralConfig: {
    type: 'structural';
    size: 'small' | 'medium' | 'large';
    material: 'metal' | 'carbon-fiber' | 'composite';
    structuralType: 'decoupler' | 'adapter' | 'nose-cone' | 'strut' | 'panel';
    customParameters?: {
      topDiameter?: number;
      bottomDiameter?: number;
      height?: number;
      hasLattice?: boolean;
    };
  };
}

/**
 * Container for loading part data from JSON
 */
export interface PartData {
  parts: Part[];
}

/**
 * Vehicle assembly - a collection of connected parts
 */
export interface Vehicle {
  id: string;
  name: string;
  parts: Part[];
  rootPartId: string; // The command pod or root structural element

  // Computed properties
  totalMass?: number;
  centerOfMass?: THREE.Vector3;
  centerOfThrust?: THREE.Vector3;

  // Staging
  stages?: Stage[];
}

/**
 * Staging information for separating parts during flight
 */
export interface Stage {
  stageNumber: number;
  partIds: string[]; // Parts activated/decoupled in this stage
  action: 'activate' | 'decouple';
}
