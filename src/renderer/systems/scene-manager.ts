import { GraphicsEngine } from './graphics-engine.js';

export type SceneType = 'main-menu' | 'main-game' | 'settings' | 'loading';

export interface Scene {
  name: SceneType;
  init: (graphicsEngine: GraphicsEngine) => void;
  update: (deltaTime: number) => void;
  destroy: () => void;
}

export class SceneManager {
  private scenes: Map<SceneType, Scene>;
  private currentScene: SceneType | null;
  private graphicsEngine: GraphicsEngine | null;

  constructor() {
    this.scenes = new Map();
    this.currentScene = null;
    this.graphicsEngine = null;
  }

  public init(graphicsEngine: GraphicsEngine): void {
    this.graphicsEngine = graphicsEngine;
    
    // Register scenes
    this.registerScene(new MainMenuScene());
    this.registerScene(new MainGameScene());
    this.registerScene(new SettingsScene());
    this.registerScene(new LoadingScene());

    // Load the main menu scene by default
    this.loadScene('main-menu');
  }

  public registerScene(scene: Scene): void {
    this.scenes.set(scene.name, scene);
  }

  public loadScene(sceneName: SceneType): void {
    // Destroy the current scene if it exists
    if (this.currentScene && this.graphicsEngine) {
      const currentScene = this.scenes.get(this.currentScene);
      if (currentScene) {
        currentScene.destroy();
      }
    }

    // Load the new scene
    const newScene = this.scenes.get(sceneName);
    if (!newScene) {
      console.error(`Scene ${sceneName} not found`);
      return;
    }

    if (this.graphicsEngine) {
      newScene.init(this.graphicsEngine);
    }

    this.currentScene = sceneName;
    console.log(`Loaded scene: ${sceneName}`);
  }

  public update(deltaTime: number): void {
    if (!this.currentScene) return;

    const scene = this.scenes.get(this.currentScene);
    if (scene) {
      scene.update(deltaTime);
    }
  }

  public getCurrentScene(): SceneType | null {
    return this.currentScene;
  }
}

// Scene implementations
class MainMenuScene implements Scene {
  name: SceneType = 'main-menu';

  init(_graphicsEngine: GraphicsEngine): void {
    // Initialize main menu scene
    console.log('Main menu scene initialized');
  }

  update(_deltaTime: number): void {
    // Update main menu scene
  }

  destroy(): void {
    // Clean up main menu scene
    console.log('Main menu scene destroyed');
  }
}

class MainGameScene implements Scene {
  name: SceneType = 'main-game';

  init(_graphicsEngine: GraphicsEngine): void {
    // Initialize main game scene
    console.log('Main game scene initialized');
  }

  update(_deltaTime: number): void {
    // Update main game scene
  }

  destroy(): void {
    // Clean up main game scene
    console.log('Main game scene destroyed');
  }
}

class SettingsScene implements Scene {
  name: SceneType = 'settings';

  init(_graphicsEngine: GraphicsEngine): void {
    // Initialize settings scene
    console.log('Settings scene initialized');
  }

  update(_deltaTime: number): void {
    // Update settings scene
  }

  destroy(): void {
    // Clean up settings scene
    console.log('Settings scene destroyed');
  }
}

class LoadingScene implements Scene {
  name: SceneType = 'loading';

  init(_graphicsEngine: GraphicsEngine): void {
    // Initialize loading scene
    console.log('Loading scene initialized');
  }

  update(_deltaTime: number): void {
    // Update loading scene
  }

  destroy(): void {
    // Clean up loading scene
    console.log('Loading scene destroyed');
  }
}