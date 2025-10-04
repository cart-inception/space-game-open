import * as THREE from 'three';

export class GraphicsEngine {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private stats: {
    fps: number;
    frameTime: number;
    drawCalls: number;
    triangles: number;
  };

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!this.canvas) {
      throw new Error('Canvas element not found');
    }

    this.stats = {
      fps: 0,
      frameTime: 0,
      drawCalls: 0,
      triangles: 0,
    };
  }

  public init(): void {
    // Initialize the renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1.0);

    // Initialize the scene
    this.scene = new THREE.Scene();

    // Initialize the camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);

    // Add basic lighting
    this.setupLighting();

    // Add a simple test object
    this.addTestObject();

    console.log('Graphics engine initialized');
  }

  public render(): void {
    const startTime = performance.now();

    // Render the scene
    this.renderer.render(this.scene, this.camera);

    // Update stats
    const endTime = performance.now();
    this.stats.frameTime = endTime - startTime;
    this.stats.fps = 1000 / this.stats.frameTime;
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.triangles = this.renderer.info.render.triangles;

    // Update debug UI
    this.updateDebugUI();
  }

  public handleResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.renderer;
  }

  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);
  }

  private addTestObject(): void {
    // Create a simple test cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 1, 0);
    cube.castShadow = true;
    cube.receiveShadow = true;
    this.scene.add(cube);

    // Create a ground plane
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  private updateDebugUI(): void {
    const fpsElement = document.getElementById('fps');
    const frameTimeElement = document.getElementById('frame-time');
    const drawCallsElement = document.getElementById('draw-calls');
    const trianglesElement = document.getElementById('triangles');

    if (fpsElement) {
      fpsElement.textContent = this.stats.fps.toFixed(1);
    }
    if (frameTimeElement) {
      frameTimeElement.textContent = this.stats.frameTime.toFixed(2);
    }
    if (drawCallsElement) {
      drawCallsElement.textContent = this.stats.drawCalls.toString();
    }
    if (trianglesElement) {
      trianglesElement.textContent = this.stats.triangles.toString();
    }
  }
}