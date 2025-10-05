import * as THREE from 'three';
import { Vehicle } from './vehicle.js';
import { Part, PartData } from '../types/part.js';

/**
 * Manages vehicles and the parts library
 * Handles loading/saving vehicles and parts catalogs
 */
export class VehicleManager {
  private vehicles: Map<string, Vehicle> = new Map();
  private partsLibrary: Map<string, Part> = new Map();
  private currentVehicle: Vehicle | null = null;
  private nextVehicleId: number = 1;

  constructor() {
    // Empty constructor
  }

  /**
   * Load parts library from JSON file
   */
  public async loadPartsLibrary(filePath: string): Promise<void> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load parts library: ${response.statusText}`);
      }

      const data: PartData = await response.json();

      // Load parts into library
      for (const part of data.parts) {
        this.partsLibrary.set(part.id, part);
      }

      console.log(`Loaded ${this.partsLibrary.size} parts from ${filePath}`);
    } catch (error) {
      console.error('Error loading parts library:', error);
      throw error;
    }
  }

  /**
   * Get a part from the library by ID
   */
  public getPartTemplate(partId: string): Part | undefined {
    return this.partsLibrary.get(partId);
  }

  /**
   * Get all parts from the library
   */
  public getAllPartTemplates(): Part[] {
    return Array.from(this.partsLibrary.values());
  }

  /**
   * Get parts filtered by category
   */
  public getPartsByCategory(category: string): Part[] {
    return Array.from(this.partsLibrary.values()).filter(
      part => part.category === category
    );
  }

  /**
   * Create a new part instance from a template
   * Returns a deep copy with a new unique ID
   */
  public createPartFromTemplate(templateId: string): Part | null {
    const template = this.partsLibrary.get(templateId);
    if (!template) {
      console.error(`Part template ${templateId} not found`);
      return null;
    }

    // Deep clone the part
    const newPart: Part = JSON.parse(JSON.stringify(template));

    // Generate unique ID
    newPart.id = `${template.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Reset position and rotation
    newPart.position = new THREE.Vector3(0, 0, 0);
    newPart.rotation = new THREE.Quaternion(0, 0, 0, 1);
    newPart.attachedTo = undefined;

    return newPart;
  }

  /**
   * Create a new empty vehicle
   */
  public createVehicle(name?: string): Vehicle {
    const id = `vehicle-${this.nextVehicleId++}`;
    const vehicleName = name || `Untitled Vehicle ${this.nextVehicleId - 1}`;

    const vehicle = new Vehicle(id, vehicleName, '');
    this.vehicles.set(id, vehicle);

    return vehicle;
  }

  /**
   * Get a vehicle by ID
   */
  public getVehicle(vehicleId: string): Vehicle | undefined {
    return this.vehicles.get(vehicleId);
  }

  /**
   * Get all vehicles
   */
  public getAllVehicles(): Vehicle[] {
    return Array.from(this.vehicles.values());
  }

  /**
   * Set the current vehicle being edited/flown
   */
  public setCurrentVehicle(vehicle: Vehicle | null): void {
    this.currentVehicle = vehicle;
  }

  /**
   * Get the current vehicle
   */
  public getCurrentVehicle(): Vehicle | null {
    return this.currentVehicle;
  }

  /**
   * Delete a vehicle
   */
  public deleteVehicle(vehicleId: string): boolean {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) return false;

    // Dispose of resources
    vehicle.dispose();

    // Remove from map
    this.vehicles.delete(vehicleId);

    // Clear current vehicle if it was deleted
    if (this.currentVehicle?.id === vehicleId) {
      this.currentVehicle = null;
    }

