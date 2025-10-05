import { Vehicle } from '../systems/vehicle.js';
import { PartPlacement } from '../systems/part-placement.js';
import { InputManager } from '../systems/input-manager.js';

/**
 * UI component for assembly editor controls
 * Includes symmetry modes, part manipulation, and action buttons
 */
export class AssemblyControlsUI {
  private vehicle: Vehicle | null;
  private partPlacement: PartPlacement | null;
  private inputManager: InputManager;
  private container: HTMLElement;
  private isVisible: boolean = true;

  // UI Elements
  private symmetryButtons: Map<number, HTMLButtonElement> = new Map();
  private currentSymmetryDisplay: HTMLElement | null = null;

  constructor(
    vehicle: Vehicle | null,
    partPlacement: PartPlacement | null,
    inputManager: InputManager
  ) {
    this.vehicle = vehicle;
    this.partPlacement = partPlacement;
    this.inputManager = inputManager;

    this.container = document.createElement('div');
    this.container.id = 'assembly-controls-ui';

    this.createUI();

    // Add to document
    document.body.appendChild(this.container);
  }

  /**
   * Set vehicle
   */
  public setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }

  /**
   * Set part placement
   */
  public setPartPlacement(partPlacement: PartPlacement): void {
    this.partPlacement = partPlacement;
  }

  /**
   * Create UI structure
   */
  private createUI(): void {
    // Main container styles
    this.container.style.position = 'absolute';
    this.container.style.bottom = '10px';
    this.container.style.left = '10px';
    this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    this.container.style.color = 'white';
    this.container.style.borderRadius = '8px';
    this.container.style.padding = '15px';
    this.container.style.fontFamily = 'Arial, sans-serif';
    this.container.style.fontSize = '14px';
    this.container.style.zIndex = '1000';

    // Title
    const title = document.createElement('h3');
    title.textContent = 'Assembly Controls';
    title.style.margin = '0 0 15px 0';
    title.style.fontSize = '16px';
    title.style.borderBottom = '2px solid #444';
    title.style.paddingBottom = '5px';
    this.container.appendChild(title);

    // Symmetry section
    this.createSymmetrySection();

    // Part manipulation section
    this.createManipulationSection();

    // Action buttons section
    this.createActionButtons();

    // Keyboard shortcuts help
    this.createKeyboardHelp();
  }

  /**
   * Create symmetry controls section
   */
  private createSymmetrySection(): void {
    const section = document.createElement('div');
    section.style.marginBottom = '15px';

    const label = document.createElement('div');
    label.textContent = 'Symmetry Mode';
    label.style.fontWeight = 'bold';
    label.style.marginBottom = '8px';
    section.appendChild(label);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '5px';
    buttonsContainer.style.flexWrap = 'wrap';

    const modes = [1, 2, 3, 4, 6, 8];

    for (const mode of modes) {
      const button = document.createElement('button');
      button.textContent = `${mode}x`;
      button.style.padding = '8px 12px';
      button.style.backgroundColor = mode === 1 ? '#0066cc' : '#333';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '4px';
      button.style.cursor = 'pointer';
      button.style.fontSize = '14px';
      button.style.fontWeight = 'bold';
      button.style.transition = 'background-color 0.2s';

      button.addEventListener('mouseenter', () => {
        if (this.partPlacement?.getSymmetryMode() !== mode) {
          button.style.backgroundColor = '#444';
        }
      });

      button.addEventListener('mouseleave', () => {
        if (this.partPlacement?.getSymmetryMode() !== mode) {
          button.style.backgroundColor = '#333';
        }
      });

      button.addEventListener('click', () => {
        this.setSymmetryMode(mode);
      });

      buttonsContainer.appendChild(button);
      this.symmetryButtons.set(mode, button);
    }

    section.appendChild(buttonsContainer);

    // Current symmetry display
    this.currentSymmetryDisplay = document.createElement('div');
    this.currentSymmetryDisplay.style.marginTop = '8px';
    this.currentSymmetryDisplay.style.fontSize = '12px';
    this.currentSymmetryDisplay.style.color = '#aaa';
    this.currentSymmetryDisplay.textContent = 'Current: 1x (No Symmetry)';
    section.appendChild(this.currentSymmetryDisplay);

    this.container.appendChild(section);
  }

  /**
   * Create part manipulation section
   */
  private createManipulationSection(): void {
    const section = document.createElement('div');
    section.style.marginBottom = '15px';

    const label = document.createElement('div');
    label.textContent = 'Part Manipulation';
    label.style.fontWeight = 'bold';
    label.style.marginBottom = '8px';
    section.appendChild(label);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'grid';
    buttonsContainer.style.gridTemplateColumns = '1fr 1fr';
    buttonsContainer.style.gap = '5px';

    // Rotate buttons
    const rotateButtons = [
      { label: 'Rotate ↻', key: 'Q' },
      { label: 'Rotate ↺', key: 'E' },
      { label: 'Delete', key: 'Del' },
      { label: 'Reset', key: 'R' }
    ];

    for (const btn of rotateButtons) {
      const button = this.createButton(btn.label, btn.key);
      button.addEventListener('click', () => {
        this.handleManipulationAction(btn.key);
      });
      buttonsContainer.appendChild(button);
    }

    section.appendChild(buttonsContainer);
    this.container.appendChild(section);
  }

  /**
   * Create action buttons section
   */
  private createActionButtons(): void {
    const section = document.createElement('div');
    section.style.marginBottom = '15px';

    const label = document.createElement('div');
    label.textContent = 'Actions';
    label.style.fontWeight = 'bold';
    label.style.marginBottom = '8px';
    section.appendChild(label);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'grid';
    buttonsContainer.style.gridTemplateColumns = '1fr 1fr';
    buttonsContainer.style.gap = '5px';

    // Action buttons
    const actions = [
      { label: 'New Vehicle', action: 'new' },
      { label: 'Save', action: 'save' },
      { label: 'Load', action: 'load' },
      { label: 'Launch', action: 'launch' }
    ];

    for (const action of actions) {
      const button = this.createButton(action.label);
      button.addEventListener('click', () => {
        this.handleAction(action.action);
      });
      buttonsContainer.appendChild(button);
    }

    section.appendChild(buttonsContainer);
    this.container.appendChild(section);
  }

  /**
   * Create keyboard shortcuts help
   */
  private createKeyboardHelp(): void {
    const section = document.createElement('div');
    section.style.fontSize = '11px';
    section.style.color = '#888';
    section.style.borderTop = '1px solid #333';
    section.style.paddingTop = '10px';

    const label = document.createElement('div');
    label.textContent = 'Keyboard Shortcuts:';
    label.style.fontWeight = 'bold';
    label.style.marginBottom = '5px';
    section.appendChild(label);

    const shortcuts = [
      '1-8: Set symmetry mode',
      'Q/E: Rotate part',
      'Del: Delete selected part',
      'R: Reset part rotation',
      'Esc: Cancel placement',
      'Ctrl+S: Save vehicle',
      'L: Launch vehicle'
    ];

    const list = document.createElement('ul');
    list.style.margin = '0';
    list.style.paddingLeft = '20px';

    for (const shortcut of shortcuts) {
      const item = document.createElement('li');
      item.textContent = shortcut;
      item.style.marginBottom = '3px';
      list.appendChild(item);
    }

    section.appendChild(list);
    this.container.appendChild(section);
  }

  /**
   * Create a button
   */
  private createButton(label: string, keyHint?: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = keyHint ? `${label} (${keyHint})` : label;
    button.style.padding = '8px 12px';
    button.style.backgroundColor = '#333';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '13px';
    button.style.transition = 'background-color 0.2s';

    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor = '#444';
    });

    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = '#333';
    });

    return button;
  }

  /**
   * Set symmetry mode
   */
  private setSymmetryMode(mode: number): void {
    if (this.partPlacement) {
      this.partPlacement.setSymmetryMode(mode);
    }

    // Update button styles
    for (const [m, button] of this.symmetryButtons.entries()) {
      button.style.backgroundColor = m === mode ? '#0066cc' : '#333';
    }

    // Update display
    if (this.currentSymmetryDisplay) {
      const modeText = mode === 1 ? 'No Symmetry' : `${mode}-way Radial`;
      this.currentSymmetryDisplay.textContent = `Current: ${mode}x (${modeText})`;
    }
  }

  /**
   * Handle manipulation actions
   */
  private handleManipulationAction(action: string): void {
    console.log(`Manipulation action: ${action}`);

    // TODO: Implement actual manipulation
    // For now, just log the action
    switch (action) {
      case 'Q':
        console.log('Rotate counterclockwise');
        break;
      case 'E':
        console.log('Rotate clockwise');
        break;
      case 'Del':
        console.log('Delete selected part');
        break;
      case 'R':
        console.log('Reset rotation');
        break;
    }
  }

  /**
   * Handle actions
   */
  private handleAction(action: string): void {
    console.log(`Action: ${action}`);

    switch (action) {
      case 'new':
        if (confirm('Create new vehicle? Unsaved changes will be lost.')) {
          // TODO: Create new vehicle
          console.log('Creating new vehicle...');
        }
        break;

      case 'save':
        if (this.vehicle) {
          // TODO: Implement save dialog
          const name = prompt('Enter vehicle name:', this.vehicle.name);
          if (name) {
            this.vehicle.name = name;
            // Save to localStorage (already implemented in VehicleManager)
            console.log('Vehicle saved');
          }
        }
        break;

      case 'load':
        // TODO: Implement load dialog
        console.log('Load vehicle dialog...');
        break;

      case 'launch':
        if (this.vehicle) {
          if (confirm(`Launch "${this.vehicle.name}"?`)) {
            // TODO: Transition to flight scene
            console.log('Launching vehicle...');
          }
        }
        break;
    }
  }

  /**
   * Update (called each frame)
   */
  public update(): void {
    // Update symmetry mode display
    if (this.partPlacement && this.currentSymmetryDisplay) {
      const currentMode = this.partPlacement.getSymmetryMode();

      // Update button highlighting
      for (const [mode, button] of this.symmetryButtons.entries()) {
        button.style.backgroundColor = mode === currentMode ? '#0066cc' : '#333';
      }
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
   * Show controls
   */
  public show(): void {
    this.isVisible = true;
    this.container.style.display = 'block';
  }

  /**
   * Hide controls
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
