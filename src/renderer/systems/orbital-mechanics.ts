import * as THREE from 'three';
import { CelestialBody, OrbitalElements, OrbitPoints } from '../types/celestial-body.js';

export class OrbitalMechanics {
  private G = 6.67430e-11; // Gravitational constant (m³/kg·s²)
  private AU = 149597870700; // Astronomical Unit in meters
  
  /**
   * Calculate the position of a celestial body at a given time based on its orbital elements
   */
  public calculatePosition(body: CelestialBody, time: number): THREE.Vector3 {
    if (body.orbitalElements.period === 0) {
      // For the Sun or other stationary bodies
      return body.position.clone();
    }
    
    const elements = body.orbitalElements;
    
    // Calculate mean anomaly at the given time
    const meanMotion = (2 * Math.PI) / elements.period;
    const meanAnomaly = (elements.meanAnomalyAtEpoch + meanMotion * time) % (2 * Math.PI);
    
    // Solve Kepler's equation to get eccentric anomaly (simplified)
    let eccentricAnomaly = meanAnomaly;
    for (let i = 0; i < 10; i++) {
      eccentricAnomaly = meanAnomaly + elements.eccentricity * Math.sin(eccentricAnomaly);
    }
    
    // Calculate true anomaly
    const trueAnomaly = 2 * Math.atan2(
      Math.sqrt(1 + elements.eccentricity) * Math.sin(eccentricAnomaly / 2),
      Math.sqrt(1 - elements.eccentricity) * Math.cos(eccentricAnomaly / 2)
    );
    
    // Calculate distance from focus
    const r = elements.semiMajorAxis * (1 - elements.eccentricity * Math.cos(eccentricAnomaly));
    
    // Calculate position in orbital plane
    const x = r * Math.cos(trueAnomaly);
    const y = r * Math.sin(trueAnomaly);
    
    // Convert to 3D position considering orbital inclination and other elements
    const position = new THREE.Vector3(x, y, 0);
    
    // Apply argument of periapsis rotation
    position.applyAxisAngle(new THREE.Vector3(0, 0, 1), elements.argumentOfPeriapsis);
    
    // Apply inclination rotation
    position.applyAxisAngle(new THREE.Vector3(1, 0, 0), elements.inclination);
    
    // Apply ascending node rotation
    position.applyAxisAngle(new THREE.Vector3(0, 0, 1), elements.ascendingNode);
    
    // Add parent body position if it exists
    if (body.parentBody) {
      // In a real implementation, we would look up the parent body and add its position
      // For now, we'll just return the position as is
    }
    
    return position;
  }
  
