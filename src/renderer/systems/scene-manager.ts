import { GraphicsEngine } from './graphics-engine.js';
import { TimeManager } from './time-manager.js';
import { CelestialBodiesManager } from './celestial-bodies-manager.js';
import { CameraController } from './camera-controller.js';
import { InputManager } from './input-manager.js';
import { SpaceUI } from '../components/space-ui.js';
import { PhysicsWorld } from './physics-world.js';
import { GravitySystem } from './gravity-system.js';
import { AtmosphericPhysics } from './atmospheric-physics.js';
import { VehicleManager } from './vehicle-manager.js';
import { Vehicle } from './vehicle.js';
import { PartPlacement } from './part-placement.js';
import { PartsCatalogUI } from '../components/parts-catalog-ui.js';
import { AssemblyControlsUI } from '../components/assembly-controls-ui.js';
import { VehicleStatsUI } from '../components/vehicle-stats-ui.js';

export type SceneType = 'main-menu' | 'main-game' | 'settings' | 'loading' | 'assembly-editor';

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
    this.registerScene(new AssemblyEditorScene());

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

  private timeManager: TimeManager | null = null;
  private celestialBodiesManager: CelestialBodiesManager | null = null;
  private cameraController: CameraController | null = null;
  private inputManager: InputManager | null = null;
  private spaceUI: SpaceUI | null = null;
  private physicsWorld: PhysicsWorld | null = null;
  private gravitySystem: GravitySystem | null = null;
  private atmosphericPhysics: AtmosphericPhysics | null = null;

  init(graphicsEngine: GraphicsEngine): void {
    // Initialize main game scene
    console.log('Main game scene initialized');

    // Create input manager
    this.inputManager = new InputManager();
    this.inputManager.init();

    // Create time manager
    this.timeManager = new TimeManager();

    // Create camera controller
    this.cameraController = new CameraController(
      graphicsEngine.getCamera(),
      this.inputManager,
      graphicsEngine.getRenderer().domElement
    );

    // Create physics systems
    this.physicsWorld = new PhysicsWorld();
    this.gravitySystem = new GravitySystem();
    this.atmosphericPhysics = new AtmosphericPhysics();

    // Create celestial bodies manager
    this.celestialBodiesManager = new CelestialBodiesManager(this.timeManager);
    this.celestialBodiesManager.init(graphicsEngine.getScene(), graphicsEngine.getCamera());

    // Load solar system data
    this.celestialBodiesManager.loadFromFile('/src/data/solar-system.json').then(() => {
      console.log('Solar system loaded successfully');

      // Register celestial bodies with physics systems
      const bodies = this.celestialBodiesManager!.getAllBodies();
      bodies.forEach((bodyObject) => {
        const bodyData = this.celestialBodiesManager!.getBodyData(bodyObject.body.id);
        if (bodyData) {
          // Register with gravity system
          this.gravitySystem!.registerBody(bodyData);
          this.gravitySystem!.updateBodyPosition(bodyData.id, bodyObject.mesh.position);

          // Register with atmospheric physics if body has atmosphere
          if (bodyData.atmosphere) {
            this.atmosphericPhysics!.registerBody(bodyData, bodyObject.mesh.position);
          }
        }
      });
    }).catch(error => {
      console.error('Failed to load solar system:', error);
    });

    // Create UI
    this.spaceUI = new SpaceUI(
      this.timeManager,
      this.celestialBodiesManager,
      this.cameraController
    );
  }

  update(deltaTime: number): void {
    // Update input manager
    if (this.inputManager) {
      this.inputManager.update();
    }

    // Update camera controller
    if (this.cameraController) {
      this.cameraController.update(deltaTime);
    }

    // Update celestial bodies
    if (this.celestialBodiesManager) {
      this.celestialBodiesManager.update(deltaTime);
    }

    // Update physics systems
    if (this.physicsWorld && this.timeManager) {
      const timeMultiplier = this.timeManager.getTimeMultiplier();
      this.physicsWorld.update(deltaTime, timeMultiplier);
    }

    // Update gravity system positions (sync with celestial bodies)
    if (this.gravitySystem && this.celestialBodiesManager) {
      const bodies = this.celestialBodiesManager.getAllBodies();
      bodies.forEach((bodyObject) => {
        this.gravitySystem!.updateBodyPosition(bodyObject.body.id, bodyObject.mesh.position);
      });
    }

    // Update atmospheric physics positions (sync with celestial bodies)
    if (this.atmosphericPhysics && this.celestialBodiesManager) {
      const bodies = this.celestialBodiesManager.getAllBodies();
      bodies.forEach((bodyObject) => {
        if (bodyObject.body.atmosphere) {
          this.atmosphericPhysics!.updateBodyPosition(
            bodyObject.body.id,
            bodyObject.mesh.position
          );
        }
      });
    }

    // Update UI
    if (this.spaceUI) {
      this.spaceUI.update();
    }
  }

  destroy(): void {
    // Clean up main game scene
    console.log('Main game scene destroyed');

    // Dispose of physics systems
    if (this.physicsWorld) {
      this.physicsWorld.dispose();
      this.physicsWorld = null;
    }

    if (this.gravitySystem) {
      this.gravitySystem.dispose();
      this.gravitySystem = null;
    }

    if (this.atmosphericPhysics) {
      this.atmosphericPhysics.dispose();
      this.atmosphericPhysics = null;
    }

    // Dispose of celestial bodies
    if (this.celestialBodiesManager) {
      this.celestialBodiesManager.dispose();
      this.celestialBodiesManager = null;
    }

    // Dispose of UI
    if (this.spaceUI) {
      this.spaceUI.dispose();
      this.spaceUI = null;
    }

    // Clean up other managers
    this.cameraController = null;
    this.inputManager = null;
    this.timeManager = null;
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

class AssemblyEditorScene implements Scene {
  name: SceneType = 'assembly-editor';

  private vehicleManager: VehicleManager | null = null;
  private currentVehicle: Vehicle | null = null;
  private inputManager: InputManager | null = null;
  private cameraController: CameraController | null = null;
  private graphicsEngine: GraphicsEngine | null = null;

  // UI components
  private partsCatalogUI: PartsCatalogUI | null = null;
  private assemblyControlsUI: AssemblyControlsUI | null = null;
  private vehicleStatsUI: VehicleStatsUI | null = null;

  // Part placement
  private partPlacement: PartPlacement | null = null;

  // Grid helper for construction
  private gridHelper: THREE.GridHelper | null = null;

  init(graphicsEngine: GraphicsEngine): void {
    console.log('Assembly editor scene initialized');
    this.graphicsEngine = graphicsEngine;

    // Create input manager
    this.inputManager = new InputManager();
    this.inputManager.init();

    // Create vehicle manager
    this.vehicleManager = new VehicleManager();

    // Load parts library
    this.vehicleManager.loadPartsLibrary('/src/data/parts-config.json').then(() => {
      console.log('Parts library loaded');

      // Create a new vehicle or load existing
      this.currentVehicle = this.vehicleManager!.createVehicle('New Rocket');
      this.vehicleManager!.setCurrentVehicle(this.currentVehicle);

      // Add vehicle group to scene
      if (this.currentVehicle) {
        graphicsEngine.getScene().add(this.currentVehicle.group);
      }
    }).catch(error => {
      console.error('Failed to load parts library:', error);
    });

    // Create camera controller (different setup than flight camera)
    const camera = graphicsEngine.getCamera();
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    this.cameraController = new CameraController(
      camera,
      this.inputManager,
      graphicsEngine.getRenderer().domElement
    );

    // Create construction grid
    this.gridHelper = new THREE.GridHelper(50, 50, 0x444444, 0x222222);
    graphicsEngine.getScene().add(this.gridHelper);

    // Add some lighting optimized for the editor
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    graphicsEngine.getScene().add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    graphicsEngine.getScene().add(directionalLight);

    // Initialize part placement system
    this.partPlacement = new PartPlacement(
      this.vehicleManager,
      this.currentVehicle!,
      this.inputManager,
      camera,
      graphicsEngine.getRenderer().domElement
    );

    // Initialize UI components
    this.partsCatalogUI = new PartsCatalogUI(this.vehicleManager, this.partPlacement);
    this.assemblyControlsUI = new AssemblyControlsUI(
      this.currentVehicle,
      this.partPlacement,
      this.inputManager
    );
    this.vehicleStatsUI = new VehicleStatsUI(this.currentVehicle);
  }

  update(deltaTime: number): void {
    // Update input manager
    if (this.inputManager) {
      this.inputManager.update();
    }

    // Update camera controller
    if (this.cameraController) {
      this.cameraController.update(deltaTime);
    }

    // Update current vehicle
    if (this.currentVehicle) {
      this.currentVehicle.update(deltaTime);
    }

    // Update UI components
    if (this.partsCatalogUI) this.partsCatalogUI.update();
    if (this.assemblyControlsUI) this.assemblyControlsUI.update();
    if (this.vehicleStatsUI) this.vehicleStatsUI.update();

    // Update part placement
    if (this.partPlacement) this.partPlacement.update();

    // Check for launch command (L key)
    if (this.inputManager?.isKeyPressed('KeyL') && this.currentVehicle) {
      console.log('Launching vehicle...');
      // TODO: Transition to flight scene with this vehicle
    }

    // Check for save command (Ctrl+S)
    if (this.inputManager?.isKeyPressed('KeyS') &&
        (this.inputManager?.isKeyPressed('ControlLeft') || this.inputManager?.isKeyPressed('ControlRight'))) {
      if (this.currentVehicle && this.vehicleManager) {
        this.vehicleManager.saveVehicle(this.currentVehicle);
      }
    }
  }

  destroy(): void {
    console.log('Assembly editor scene destroyed');

    // Clean up vehicle
    if (this.currentVehicle && this.graphicsEngine) {
      this.graphicsEngine.getScene().remove(this.currentVehicle.group);
    }

    // Clean up grid
    if (this.gridHelper && this.graphicsEngine) {
      this.graphicsEngine.getScene().remove(this.gridHelper);
      this.gridHelper = null;
    }

    // Dispose vehicle manager
    if (this.vehicleManager) {
      this.vehicleManager.dispose();
      this.vehicleManager = null;
    }

    // Dispose UI components
    if (this.partsCatalogUI) {
      this.partsCatalogUI.dispose();
      this.partsCatalogUI = null;
    }

    if (this.assemblyControlsUI) {
      this.assemblyControlsUI.dispose();
      this.assemblyControlsUI = null;
    }

    if (this.vehicleStatsUI) {
      this.vehicleStatsUI.dispose();
      this.vehicleStatsUI = null;
    }

    // Dispose part placement
    if (this.partPlacement) {
      this.partPlacement.dispose();
      this.partPlacement = null;
    }

    // Clean up other managers
    this.cameraController = null;
    this.inputManager = null;
    this.currentVehicle = null;
  }
}