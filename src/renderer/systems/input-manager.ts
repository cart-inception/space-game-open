export interface KeyboardState {
  [key: string]: boolean;
}

export interface MouseState {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  leftButton: boolean;
  middleButton: boolean;
  rightButton: boolean;
}

export interface InputEvents {
  keyDown: (key: string) => void;
  keyUp: (key: string) => void;
  mouseDown: (button: number, x: number, y: number) => void;
  mouseUp: (button: number, x: number, y: number) => void;
  mouseMove: (x: number, y: number, deltaX: number, deltaY: number) => void;
  wheel: (deltaX: number, deltaY: number) => void;
}

export class InputManager {
  private keyboardState: KeyboardState;
  private mouseState: MouseState;
  private previousMouseState: MouseState;
  private eventListeners: Map<keyof InputEvents, Function[]>;

  constructor() {
    this.keyboardState = {};
    this.mouseState = {
      x: 0,
      y: 0,
      deltaX: 0,
      deltaY: 0,
      leftButton: false,
      middleButton: false,
      rightButton: false,
    };
    this.previousMouseState = { ...this.mouseState };
    this.eventListeners = new Map();
  }

  public init(): void {
    // Set up keyboard event listeners
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));

    // Set up mouse event listeners
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('wheel', this.handleWheel.bind(this));

    // Prevent context menu on right click
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    console.log('Input manager initialized');
  }

  public update(): void {
    // Store previous mouse state
    this.previousMouseState = { ...this.mouseState };

    // Reset mouse delta
    this.mouseState.deltaX = 0;
    this.mouseState.deltaY = 0;
  }

  public isKeyDown(key: string): boolean {
    return this.keyboardState[key] || false;
  }

  public isKeyPressed(key: string): boolean {
    return this.keyboardState[key] || false;
  }

  public isMouseButtonPressed(button: 'left' | 'middle' | 'right'): boolean {
    switch (button) {
      case 'left':
        return this.mouseState.leftButton && !this.previousMouseState.leftButton;
      case 'middle':
        return this.mouseState.middleButton && !this.previousMouseState.middleButton;
      case 'right':
        return this.mouseState.rightButton && !this.previousMouseState.rightButton;
      default:
        return false;
    }
  }

  public isMouseButtonDown(button: 'left' | 'middle' | 'right'): boolean {
    switch (button) {
      case 'left':
        return this.mouseState.leftButton;
      case 'middle':
        return this.mouseState.middleButton;
      case 'right':
        return this.mouseState.rightButton;
      default:
        return false;
    }
  }

  public getMousePosition(): { x: number; y: number } {
    return { x: this.mouseState.x, y: this.mouseState.y };
  }

  public getMouseDelta(): { x: number; y: number } {
    return { x: this.mouseState.deltaX, y: this.mouseState.deltaY };
  }

  public addEventListener<K extends keyof InputEvents>(
    event: K,
    callback: InputEvents[K]
  ): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  public removeEventListener<K extends keyof InputEvents>(
    event: K,
    callback: InputEvents[K]
  ): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = event.code;
    this.keyboardState[key] = true;

    // Trigger key down events
    const listeners = this.eventListeners.get('keyDown');
    if (listeners) {
      listeners.forEach((callback) => callback(key));
    }
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const key = event.code;
    this.keyboardState[key] = false;

    // Trigger key up events
    const listeners = this.eventListeners.get('keyUp');
    if (listeners) {
      listeners.forEach((callback) => callback(key));
    }
  }

  private handleMouseDown(event: MouseEvent): void {
    switch (event.button) {
      case 0:
        this.mouseState.leftButton = true;
        break;
      case 1:
        this.mouseState.middleButton = true;
        break;
      case 2:
        this.mouseState.rightButton = true;
        break;
    }

    // Trigger mouse down events
    const listeners = this.eventListeners.get('mouseDown');
    if (listeners) {
      listeners.forEach((callback) => callback(event.button, event.clientX, event.clientY));
    }
  }

  private handleMouseUp(event: MouseEvent): void {
    switch (event.button) {
      case 0:
        this.mouseState.leftButton = false;
        break;
      case 1:
        this.mouseState.middleButton = false;
        break;
      case 2:
        this.mouseState.rightButton = false;
        break;
    }

    // Trigger mouse up events
    const listeners = this.eventListeners.get('mouseUp');
    if (listeners) {
      listeners.forEach((callback) => callback(event.button, event.clientX, event.clientY));
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    const deltaX = event.clientX - this.mouseState.x;
    const deltaY = event.clientY - this.mouseState.y;

    this.mouseState.x = event.clientX;
    this.mouseState.y = event.clientY;
    this.mouseState.deltaX = deltaX;
    this.mouseState.deltaY = deltaY;

    // Trigger mouse move events
    const listeners = this.eventListeners.get('mouseMove');
    if (listeners) {
      listeners.forEach((callback) => callback(event.clientX, event.clientY, deltaX, deltaY));
    }
  }

  private handleWheel(event: WheelEvent): void {
    event.preventDefault();

    // Trigger wheel events
    const listeners = this.eventListeners.get('wheel');
    if (listeners) {
      listeners.forEach((callback) => callback(event.deltaX, event.deltaY));
    }
  }
}