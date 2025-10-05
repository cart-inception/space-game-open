import { Vehicle } from '../systems/vehicle.js';

/**
 * UI component for displaying vehicle statistics
 * Shows mass, delta-v, TWR, part count, etc.
 */
export class VehicleStatsUI {
  private vehicle: Vehicle | null;
  private container: HTMLElement;
  private isVisible: boolean = true;

  // Display elements
  private nameDisplay: HTMLElement | null = null;
  private partCountDisplay: HTMLElement | null = null;
  private totalMassDisplay: HTMLElement | null = null;
  private dryMassDisplay: HTMLElement | null = null;
  private totalCostDisplay: HTMLElement | null = null;
  private twrDisplay: HTMLElement | null = null;
  private deltaVDisplay: HTMLElement | null = null;
  private stagesDisplay: HTMLElement | null = null;

  constructor(vehicle: Vehicle | null) {
    this.vehicle = vehicle;

    this.container = document.createElement('div');
    this.container.id = 'vehicle-stats-ui';

    this.createUI();

    // Add to document
    document.body.appendChild(this.container);
  }

  /**
   * Set vehicle
   */
  public setVehicle(vehicle: Vehicle | null): void {
    this.vehicle = vehicle;
    this.updateDisplay();
  }

  /**
   * Create UI structure
   */
  private createUI(): void {
    // Main container styles
    this.container.style.position = 'absolute';
    this.container.style.top = '10px';
    this.container.style.left = '10px';
    this.container.style.minWidth = '250px';
    this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    this.container.style.color = 'white';
    this.container.style.borderRadius = '8px';
    this.container.style.padding = '15px';
    this.container.style.fontFamily = 'Arial, sans-serif';
    this.container.style.fontSize = '14px';
    this.container.style.zIndex = '1000';

    // Vehicle name
    this.nameDisplay = document.createElement('h2');
    this.nameDisplay.style.margin = '0 0 15px 0';
    this.nameDisplay.style.fontSize = '18px';
    this.nameDisplay.style.borderBottom = '2px solid #444';
    this.nameDisplay.style.paddingBottom = '5px';
    this.container.appendChild(this.nameDisplay);

    // Stats section
    const statsSection = document.createElement('div');
    statsSection.style.marginBottom = '15px';

    // Create stat rows
    this.partCountDisplay = this.createStatRow('Parts:', '--');
    this.totalMassDisplay = this.createStatRow('Total Mass:', '--');
    this.dryMassDisplay = this.createStatRow('Dry Mass:', '--');
    this.totalCostDisplay = this.createStatRow('Total Cost:', '--');

    statsSection.appendChild(this.partCountDisplay);
    statsSection.appendChild(this.totalMassDisplay);
    statsSection.appendChild(this.dryMassDisplay);
    statsSection.appendChild(this.totalCostDisplay);

    this.container.appendChild(statsSection);

    // Performance section
    const perfSection = document.createElement('div');
    perfSection.style.marginBottom = '15px';
    perfSection.style.borderTop = '1px solid #333';
    perfSection.style.paddingTop = '10px';

    const perfLabel = document.createElement('div');
    perfLabel.textContent = 'Performance';
    perfLabel.style.fontWeight = 'bold';
    perfLabel.style.marginBottom = '8px';
    perfSection.appendChild(perfLabel);

    this.twrDisplay = this.createStatRow('TWR (Sea Level):', '--');
    this.deltaVDisplay = this.createStatRow('Total Δv:', '--');

    perfSection.appendChild(this.twrDisplay);
    perfSection.appendChild(this.deltaVDisplay);

    this.container.appendChild(perfSection);

    // Stages section
    const stagesSection = document.createElement('div');
    stagesSection.style.borderTop = '1px solid #333';
    stagesSection.style.paddingTop = '10px';

    const stagesLabel = document.createElement('div');
    stagesLabel.textContent = 'Stages';
    stagesLabel.style.fontWeight = 'bold';
    stagesLabel.style.marginBottom = '8px';
    stagesSection.appendChild(stagesLabel);

    this.stagesDisplay = document.createElement('div');
    this.stagesDisplay.style.fontSize = '12px';
    this.stagesDisplay.style.color = '#aaa';
    stagesSection.appendChild(this.stagesDisplay);

    this.container.appendChild(stagesSection);

    // Initial update
    this.updateDisplay();
  }

  /**
   * Create a stat row
   */
  private createStatRow(label: string, value: string): HTMLElement {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.marginBottom = '5px';
    row.style.fontSize = '13px';

    const labelElement = document.createElement('span');
    labelElement.textContent = label;
    labelElement.style.color = '#aaa';

    const valueElement = document.createElement('span');
    valueElement.textContent = value;
    valueElement.style.fontWeight = 'bold';
    valueElement.className = 'stat-value';

    row.appendChild(labelElement);
    row.appendChild(valueElement);

    return row;
  }

