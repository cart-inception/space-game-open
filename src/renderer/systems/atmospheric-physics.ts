import * as THREE from 'three';
import { CelestialBody, Atmosphere } from '../types/celestial-body.js';

/**
 * Result of atmospheric calculations
 */
export interface AtmosphericData {
  density: number; // kg/m³
  pressure: number; // Pa
  temperature: number; // K
}

/**
 * Drag force calculation result
 */
export interface DragForce {
  force: THREE.Vector3; // Force vector in Newtons
  magnitude: number; // Force magnitude in Newtons
  coefficient: number; // Drag coefficient used
}

/**
 * Heating calculation result
 */
export interface HeatingData {
  heatFlux: number; // W/m²
  temperature: number; // K
  isReentryHeating: boolean;
}

/**
 * Aerodynamic forces result
 */
export interface AerodynamicForces {
  lift: THREE.Vector3; // Lift force vector in Newtons
  drag: THREE.Vector3; // Drag force vector in Newtons
  sideForce: THREE.Vector3; // Side force vector in Newtons
  totalForce: THREE.Vector3; // Total aerodynamic force in Newtons
}

/**
 * Aerodynamic surface definition
 */
export interface AeroSurface {
  area: number; // m²
  liftCoefficient: number;
  dragCoefficient: number;
  normal: THREE.Vector3; // Surface normal in local space
  controlDeflection?: number; // Control surface deflection in radians
}

/**
 * AtmosphericPhysics handles atmospheric effects on vehicles
 * Calculates atmospheric density, drag, heating, and aerodynamic forces
 */
export class AtmosphericPhysics {
  private celestialBodies: Map<string, CelestialBody> = new Map();
  private bodyPositions: Map<string, THREE.Vector3> = new Map();

  // Physical constants
  private readonly STEFAN_BOLTZMANN = 5.67e-8; // W/(m²·K⁴)
  private readonly SPECIFIC_HEAT_AIR = 1005; // J/(kg·K) - specific heat capacity of air

  constructor() {
    console.log('AtmosphericPhysics initialized');
  }

  /**
   * Register a celestial body for atmospheric calculations
   */
  public registerBody(body: CelestialBody, position: THREE.Vector3): void {
    this.celestialBodies.set(body.id, body);
    this.bodyPositions.set(body.id, position.clone());
  }

  /**
   * Unregister a celestial body
   */
  public unregisterBody(id: string): void {
    this.celestialBodies.delete(id);
    this.bodyPositions.delete(id);
  }

  /**
   * Update position of a celestial body
   */
  public updateBodyPosition(id: string, position: THREE.Vector3): void {
    this.bodyPositions.set(id, position.clone());
  }

  /**
   * Calculate atmospheric density at a position
   * Uses exponential atmosphere model: ρ = ρ₀ * e^(-h/H)
   * where ρ₀ is sea level density, h is altitude, H is scale height
   */
  public calculateAtmosphericData(position: THREE.Vector3): AtmosphericData | null {
    // Find the nearest body with an atmosphere
    let nearestBody: CelestialBody | null = null;
    let nearestDistance = Infinity;

    this.celestialBodies.forEach((body) => {
      if (!body.atmosphere) return;

      const bodyPosition = this.bodyPositions.get(body.id);
      if (!bodyPosition) return;

      const distance = position.distanceTo(bodyPosition);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestBody = body;
      }
    });

    if (!nearestBody || !nearestBody.atmosphere) {
      return null;
    }

    const atmosphere = nearestBody.atmosphere;
    const altitude = nearestDistance - nearestBody.radius;

    // Outside atmosphere
    if (altitude > atmosphere.height) {
      return {
        density: 0,
        pressure: 0,
        temperature: 0,
      };
    }

    // Calculate density using exponential model
    const density =
      atmosphere.densityAtSeaLevel * Math.exp(-altitude / atmosphere.scaleHeight);

