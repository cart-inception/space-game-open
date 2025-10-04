import { SceneManager } from './systems/scene-manager.js';
import { InputManager } from './systems/input-manager.js';
import { GraphicsEngine } from './systems/graphics-engine.js';

export class Game {
  private sceneManager: SceneManager;
  private inputManager: InputManager;
  private graphicsEngine: GraphicsEngine;
  private isRunning = false;
  private lastTime = 0;

  constructor() {
    this.sceneManager = new SceneManager();
    this.inputManager = new InputManager();
    this.graphicsEngine = new GraphicsEngine();
  }

  public init(): void {
    // Initialize the graphics engine
    this.graphicsEngine.init();

    // Initialize the scene manager
    this.sceneManager.init(this.graphicsEngine);

    // Initialize the input manager
    this.inputManager.init();

    // Set up event listeners
    this.setupEventListeners();

    console.log('Game initialized');
  }

  public startNewGame(): void {
    if (this.isRunning) {
      this.stop();
    }

    // Load the main game scene
    this.sceneManager.loadScene('main-game');

    // Start the game loop
    this.start();

    console.log('New game started');
  }

  public start(): void {
    this.isRunning = true;
    this.lastTime = performance.now();
    this.gameLoop();
  }

  public stop(): void {
    this.isRunning = false;
  }

  private gameLoop(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = currentTime;

    // Update the game state
    this.update(deltaTime);

    // Render the scene
    this.render();

    // Continue the game loop
    requestAnimationFrame(() => this.gameLoop());
  }

  private update(deltaTime: number): void {
    // Update the scene manager
    this.sceneManager.update(deltaTime);

    // Update the input manager
    this.inputManager.update();
  }

  private render(): void {
    // Render the current scene
    this.graphicsEngine.render();
  }

  private setupEventListeners(): void {
    // Handle window resize
    window.addEventListener('resize', () => {
      this.graphicsEngine.handleResize();
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else if (this.sceneManager.getCurrentScene() === 'main-game') {
        this.start();
      }
    });
  }
}