import { TimeManager, TimeScale } from '../systems/time-manager.js';
import { CelestialBodiesManager } from '../systems/celestial-bodies-manager.js';
import { CameraController } from '../systems/camera-controller.js';

export class SpaceUI {
  private timeManager: TimeManager;
  private celestialBodiesManager: CelestialBodiesManager;
  private cameraController: CameraController;
  private container: HTMLElement;
  private isVisible: boolean = true;
  
  // UI Elements
  private timePanel!: HTMLElement;
  private controlsPanel!: HTMLElement;
  private infoPanel!: HTMLElement;
  
  // Time controls
  private timeScaleSelect!: HTMLSelectElement;
  private currentTimeDisplay!: HTMLElement;
  private pauseButton!: HTMLButtonElement;
  
  // Camera controls
  private bodySelect!: HTMLSelectElement;
  private focusButton!: HTMLButtonElement;
  private toggleOrbitsButton!: HTMLButtonElement;
  
  // Info display
  private focusedBodyInfo!: HTMLElement;
  private cameraInfo!: HTMLElement;
  
  constructor(
    timeManager: TimeManager,
    celestialBodiesManager: CelestialBodiesManager,
    cameraController: CameraController
  ) {
    this.timeManager = timeManager;
    this.celestialBodiesManager = celestialBodiesManager;
    this.cameraController = cameraController;
    
    this.container = document.createElement('div');
    this.container.id = 'space-ui';
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.pointerEvents = 'none';
    this.container.style.zIndex = '1000';
    
    this.createUI();
    this.setupEventListeners();
    
    // Add to document
    document.body.appendChild(this.container);
  }
  
  private createUI(): void {
    // Create time panel
    this.createTimePanel();
    
    // Create controls panel
    this.createControlsPanel();
    
    // Create info panel
    this.createInfoPanel();
  }
  
  private createTimePanel(): void {
    this.timePanel = document.createElement('div');
    this.timePanel.style.position = 'absolute';
    this.timePanel.style.top = '10px';
    this.timePanel.style.left = '10px';
    this.timePanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    this.timePanel.style.color = 'white';
    this.timePanel.style.padding = '10px';
    this.timePanel.style.borderRadius = '5px';
    this.timePanel.style.pointerEvents = 'auto';
    this.timePanel.style.fontFamily = 'Arial, sans-serif';
    this.timePanel.style.fontSize = '14px';
    
    // Title
    const title = document.createElement('h3');
    title.textContent = 'Time Controls';
    title.style.margin = '0 0 10px 0';
    this.timePanel.appendChild(title);
    
    // Time scale selector
    const scaleLabel = document.createElement('label');
    scaleLabel.textContent = 'Time Scale: ';
    scaleLabel.style.display = 'block';
    scaleLabel.style.marginBottom = '5px';
    this.timePanel.appendChild(scaleLabel);
    
    this.timeScaleSelect = document.createElement('select');
    this.timeScaleSelect.style.width = '100%';
    this.timeScaleSelect.style.marginBottom = '10px';
    this.timeScaleSelect.style.padding = '5px';
    
    const timeScales: { value: TimeScale; label: string }[] = [
      { value: 'paused', label: 'Paused' },
      { value: 'realtime', label: 'Real-time' },
      { value: 'minutes', label: 'Minutes/second' },
      { value: 'hours', label: 'Hours/second' },
      { value: 'days', label: 'Days/second' },
      { value: 'weeks', label: 'Weeks/second' },
      { value: 'months', label: 'Months/second' },
      { value: 'years', label: 'Years/second' }
    ];
    
    timeScales.forEach(scale => {
      const option = document.createElement('option');
      option.value = scale.value;
      option.textContent = scale.label;
      this.timeScaleSelect.appendChild(option);
    });
    
    this.timeScaleSelect.value = this.timeManager.getTimeScale();
    this.timePanel.appendChild(this.timeScaleSelect);
    
    // Current time display
    const timeLabel = document.createElement('label');
    timeLabel.textContent = 'Current Time: ';
    timeLabel.style.display = 'block';
    timeLabel.style.marginBottom = '5px';
    this.timePanel.appendChild(timeLabel);
    
    this.currentTimeDisplay = document.createElement('div');
    this.currentTimeDisplay.style.marginBottom = '10px';
    this.currentTimeDisplay.style.fontFamily = 'monospace';
    this.updateTimeDisplay();
    this.timePanel.appendChild(this.currentTimeDisplay);
    
    // Pause button
    this.pauseButton = document.createElement('button');
    this.pauseButton.textContent = 'Pause';
    this.pauseButton.style.width = '100%';
    this.pauseButton.style.padding = '5px';
    this.pauseButton.style.backgroundColor = '#4CAF50';
    this.pauseButton.style.color = 'white';
    this.pauseButton.style.border = 'none';
    this.pauseButton.style.borderRadius = '3px';
    this.pauseButton.style.cursor = 'pointer';
    this.updatePauseButton();
    this.timePanel.appendChild(this.pauseButton);
    
    this.container.appendChild(this.timePanel);
  }
  