  /**
   * Update stat value
   */
  private updateStatValue(element: HTMLElement, value: string): void {
    const valueElement = element.querySelector('.stat-value');
    if (valueElement) {
      valueElement.textContent = value;
    }
  }

  /**
   * Update all displays
   */
  private updateDisplay(): void {
    if (!this.vehicle) {
      // Show empty state
      if (this.nameDisplay) {
        this.nameDisplay.textContent = 'No Vehicle';
      }
      this.updateStatValue(this.partCountDisplay!, '0');
      this.updateStatValue(this.totalMassDisplay!, '0 kg');
      this.updateStatValue(this.dryMassDisplay!, '0 kg');
      this.updateStatValue(this.totalCostDisplay!, '$0');
      this.updateStatValue(this.twrDisplay!, '--');
      this.updateStatValue(this.deltaVDisplay!, '0 m/s');

      if (this.stagesDisplay) {
        this.stagesDisplay.textContent = 'No stages';
      }

      return;
    }

    // Update name
    if (this.nameDisplay) {
      this.nameDisplay.textContent = this.vehicle.name;
    }

    // Recalculate vehicle properties
    this.vehicle.recalculateProperties();

    // Update basic stats
    const partCount = this.vehicle.parts.size;
    this.updateStatValue(this.partCountDisplay!, partCount.toString());

    const totalMass = this.vehicle.getTotalMass();
    this.updateStatValue(this.totalMassDisplay!, `${totalMass.toFixed(1)} kg`);

    const dryMass = this.vehicle.getDryMass();
    this.updateStatValue(this.dryMassDisplay!, `${dryMass.toFixed(1)} kg`);

    // Calculate total cost
    let totalCost = 0;
    for (const partObject of this.vehicle.getAllParts()) {
      totalCost += partObject.part.cost;
    }
    this.updateStatValue(this.totalCostDisplay!, `$${totalCost.toLocaleString()}`);

    // Update performance stats
    const twr = this.vehicle.calculateTWR();
    if (twr > 0) {
      this.updateStatValue(this.twrDisplay!, twr.toFixed(2));

      // Color code TWR
      const twrValue = this.twrDisplay!.querySelector('.stat-value') as HTMLElement;
      if (twrValue) {
        if (twr < 1.0) {
          twrValue.style.color = '#ff4444'; // Red - can't lift off
        } else if (twr < 1.5) {
          twrValue.style.color = '#ffaa44'; // Orange - marginal
        } else {
          twrValue.style.color = '#44ff44'; // Green - good
        }
      }
    } else {
      this.updateStatValue(this.twrDisplay!, '--');
    }

    // Calculate total delta-v
    let totalDeltaV = 0;
    for (let i = 0; i < this.vehicle.stages.length; i++) {
      totalDeltaV += this.vehicle.calculateDeltaV(i);
    }
    this.updateStatValue(this.deltaVDisplay!, `${totalDeltaV.toFixed(0)} m/s`);

    // Update stages display
    if (this.stagesDisplay) {
      if (this.vehicle.stages.length === 0) {
        this.stagesDisplay.innerHTML = '<span style="color: #ff4444;">No stages configured</span>';
      } else {
        this.stagesDisplay.innerHTML = '';

        for (let i = 0; i < this.vehicle.stages.length; i++) {
          const stage = this.vehicle.stages[i];
          const deltaV = this.vehicle.calculateDeltaV(i);

          const stageRow = document.createElement('div');
          stageRow.style.marginBottom = '5px';
          stageRow.style.padding = '5px';
          stageRow.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          stageRow.style.borderRadius = '3px';

          const stageName = document.createElement('div');
          stageName.textContent = `Stage ${stage.stageNumber}: ${stage.action}`;
          stageName.style.fontWeight = 'bold';
          stageName.style.fontSize = '11px';

          const stageDeltaV = document.createElement('div');
          stageDeltaV.textContent = `Δv: ${deltaV.toFixed(0)} m/s | Parts: ${stage.partIds.length}`;
          stageDeltaV.style.fontSize = '10px';
          stageDeltaV.style.color = '#888';

          stageRow.appendChild(stageName);
          stageRow.appendChild(stageDeltaV);

          this.stagesDisplay.appendChild(stageRow);
        }
      }
    }
  }

  /**
   * Update (called each frame)
   */
  public update(): void {
    // Update display periodically (not every frame)
    // We'll update when vehicle changes, which is more efficient
    if (this.vehicle) {
      this.updateDisplay();
    }
  }

  /**
   * Toggle visibility
   */
  public toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.container.style.display = this.isVisible ? 'block' : 'none';
  }

  /**
   * Show stats
   */
  public show(): void {
    this.isVisible = true;
    this.container.style.display = 'block';
  }

  /**
   * Hide stats
   */
  public hide(): void {
    this.isVisible = false;
    this.container.style.display = 'none';
  }

  /**
   * Dispose of resources
   */
  public dispose(): void {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