    return true;
  }

  /**
   * Save a vehicle to localStorage
   */
  public saveVehicle(vehicle: Vehicle): boolean {
    try {
      const vehicleData = vehicle.toJSON();
      const json = JSON.stringify(vehicleData);
      localStorage.setItem(`vehicle-${vehicle.id}`, json);
      console.log(`Vehicle ${vehicle.name} saved successfully`);
      return true;
    } catch (error) {
      console.error('Error saving vehicle:', error);
      return false;
    }
  }

  /**
   * Load a vehicle from localStorage
   */
  public loadVehicle(vehicleId: string): Vehicle | null {
    try {
      const json = localStorage.getItem(`vehicle-${vehicleId}`);
      if (!json) {
        console.error(`Vehicle ${vehicleId} not found in storage`);
        return null;
      }

      const vehicleData = JSON.parse(json);

      // Create new vehicle
      const vehicle = new Vehicle(
        vehicleData.id,
        vehicleData.name,
        vehicleData.rootPartId
      );

      // Add all parts
      for (const partData of vehicleData.parts) {
        vehicle.addPart(partData);
      }

      // Set stages
      vehicle.stages = vehicleData.stages || [];

      // Add to vehicles map
      this.vehicles.set(vehicle.id, vehicle);

      console.log(`Vehicle ${vehicle.name} loaded successfully`);
      return vehicle;
    } catch (error) {
      console.error('Error loading vehicle:', error);
      return null;
    }
  }

  /**
   * Get list of saved vehicle IDs from localStorage
   */
  public getSavedVehicleIds(): string[] {
    const vehicleIds: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('vehicle-')) {
        vehicleIds.push(key.replace('vehicle-', ''));
      }
    }

    return vehicleIds;
  }

  /**
   * Export vehicle to JSON file
   */
  public exportVehicleToFile(vehicle: Vehicle): void {
    const vehicleData = vehicle.toJSON();
    const json = JSON.stringify(vehicleData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${vehicle.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log(`Vehicle ${vehicle.name} exported to file`);
  }

  /**
   * Import vehicle from JSON file
   */
  public async importVehicleFromFile(file: File): Promise<Vehicle | null> {
    try {
      const text = await file.text();
      const vehicleData = JSON.parse(text);

      // Create new vehicle
      const vehicle = new Vehicle(
        vehicleData.id,
        vehicleData.name,
        vehicleData.rootPartId
      );

      // Add all parts
      for (const partData of vehicleData.parts) {
        vehicle.addPart(partData);
      }

      // Set stages
      vehicle.stages = vehicleData.stages || [];

      // Add to vehicles map
      this.vehicles.set(vehicle.id, vehicle);

      console.log(`Vehicle ${vehicle.name} imported successfully`);
      return vehicle;
    } catch (error) {
      console.error('Error importing vehicle:', error);
      return null;
    }
  }

  /**
   * Validate vehicle structure
   * Checks if all parts are connected and forms a valid tree
   */
  public validateVehicle(vehicle: Vehicle): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check if vehicle has parts
    if (vehicle.parts.size === 0) {
      errors.push('Vehicle has no parts');
      return { valid: false, errors };
    }

    // Check if root part exists
    const rootPart = vehicle.getPart(vehicle.rootPartId);
    if (!rootPart) {
      errors.push('Root part not found');
      return { valid: false, errors };
    }

    // Check if root part is a command pod
    if (rootPart.part.category !== 'command') {
      errors.push('Root part must be a command pod or probe core');
    }

    // Check if all parts are connected (form a tree)
    const visited = new Set<string>();
    const queue: string[] = [vehicle.rootPartId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;

      visited.add(currentId);

      // Find children (parts attached to this part)
      for (const [partId, partObject] of vehicle.parts.entries()) {
        if (partObject.part.attachedTo?.partId === currentId && !visited.has(partId)) {
          queue.push(partId);
        }
      }
    }

    // Check if all parts were visited
    if (visited.size !== vehicle.parts.size) {
      errors.push(`${vehicle.parts.size - visited.size} part(s) not connected to root`);
    }

    // Check for staging issues
    if (vehicle.stages.length === 0) {
      errors.push('Vehicle has no stages defined');
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Create a sample/default vehicle for testing
   */
  public createSampleVehicle(): Vehicle | null {
    // Get template parts
    const commandPodTemplate = this.getPartTemplate('mk1-command-pod');
    const fuelTankTemplate = this.getPartTemplate('fl-t400-fuel-tank');
    const engineTemplate = this.getPartTemplate('lv-t30-engine');
    const decouplerTemplate = this.getPartTemplate('tt-38k-decoupler');

    if (!commandPodTemplate || !fuelTankTemplate || !engineTemplate || !decouplerTemplate) {
      console.error('Required part templates not found for sample vehicle');
      return null;
    }

    // Create vehicle
    const vehicle = this.createVehicle('Sample Rocket');

    // Create parts
    const commandPod = this.createPartFromTemplate('mk1-command-pod')!;
    commandPod.position = new THREE.Vector3(0, 2, 0);
    const commandPodObj = vehicle.addPart(commandPod);

    const fuelTank = this.createPartFromTemplate('fl-t400-fuel-tank')!;
    fuelTank.position = new THREE.Vector3(0, 0, 0);
    fuelTank.attachedTo = {
      partId: commandPod.id,
      attachPointId: 'bottom'
    };
    vehicle.addPart(fuelTank);

    const decoupler = this.createPartFromTemplate('tt-38k-decoupler')!;
    decoupler.position = new THREE.Vector3(0, -1, 0);
    decoupler.attachedTo = {
      partId: fuelTank.id,
      attachPointId: 'bottom'
    };
    vehicle.addPart(decoupler);

    const engine = this.createPartFromTemplate('lv-t30-engine')!;
    engine.position = new THREE.Vector3(0, -1.5, 0);
    engine.attachedTo = {
      partId: decoupler.id,
      attachPointId: 'bottom'
    };
    vehicle.addPart(engine);

    // Set root
    vehicle.rootPartId = commandPod.id;

    // Create stages
    vehicle.stages = [
      {
        stageNumber: 0,
        partIds: [engine.id],
        action: 'activate'
      }
    ];

    this.setCurrentVehicle(vehicle);

    return vehicle;
  }

  /**
   * Dispose of all resources
   */
  public dispose(): void {
    // Dispose all vehicles
    for (const vehicle of this.vehicles.values()) {
      vehicle.dispose();
    }

    this.vehicles.clear();
    this.partsLibrary.clear();
    this.currentVehicle = null;
  }
}