  private createControlsPanel(): void {
    this.controlsPanel = document.createElement('div');
    this.controlsPanel.style.position = 'absolute';
    this.controlsPanel.style.top = '10px';
    this.controlsPanel.style.right = '10px';
    this.controlsPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    this.controlsPanel.style.color = 'white';
    this.controlsPanel.style.padding = '10px';
    this.controlsPanel.style.borderRadius = '5px';
    this.controlsPanel.style.pointerEvents = 'auto';
    this.controlsPanel.style.fontFamily = 'Arial, sans-serif';
    this.controlsPanel.style.fontSize = '14px';
    
    // Title
    const title = document.createElement('h3');
    title.textContent = 'Camera Controls';
    title.style.margin = '0 0 10px 0';
    this.controlsPanel.appendChild(title);
    
    // Body selector
    const bodyLabel = document.createElement('label');
    bodyLabel.textContent = 'Focus on Body: ';
    bodyLabel.style.display = 'block';
    bodyLabel.style.marginBottom = '5px';
    this.controlsPanel.appendChild(bodyLabel);
    
    this.bodySelect = document.createElement('select');
    this.bodySelect.style.width = '100%';
    this.bodySelect.style.marginBottom = '10px';
    this.bodySelect.style.padding = '5px';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'None';
    this.bodySelect.appendChild(defaultOption);
    
    // Add celestial bodies
    const bodies = this.celestialBodiesManager.getAllBodies();
    bodies.forEach(body => {
      const option = document.createElement('option');
      option.value = body.body.id;
      option.textContent = body.body.name;
      this.bodySelect.appendChild(option);
    });
    
    this.controlsPanel.appendChild(this.bodySelect);
    
    // Focus button
    this.focusButton = document.createElement('button');
    this.focusButton.textContent = 'Focus Camera';
    this.focusButton.style.width = '100%';
    this.focusButton.style.marginBottom = '10px';
    this.focusButton.style.padding = '5px';
    this.focusButton.style.backgroundColor = '#2196F3';
    this.focusButton.style.color = 'white';
    this.focusButton.style.border = 'none';
    this.focusButton.style.borderRadius = '3px';
    this.focusButton.style.cursor = 'pointer';
    this.controlsPanel.appendChild(this.focusButton);
    
    // Toggle orbits button
    this.toggleOrbitsButton = document.createElement('button');
    this.toggleOrbitsButton.textContent = 'Toggle Orbits';
    this.toggleOrbitsButton.style.width = '100%';
    this.toggleOrbitsButton.style.padding = '5px';
    this.toggleOrbitsButton.style.backgroundColor = '#FF9800';
    this.toggleOrbitsButton.style.color = 'white';
    this.toggleOrbitsButton.style.border = 'none';
    this.toggleOrbitsButton.style.borderRadius = '3px';
    this.toggleOrbitsButton.style.cursor = 'pointer';
    this.controlsPanel.appendChild(this.toggleOrbitsButton);
    
    this.container.appendChild(this.controlsPanel);
  }
  
  private createInfoPanel(): void {
    this.infoPanel = document.createElement('div');
    this.infoPanel.style.position = 'absolute';
    this.infoPanel.style.bottom = '10px';
    this.infoPanel.style.left = '10px';
    this.infoPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    this.infoPanel.style.color = 'white';
    this.infoPanel.style.padding = '10px';
    this.infoPanel.style.borderRadius = '5px';
    this.infoPanel.style.pointerEvents = 'auto';
    this.infoPanel.style.fontFamily = 'Arial, sans-serif';
    this.infoPanel.style.fontSize = '14px';
    this.infoPanel.style.minWidth = '250px';
    
    // Title
    const title = document.createElement('h3');
    title.textContent = 'Information';
    title.style.margin = '0 0 10px 0';
    this.infoPanel.appendChild(title);
    
    // Focused body info
    this.focusedBodyInfo = document.createElement('div');
    this.focusedBodyInfo.style.marginBottom = '10px';
    this.focusedBodyInfo.innerHTML = '<p>No body focused</p>';
    this.infoPanel.appendChild(this.focusedBodyInfo);
    
    // Camera info
    this.cameraInfo = document.createElement('div');
    this.cameraInfo.innerHTML = '<p>Camera: Free movement</p>';
    this.infoPanel.appendChild(this.cameraInfo);
    
    this.container.appendChild(this.infoPanel);
  }
  