  /**
   * Calculate the velocity of a celestial body at a given time based on its orbital elements
   */
  public calculateVelocity(body: CelestialBody, time: number): THREE.Vector3 {
    if (body.orbitalElements.period === 0) {
      // For the Sun or other stationary bodies
      return new THREE.Vector3(0, 0, 0);
    }
    
    const elements = body.orbitalElements;
    
    // Calculate mean anomaly at the given time
    const meanMotion = (2 * Math.PI) / elements.period;
    const meanAnomaly = (elements.meanAnomalyAtEpoch + meanMotion * time) % (2 * Math.PI);
    
    // Solve Kepler's equation to get eccentric anomaly (simplified)
    let eccentricAnomaly = meanAnomaly;
    for (let i = 0; i < 10; i++) {
      eccentricAnomaly = meanAnomaly + elements.eccentricity * Math.sin(eccentricAnomaly);
    }
    
    // Calculate true anomaly
    const trueAnomaly = 2 * Math.atan2(
      Math.sqrt(1 + elements.eccentricity) * Math.sin(eccentricAnomaly / 2),
      Math.sqrt(1 - elements.eccentricity) * Math.cos(eccentricAnomaly / 2)
    );
    
    // Calculate distance from focus
    const r = elements.semiMajorAxis * (1 - elements.eccentricity * Math.cos(eccentricAnomaly));
    
    // Calculate velocity magnitude using vis-viva equation
    const parentMass = this.getParentMass(body.parentBody);
    const v = Math.sqrt(this.G * parentMass * (2/r - 1/elements.semiMajorAxis));
    
    // Calculate velocity direction (perpendicular to radius vector in orbital plane)
    const angle = trueAnomaly + Math.PI/2;
    const vx = v * Math.cos(angle);
    const vy = v * Math.sin(angle);
    const vz = 0;
    
    // Convert to 3D velocity considering orbital inclination and other elements
    const velocity = new THREE.Vector3(vx, vy, vz);
    
    // Apply argument of periapsis rotation
    velocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), elements.argumentOfPeriapsis);
    
    // Apply inclination rotation
    velocity.applyAxisAngle(new THREE.Vector3(1, 0, 0), elements.inclination);
    
    // Apply ascending node rotation
    velocity.applyAxisAngle(new THREE.Vector3(0, 0, 1), elements.ascendingNode);
    
    return velocity;
  }
  
  /**
   * Calculate the orbit points for visualization
   */
  public calculateOrbit(body: CelestialBody): OrbitPoints {
    const points: THREE.Vector3[] = [];
    const numPoints = 100;
    
    if (body.orbitalElements.period === 0) {
      // For the Sun or other stationary bodies, return empty orbit
      return { points, color: new THREE.Color(0xffffff) };
    }
    
    const elements = body.orbitalElements;
    
    // Generate points along the orbit
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      
      // Calculate eccentric anomaly from true anomaly
      const trueAnomaly = angle;
      const eccentricAnomaly = 2 * Math.atan2(
        Math.sqrt(1 - elements.eccentricity) * Math.sin(trueAnomaly / 2),
        Math.sqrt(1 + elements.eccentricity) * Math.cos(trueAnomaly / 2)
      );
      
      // Calculate distance from focus
      const r = elements.semiMajorAxis * (1 - elements.eccentricity * Math.cos(eccentricAnomaly));
      
      // Calculate position in orbital plane
      const x = r * Math.cos(trueAnomaly);
      const y = r * Math.sin(trueAnomaly);
      
      // Convert to 3D position considering orbital inclination and other elements
      const position = new THREE.Vector3(x, y, 0);
      
      // Apply argument of periapsis rotation
      position.applyAxisAngle(new THREE.Vector3(0, 0, 1), elements.argumentOfPeriapsis);
      
      // Apply inclination rotation
      position.applyAxisAngle(new THREE.Vector3(1, 0, 0), elements.inclination);
      
      // Apply ascending node rotation
      position.applyAxisAngle(new THREE.Vector3(0, 0, 1), elements.ascendingNode);
      
      points.push(position);
    }
    
    // Determine color based on body type
    let color: THREE.Color;
    switch (body.type) {
      case 'planet':
        color = new THREE.Color(0x00aaff);
        break;
      case 'moon':
        color = new THREE.Color(0xffaa00);
        break;
      case 'asteroid':
        color = new THREE.Color(0xff00ff);
        break;
      default:
        color = new THREE.Color(0xffffff);
    }
    
    return { points, color };
  }
  
  /**
   * Calculate the Sphere of Influence (SOI) of a celestial body
   */
  public calculateSOI(body: CelestialBody): number {
    if (!body.parentBody) {
      // For the Sun or other top-level bodies, return a very large value
      return Number.MAX_VALUE;
    }
    
    const parentMass = this.getParentMass(body.parentBody);
    const semiMajorAxis = body.orbitalElements.semiMajorAxis;
    
    // Calculate SOI using the formula: r_SOI = a * (m/M)^(2/5)
    // where a is the semi-major axis, m is the body mass, M is the parent mass
    const soi = semiMajorAxis * Math.pow(body.mass / parentMass, 2/5);
    
    return soi;
  }
  
  /**
   * Calculate orbital elements from position and velocity vectors
   */
  public calculateOrbitalElements(
    position: THREE.Vector3, 
    velocity: THREE.Vector3, 
    parentMass: number
  ): OrbitalElements {
    const r = position.length();
    const v = velocity.length();
    
    // Specific orbital energy
    const energy = (v * v) / 2 - (this.G * parentMass) / r;
    
    // Semi-major axis
    const semiMajorAxis = -this.G * parentMass / (2 * energy);
    
    // Angular momentum vector
    const h = new THREE.Vector3().crossVectors(position, velocity);
    const hMagnitude = h.length();
    
    // Eccentricity vector
    const eVector = new THREE.Vector3()
      .crossVectors(velocity, h)
      .divideScalar(this.G * parentMass)
      .sub(position.clone().divideScalar(r));
    const eccentricity = eVector.length();
    
    // Inclination
    const inclination = Math.acos(h.z / hMagnitude);
    
    // Node line
    const n = new THREE.Vector3(0, 0, 1).cross(h);
    const nMagnitude = n.length();
    
    // Longitude of ascending node
    let ascendingNode = 0;
    if (nMagnitude > 0) {
      ascendingNode = Math.acos(n.x / nMagnitude);
      if (n.y < 0) {
        ascendingNode = 2 * Math.PI - ascendingNode;
      }
    }
    
    // Argument of periapsis
    let argumentOfPeriapsis = 0;
    if (nMagnitude > 0 && eccentricity > 0) {
      argumentOfPeriapsis = Math.acos(n.dot(eVector) / (nMagnitude * eccentricity));
      if (eVector.z < 0) {
        argumentOfPeriapsis = 2 * Math.PI - argumentOfPeriapsis;
      }
    }
    
    // True anomaly
    let trueAnomaly = 0;
    if (eccentricity > 0) {
      trueAnomaly = Math.acos(eVector.dot(position) / (eccentricity * r));
      if (position.dot(velocity) < 0) {
        trueAnomaly = 2 * Math.PI - trueAnomaly;
      }
    }
    
    // Eccentric anomaly
    const eccentricAnomaly = 2 * Math.atan2(
      Math.sqrt(1 - eccentricity) * Math.sin(trueAnomaly / 2),
      Math.sqrt(1 + eccentricity) * Math.cos(trueAnomaly / 2)
    );
    
    // Mean anomaly at epoch (current time)
    const meanAnomalyAtEpoch = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly);
    
    // Orbital period
    const period = 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / (this.G * parentMass));
    
    return {
      semiMajorAxis,
      eccentricity,
      inclination,
      ascendingNode,
      argumentOfPeriapsis,
      meanAnomalyAtEpoch,
      period
    };
  }
  
  /**
   * Get the mass of a parent body by its ID
   * In a real implementation, this would look up the body in a registry
   */
  private getParentMass(parentId?: string): number {
    if (!parentId) {
      // Default to Sun's mass if no parent is specified
      return 1.989e30;
    }
    
    // In a real implementation, we would look up the parent body
    // For now, we'll return some common values
    switch (parentId) {
      case 'sun':
        return 1.989e30;
      case 'earth':
        return 5.972e24;
      case 'mars':
        return 6.417e23;
      case 'jupiter':
        return 1.898e27;
      case 'saturn':
        return 5.683e26;
      default:
        return 1.989e30; // Default to Sun's mass
    }
  }
  
  /**
   * Calculate the Hill sphere of a celestial body
   */
  public calculateHillSphere(body: CelestialBody): number {
    if (!body.parentBody) {
      return Number.MAX_VALUE;
    }
    
    const parentMass = this.getParentMass(body.parentBody);
    const semiMajorAxis = body.orbitalElements.semiMajorAxis;
    
    // Calculate Hill sphere using the formula: r_H = a * (m/3M)^(1/3)
    const hillSphere = semiMajorAxis * Math.pow(body.mass / (3 * parentMass), 1/3);
    
    return hillSphere;
  }
  
  /**
   * Calculate the delta-v required for a Hohmann transfer orbit
   */
  public calculateHohmannTransferDeltaV(
    r1: number, // Initial orbit radius
    r2: number, // Final orbit radius
    parentMass: number
  ): { deltaV1: number; deltaV2: number; totalDeltaV: number; transferTime: number } {
    // Calculate the semi-major axis of the transfer orbit
    const aTransfer = (r1 + r2) / 2;
    
    // Calculate velocities
    const v1 = Math.sqrt(this.G * parentMass / r1); // Initial circular orbit velocity
    const v2 = Math.sqrt(this.G * parentMass / r2); // Final circular orbit velocity
    const vTransfer1 = Math.sqrt(this.G * parentMass * (2/r1 - 1/aTransfer)); // Transfer orbit velocity at r1
    const vTransfer2 = Math.sqrt(this.G * parentMass * (2/r2 - 1/aTransfer)); // Transfer orbit velocity at r2
    
    // Calculate delta-v requirements
    const deltaV1 = Math.abs(vTransfer1 - v1); // Delta-v to enter transfer orbit
    const deltaV2 = Math.abs(v2 - vTransfer2); // Delta-v to circularize at r2
    const totalDeltaV = deltaV1 + deltaV2;
    
    // Calculate transfer time (half of the transfer orbit period)
    const transferTime = Math.PI * Math.sqrt(Math.pow(aTransfer, 3) / (this.G * parentMass));
    
    return {
      deltaV1,
      deltaV2,
      totalDeltaV,
      transferTime
    };
  }
}