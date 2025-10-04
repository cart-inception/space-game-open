import * as THREE from 'three';

export interface OrbitalElements {
  semiMajorAxis: number; // meters
  eccentricity: number; // 0-1, where 0 is circular orbit
  inclination: number; // radians
  ascendingNode: number; // radians
  argumentOfPeriapsis: number; // radians
  meanAnomalyAtEpoch: number; // radians
  period: number; // seconds
}

export interface Atmosphere {
  height: number; // meters
  densityAtSeaLevel: number; // kg/m³
  scaleHeight: number; // meters
  composition: string[];
}

export interface Biome {
  name: string;
  temperature: number; // Kelvin
  pressure: number; // Pascals
  color: THREE.Color;
  resources: string[];
}

export interface CelestialBody {
  id: string;
  name: string;
  type: 'planet' | 'moon' | 'asteroid' | 'star';
  mass: number; // kg
  radius: number; // meters
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
  orbitalElements: OrbitalElements;
  parentBody?: string; // Reference to parent body ID
  atmosphere?: Atmosphere;
  biomes?: Biome[];
  texturePath: string;
  meshPath?: string; // For custom models
}

export interface CelestialBodyData {
  bodies: CelestialBody[];
}

export interface OrbitPoints {
  points: THREE.Vector3[];
  color: THREE.Color;
}