  private setupEventListeners(): void {
    // Time scale change
    this.timeScaleSelect.addEventListener('change', () => {
      this.timeManager.setTimeScale(this.timeScaleSelect.value as TimeScale);
      this.updatePauseButton();
    });
    
    // Pause button
    this.pauseButton.addEventListener('click', () => {
      if (this.timeManager.getTimeScale() === 'paused') {
        this.timeManager.setTimeScale('realtime');
      } else {
        this.timeManager.setTimeScale('paused');
      }
      this.updatePauseButton();
      this.timeScaleSelect.value = this.timeManager.getTimeScale();
    });
    
    // Focus button
    this.focusButton.addEventListener('click', () => {
      const selectedBodyId = this.bodySelect.value;
      if (selectedBodyId) {
        this.celestialBodiesManager.focusOnBody(selectedBodyId);
        this.updateFocusedBodyInfo(selectedBodyId);
      }
    });
    
    // Toggle orbits button
    this.toggleOrbitsButton.addEventListener('click', () => {
      this.celestialBodiesManager.toggleOrbitLines();
    });
    
    // Time change listener
    this.timeManager.onTimeChange(() => {
      this.updateTimeDisplay();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      if (!this.isVisible) return;
      
      switch (event.key) {
        case ' ':
          event.preventDefault();
          this.pauseButton.click();
          break;
        case 'o':
        case 'O':
          this.toggleOrbitsButton.click();
          break;
      }
    });
  }
  
  private updateTimeDisplay(): void {
    const time = this.timeManager.getCurrentTime();
    const date = new Date(time * 1000);
    this.currentTimeDisplay.textContent = date.toISOString();
  }
  
  private updatePauseButton(): void {
    if (this.timeManager.getTimeScale() === 'paused') {
      this.pauseButton.textContent = 'Resume';
      this.pauseButton.style.backgroundColor = '#4CAF50';
    } else {
      this.pauseButton.textContent = 'Pause';
      this.pauseButton.style.backgroundColor = '#f44336';
    }
  }
  
  private updateFocusedBodyInfo(bodyId: string): void {
    const bodyData = this.celestialBodiesManager.getBodyData(bodyId);
    if (!bodyData) return;
    
    let info = `<p><strong>${bodyData.name}</strong></p>`;
    info += `<p>Type: ${bodyData.type}</p>`;
    info += `<p>Radius: ${this.timeManager.formatDistance(bodyData.radius)}</p>`;
    info += `<p>Mass: ${bodyData.mass.toExponential(2)} kg</p>`;
    
    if (bodyData.orbitalElements.period > 0) {
      info += `<p>Orbital Period: ${this.timeManager.formatDuration(bodyData.orbitalElements.period)}</p>`;
      info += `<p>Semi-major Axis: ${this.timeManager.formatDistance(bodyData.orbitalElements.semiMajorAxis)}</p>`;
    }
    
    if (bodyData.atmosphere) {
      info += `<p>Atmosphere: Yes (${this.timeManager.formatDistance(bodyData.atmosphere.height)} height)</p>`;
    }
    
    this.focusedBodyInfo.innerHTML = info;
  }
  
  public update(): void {
    // Update camera info
    if (this.cameraController) {
      const camera = this.cameraController.getCamera();
      const cameraPosition = camera.position;
      const distance = this.timeManager.formatDistance(cameraPosition.length());
      this.cameraInfo.innerHTML = `<p>Camera Distance: ${distance}</p>`;
    }
  }
  
  public setVisible(visible: boolean): void {
    this.isVisible = visible;
    this.container.style.display = visible ? 'block' : 'none';
  }
  
  public toggleVisible(): void {
    this.setVisible(!this.isVisible);
  }
  
  public dispose(): void {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}