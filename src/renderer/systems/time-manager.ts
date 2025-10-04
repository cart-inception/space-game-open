import * as THREE from 'three';

export type TimeScale = 'paused' | 'realtime' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

export interface TimeSettings {
  scale: TimeScale;
  multiplier: number;
  currentTime: number; // Unix timestamp in seconds
}

export interface DistanceScale {
  // Scale factors for different distance ranges
  planetary: number;    // For planetary distances (AU to meters)
  lunar: number;        // For lunar distances (km to meters)
  orbital: number;      // For orbital mechanics (real scale)
  render: number;       // For rendering (scaled down for visualization)
}

export class TimeManager {
  private settings: TimeSettings;
  private distanceScale: DistanceScale;
  private onTimeChangeCallbacks: ((time: number) => void)[] = [];
  private onScaleChangeCallbacks: ((scale: TimeScale) => void)[] = [];
  
  constructor() {
    this.settings = {
      scale: 'realtime',
      multiplier: 1,
      currentTime: Date.now() / 1000 // Current Unix timestamp in seconds
    };
    
    this.distanceScale = {
      planetary: 149597870700,    // 1 AU in meters
      lunar: 1000,               // 1 km in meters
      orbital: 1,                // Real scale for orbital mechanics
      render: 1e-9               // Scale down for visualization (1:1,000,000,000)
    };
  }
  
  /**
   * Update the time based on the current time scale
   */
  public update(deltaTime: number): void {
    if (this.settings.scale === 'paused') {
      return;
    }
    
    // Calculate the time multiplier based on the current scale
    const multiplier = this.calculateTimeMultiplier();
    
    // Update the current time
    this.settings.currentTime += deltaTime * multiplier;
    
    // Notify callbacks
    this.onTimeChangeCallbacks.forEach(callback => callback(this.settings.currentTime));
  }
  
  /**
   * Calculate the time multiplier for the current time scale
   */
  private calculateTimeMultiplier(): number {
    switch (this.settings.scale) {
      case 'paused':
        return 0;
      case 'realtime':
        return 1;
      case 'minutes':
        return 60;
      case 'hours':
        return 3600;
      case 'days':
        return 86400;
      case 'weeks':
        return 604800;
      case 'months':
        return 2592000; // 30 days
      case 'years':
        return 31536000; // 365 days
      default:
        return 1;
    }
  }
  
  /**
   * Set the time scale
   */
  public setTimeScale(scale: TimeScale): void {
    if (this.settings.scale !== scale) {
      this.settings.scale = scale;
      this.settings.multiplier = this.calculateTimeMultiplier();
      
      // Notify callbacks
      this.onScaleChangeCallbacks.forEach(callback => callback(scale));
    }
  }
  
  /**
   * Get the current time scale
   */
  public getTimeScale(): TimeScale {
    return this.settings.scale;
  }
  
  /**
   * Get the current time multiplier
   */
  public getTimeMultiplier(): number {
    return this.settings.multiplier;
  }
  
  /**
   * Get the current time in Unix timestamp
   */
  public getCurrentTime(): number {
    return this.settings.currentTime;
  }
  
  /**
   * Set the current time
   */
  public setCurrentTime(time: number): void {
    this.settings.currentTime = time;
    
    // Notify callbacks
    this.onTimeChangeCallbacks.forEach(callback => callback(time));
  }
  
  /**
   * Get the formatted time string
   */
  public getFormattedTime(): string {
    const date = new Date(this.settings.currentTime * 1000);
    return date.toISOString();
  }
  
  /**
   * Get the elapsed time since a specific timestamp
   */
  public getElapsedTimeSince(timestamp: number): number {
    return this.settings.currentTime - timestamp;
  }
  
  /**
   * Add a callback for time changes
   */
  public onTimeChange(callback: (time: number) => void): void {
    this.onTimeChangeCallbacks.push(callback);
  }
  
  /**
   * Add a callback for scale changes
   */
  public onScaleChange(callback: (scale: TimeScale) => void): void {
    this.onScaleChangeCallbacks.push(callback);
  }
  
