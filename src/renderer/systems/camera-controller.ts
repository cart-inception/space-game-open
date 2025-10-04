import * as THREE from 'three';
import { InputManager } from './input-manager';

export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private inputManager: InputManager;
  private domElement: HTMLElement;

  // Camera settings
  private movementSpeed = 10.0;
  private rotationSpeed = 0.005;
  private zoomSpeed = 0.1;

  // Camera state
  private yaw = 0;
  private pitch = 0;
  private isPointerLocked = false;

  // Movement vectors
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private moveUp = false;
  private moveDown = false;

  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();

  constructor(
    camera: THREE.PerspectiveCamera,
    inputManager: InputManager,
    domElement: HTMLElement = document.body
  ) {
    this.camera = camera;
    this.inputManager = inputManager;
    this.domElement = domElement;

    // Initialize camera rotation from current camera direction
    this.updateRotationFromCamera();

    // Set up event listeners
    this.setupEventListeners();
  }

  public update(deltaTime: number): void {
    // Update movement state from input
    this.updateMovementState();

    // Update camera rotation if pointer is locked
    if (this.isPointerLocked) {
      this.updateRotation();
    }

    // Update camera position
    this.updatePosition(deltaTime);

    // Apply rotation to camera
    this.applyRotationToCamera();
  }

  public enablePointerLock(): void {
    this.domElement.requestPointerLock();
  }

  public disablePointerLock(): void {
    document.exitPointerLock();
  }

  public setMovementSpeed(speed: number): void {
    this.movementSpeed = speed;
  }

  public setRotationSpeed(speed: number): void {
    this.rotationSpeed = speed;
  }

  public setZoomSpeed(speed: number): void {
    this.zoomSpeed = speed;
  }

  private setupEventListeners(): void {
    // Pointer lock events
    document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
    document.addEventListener('pointerlockerror', () => {
      console.error('PointerLock error');
    });

    // Click to enable pointer lock
    this.domElement.addEventListener('click', () => {
      if (!this.isPointerLocked) {
        this.enablePointerLock();
      }
    });

    // Keyboard events
    this.inputManager.addEventListener('keyDown', (key: string) => {
      switch (key) {
        case 'KeyW':
        case 'ArrowUp':
          this.moveForward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.moveBackward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.moveLeft = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.moveRight = true;
          break;
        case 'Space':
          this.moveUp = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.moveDown = true;
          break;
        case 'Escape':
          if (this.isPointerLocked) {
            this.disablePointerLock();
          }
          break;
      }
    });

    this.inputManager.addEventListener('keyUp', (key: string) => {
      switch (key) {
        case 'KeyW':
        case 'ArrowUp':
          this.moveForward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.moveBackward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.moveLeft = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.moveRight = false;
          break;
        case 'Space':
          this.moveUp = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.moveDown = false;
          break;
      }
    });

    // Mouse wheel for zoom
    this.inputManager.addEventListener('wheel', (_deltaX: number, deltaY: number) => {
      const zoom = deltaY * this.zoomSpeed;
      this.camera.fov = THREE.MathUtils.clamp(
        this.camera.fov + zoom,
        10,
        120
      );
      this.camera.updateProjectionMatrix();
    });
  }

  private onPointerLockChange(): void {
    this.isPointerLocked = document.pointerLockElement === this.domElement;
  }

  private updateMovementState(): void {
    this.velocity.x -= this.velocity.x * 10.0 * 0.016; // Damping
    this.velocity.z -= this.velocity.z * 10.0 * 0.016; // Damping
    this.velocity.y -= this.velocity.y * 10.0 * 0.016; // Damping

    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
    this.direction.y = Number(this.moveUp) - Number(this.moveDown);
    this.direction.normalize();

    if (this.moveForward || this.moveBackward) {
      this.velocity.z -= this.direction.z * this.movementSpeed * 0.016;
    }
    if (this.moveLeft || this.moveRight) {
      this.velocity.x -= this.direction.x * this.movementSpeed * 0.016;
    }
    if (this.moveUp || this.moveDown) {
      this.velocity.y -= this.direction.y * this.movementSpeed * 0.016;
    }
  }

  private updateRotation(): void {
    const mouseDelta = this.inputManager.getMouseDelta();
    this.yaw -= mouseDelta.x * this.rotationSpeed;
    this.pitch -= mouseDelta.y * this.rotationSpeed;

    // Clamp pitch to prevent flipping
    this.pitch = THREE.MathUtils.clamp(this.pitch, -Math.PI / 2, Math.PI / 2);
  }

  private updatePosition(deltaTime: number): void {
    // Calculate movement direction based on camera rotation
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);

    // Get camera direction vectors
    this.camera.getWorldDirection(forward);
    forward.y = 0; // Keep movement horizontal
    forward.normalize();

    // Calculate right vector
    right.crossVectors(forward, up).normalize();

    // Apply velocity in the correct direction
    const moveVector = new THREE.Vector3();
    moveVector.addScaledVector(forward, -this.velocity.z);
    moveVector.addScaledVector(right, -this.velocity.x);
    moveVector.y += this.velocity.y;

    // Update camera position
    this.camera.position.addScaledVector(moveVector, deltaTime);
  }

  private applyRotationToCamera(): void {
    // Calculate rotation from yaw and pitch
    const quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
    
    // Apply rotation to camera
    this.camera.quaternion.copy(quaternion);
  }

  private updateRotationFromCamera(): void {
    // Extract yaw and pitch from camera rotation
    const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
    this.yaw = euler.y;
    this.pitch = euler.x;
  }
}