    // Calculate pressure (hydrostatic equilibrium approximation)
    const pressure = density * 287 * 273; // Using ideal gas law approximation

    // Calculate temperature (simple linear lapse rate)
    const lapseRate = 0.0065; // K/m (standard atmosphere)
    const temperature = Math.max(273 - lapseRate * altitude, 180); // Minimum 180K

    return {
      density,
      pressure,
      temperature,
    };
  }

  /**
   * Calculate drag force on an object
   * F_drag = 0.5 * ρ * v² * C_d * A
   */
  public calculateDrag(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    dragCoefficient: number,
    crossSectionArea: number
  ): DragForce {
    const atmosphericData = this.calculateAtmosphericData(position);

    if (!atmosphericData || atmosphericData.density === 0) {
      return {
        force: new THREE.Vector3(0, 0, 0),
        magnitude: 0,
        coefficient: dragCoefficient,
      };
    }

    const speed = velocity.length();
    if (speed < 0.1) {
      return {
        force: new THREE.Vector3(0, 0, 0),
        magnitude: 0,
        coefficient: dragCoefficient,
      };
    }

    // Calculate drag magnitude: F = 0.5 * ρ * v² * C_d * A
    const dragMagnitude =
      0.5 *
      atmosphericData.density *
      speed *
      speed *
      dragCoefficient *
      crossSectionArea;

    // Drag force opposes velocity
    const dragDirection = velocity.clone().normalize().multiplyScalar(-1);
    const dragForce = dragDirection.multiplyScalar(dragMagnitude);

    return {
      force: dragForce,
      magnitude: dragMagnitude,
      coefficient: dragCoefficient,
    };
  }

  /**
   * Calculate heating from atmospheric entry
   * Uses simplified Fay-Riddell heating equation
   */
  public calculateHeating(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    noseRadius: number = 1.0
  ): HeatingData {
    const atmosphericData = this.calculateAtmosphericData(position);

    if (!atmosphericData || atmosphericData.density === 0) {
      return {
        heatFlux: 0,
        temperature: 0,
        isReentryHeating: false,
      };
    }

    const speed = velocity.length();

    // Simplified stagnation point heating
    // q = k * sqrt(ρ/R_n) * v³
    // where k is a constant, ρ is density, R_n is nose radius, v is velocity
    const k = 1.83e-4; // Engineering constant for Earth-like atmosphere
    const heatFlux =
      k * Math.sqrt(atmosphericData.density / noseRadius) * Math.pow(speed, 3);

    // Estimate surface temperature from heat flux
    // Using simplified radiation equilibrium: q = ε * σ * T⁴
    const emissivity = 0.8;
    const temperature = Math.pow(
      heatFlux / (emissivity * this.STEFAN_BOLTZMANN),
      0.25
    );

    // Consider it reentry heating if speed > 2000 m/s and significant atmosphere
    const isReentryHeating = speed > 2000 && atmosphericData.density > 0.001;

    return {
      heatFlux,
      temperature,
      isReentryHeating,
    };
  }

  /**
   * Calculate aerodynamic forces on a vehicle with multiple surfaces
   * This is a simplified model - real aerodynamics are much more complex
   */
  public calculateAerodynamicForces(
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    orientation: THREE.Quaternion,
    surfaces: AeroSurface[]
  ): AerodynamicForces {
    const atmosphericData = this.calculateAtmosphericData(position);

    const zeroForce = new THREE.Vector3(0, 0, 0);
    if (!atmosphericData || atmosphericData.density === 0 || velocity.length() < 0.1) {
      return {
        lift: zeroForce.clone(),
        drag: zeroForce.clone(),
        sideForce: zeroForce.clone(),
        totalForce: zeroForce.clone(),
      };
    }

    const speed = velocity.length();
    const velocityDir = velocity.clone().normalize();

    let totalLift = new THREE.Vector3(0, 0, 0);
    let totalDrag = new THREE.Vector3(0, 0, 0);
    let totalSideForce = new THREE.Vector3(0, 0, 0);

    // Calculate forces for each aerodynamic surface
    surfaces.forEach((surface) => {
      // Transform surface normal to world space
      const worldNormal = surface.normal.clone().applyQuaternion(orientation);

      // Calculate angle of attack (angle between velocity and surface normal)
      const angleOfAttack = Math.acos(
        Math.max(-1, Math.min(1, -velocityDir.dot(worldNormal)))
      );

      // Adjust coefficients based on angle of attack and control deflection
      let effectiveLiftCoeff = surface.liftCoefficient * Math.sin(2 * angleOfAttack);
      let effectiveDragCoeff =
        surface.dragCoefficient * (1 + Math.pow(Math.sin(angleOfAttack), 2));

      // Apply control surface deflection if present
      if (surface.controlDeflection) {
        effectiveLiftCoeff += surface.controlDeflection * 0.1; // Simplified control authority
      }

      // Calculate dynamic pressure: q = 0.5 * ρ * v²
      const dynamicPressure = 0.5 * atmosphericData.density * speed * speed;

      // Calculate force magnitude: F = q * C * A
      const liftMagnitude = dynamicPressure * effectiveLiftCoeff * surface.area;
      const dragMagnitude = dynamicPressure * effectiveDragCoeff * surface.area;

      // Lift is perpendicular to velocity and in the plane of velocity and normal
      const liftDir = new THREE.Vector3()
        .crossVectors(velocityDir, worldNormal)
        .cross(velocityDir)
        .normalize();

      // Drag opposes velocity
      const dragDir = velocityDir.clone().multiplyScalar(-1);

      totalLift.add(liftDir.multiplyScalar(liftMagnitude));
      totalDrag.add(dragDir.multiplyScalar(dragMagnitude));
    });

    const totalForce = new THREE.Vector3()
      .add(totalLift)
      .add(totalDrag)
      .add(totalSideForce);

    return {
      lift: totalLift,
      drag: totalDrag,
      sideForce: totalSideForce,
      totalForce,
    };
  }

  /**
   * Get the celestial body that influences a position atmospherically
   */
  public getAtmosphericBody(position: THREE.Vector3): CelestialBody | null {
    let nearestBody: CelestialBody | null = null;
    let nearestDistance = Infinity;

    this.celestialBodies.forEach((body) => {
      if (!body.atmosphere) return;

      const bodyPosition = this.bodyPositions.get(body.id);
      if (!bodyPosition) return;

      const distance = position.distanceTo(bodyPosition);
      const altitude = distance - body.radius;

      // Check if position is within atmosphere
      if (altitude <= body.atmosphere.height && distance < nearestDistance) {
        nearestDistance = distance;
        nearestBody = body;
      }
    });

    return nearestBody;
  }

  /**
   * Calculate terminal velocity for an object
   * Terminal velocity occurs when drag force equals gravitational force
   */
  public calculateTerminalVelocity(
    position: THREE.Vector3,
    mass: number,
    dragCoefficient: number,
    crossSectionArea: number,
    gravitationalAcceleration: number
  ): number {
    const atmosphericData = this.calculateAtmosphericData(position);

    if (!atmosphericData || atmosphericData.density === 0) {
      return Infinity; // No terminal velocity in vacuum
    }

    // v_terminal = sqrt((2 * m * g) / (ρ * C_d * A))
    const terminalVelocity = Math.sqrt(
      (2 * mass * gravitationalAcceleration) /
        (atmosphericData.density * dragCoefficient * crossSectionArea)
    );

    return terminalVelocity;
  }

  /**
   * Clean up resources
   */
  public dispose(): void {
    this.celestialBodies.clear();
    this.bodyPositions.clear();
    console.log('AtmosphericPhysics disposed');
  }
}