  /**
   * Remove a time change callback
   */
  public removeTimeChangeCallback(callback: (time: number) => void): void {
    const index = this.onTimeChangeCallbacks.indexOf(callback);
    if (index >= 0) {
      this.onTimeChangeCallbacks.splice(index, 1);
    }
  }
  
  /**
   * Remove a scale change callback
   */
  public removeScaleChangeCallback(callback: (scale: TimeScale) => void): void {
    const index = this.onScaleChangeCallbacks.indexOf(callback);
    if (index >= 0) {
      this.onScaleChangeCallbacks.splice(index, 1);
    }
  }
  
  /**
   * Scale a distance for rendering
   */
  public scaleDistanceForRender(distance: number): number {
    return distance * this.distanceScale.render;
  }
  
  /**
   * Scale a position vector for rendering
   */
  public scalePositionForRender(position: THREE.Vector3): THREE.Vector3 {
    return position.clone().multiplyScalar(this.distanceScale.render);
  }
  
  /**
   * Unscale a distance from rendering back to real scale
   */
  public unscaleDistanceFromRender(distance: number): number {
    return distance / this.distanceScale.render;
  }
  
  /**
   * Unscale a position vector from rendering back to real scale
   */
  public unscalePositionFromRender(position: THREE.Vector3): THREE.Vector3 {
    return position.clone().divideScalar(this.distanceScale.render);
  }
  
  /**
   * Get the distance scale settings
   */
  public getDistanceScale(): DistanceScale {
    return { ...this.distanceScale };
  }
  
  /**
   * Set the render distance scale
   */
  public setRenderDistanceScale(scale: number): void {
    this.distanceScale.render = scale;
  }
  
  /**
   * Get the appropriate scale for a given distance
   */
  public getScaleForDistance(distance: number): number {
    // Determine the appropriate scale based on the distance
    if (distance < 1000000) { // Less than 1000 km
      return this.distanceScale.lunar;
    } else if (distance < 1e12) { // Less than 1000 AU
      return this.distanceScale.planetary;
    } else {
      return this.distanceScale.orbital;
    }
  }
  
  /**
   * Convert a distance from one unit to another
   */
  public convertDistance(distance: number, fromUnit: string, toUnit: string): number {
    // Conversion factors to meters
    const toMeters: { [key: string]: number } = {
      'mm': 0.001,
      'cm': 0.01,
      'm': 1,
      'km': 1000,
      'Mm': 1000000, // Megameter
      'Gm': 1000000000, // Gigameter
      'AU': 149597870700, // Astronomical Unit
      'ly': 9.461e15, // Light year
      'pc': 3.086e16 // Parsec
    };
    
    // Convert to meters first, then to the target unit
    const meters = distance * (toMeters[fromUnit] || 1);
    return meters / (toMeters[toUnit] || 1);
  }
  
  /**
   * Format a distance with appropriate units
   */
  public formatDistance(distance: number): string {
    if (distance < 1000) {
      return `${distance.toFixed(2)} m`;
    } else if (distance < 1000000) {
      return `${(distance / 1000).toFixed(2)} km`;
    } else if (distance < 149597870700) {
      return `${(distance / 1000000).toFixed(2)} Mm`;
    } else if (distance < 9.461e15) {
      return `${(distance / 149597870700).toFixed(2)} AU`;
    } else {
      return `${(distance / 9.461e15).toFixed(2)} ly`;
    }
  }
  
  /**
   * Format a time duration with appropriate units
   */
  public formatDuration(duration: number): string {
    if (duration < 60) {
      return `${duration.toFixed(2)} s`;
    } else if (duration < 3600) {
      return `${(duration / 60).toFixed(2)} min`;
    } else if (duration < 86400) {
      return `${(duration / 3600).toFixed(2)} h`;
    } else if (duration < 2592000) {
      return `${(duration / 86400).toFixed(2)} days`;
    } else if (duration < 31536000) {
      return `${(duration / 2592000).toFixed(2)} months`;
    } else {
      return `${(duration / 31536000).toFixed(2)} years`;
    }
  }
}