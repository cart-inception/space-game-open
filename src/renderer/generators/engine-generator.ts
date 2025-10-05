import * as THREE from 'three';
import { Engine } from '../types/part.js';
import { PartGenerator } from './part-generator.js';

/**
 * Generates rocket engine meshes
 */
export class EngineGenerator extends PartGenerator {
  /**
   * Generate an engine mesh
   */
  public generateEngine(part: Engine): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);
    const engineType = config.engineType;

    switch (engineType) {
      case 'liquid':
        return this.generateLiquidEngine(part, scale);
      case 'solid':
        return this.generateSolidEngine(part, scale);
      case 'ion':
        return this.generateIonEngine(part, scale);
      case 'nuclear':
        return this.generateNuclearEngine(part, scale);
      default:
        return this.generateLiquidEngine(part, scale);
    }
  }

  /**
   * Generate a liquid fuel engine
   */
  private generateLiquidEngine(part: Engine, scale: number): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const bellLength = config.customParameters?.bellLength || 1.2;

    // Create engine bell (nozzle)
    const bellGeometry = this.createEngineBell(scale, bellLength, config.nozzleStyle);
    const bellMaterial = new THREE.MeshStandardMaterial({
      color: 0x303030,
      roughness: 0.4,
      metalness: 0.9
    });
    const bell = new THREE.Mesh(bellGeometry, bellMaterial);
    bell.position.y = -scale * bellLength * 0.35;
    group.add(bell);

    // Create engine body/combustion chamber
    const bodyGeometry = new THREE.CylinderGeometry(
      scale * 0.4,
      scale * 0.4,
      scale * 0.6,
      16
    );
    const bodyMaterial = this.getMaterialForPart(part);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = scale * 0.3;
    group.add(body);

    // Add turbopump if specified
    if (config.customParameters?.hasTurbopump) {
      const turbopump = this.createTurbopump(scale);
      turbopump.position.y = scale * 0.6;
      group.add(turbopump);
    }

    // Add fuel lines
    const fuelLines = this.createFuelLines(scale);
    group.add(fuelLines);

    // Add gimbal actuators if specified
    if (config.customParameters?.hasGimbal) {
      const gimbals = this.createGimbalActuators(scale);
      group.add(gimbals);
    }

    // Add exhaust effect placeholder
    const exhaust = this.createExhaustEffect(part, scale);
    group.add(exhaust);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate a solid rocket booster
   */
  private generateSolidEngine(part: Engine, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Create nozzle
    const nozzleGeometry = this.createTaperedCylinder(
      scale * 0.3,
      scale * 0.5,
      scale * 0.8,
      16
    );
    const nozzleMaterial = new THREE.MeshStandardMaterial({
      color: 0x202020,
      roughness: 0.3,
      metalness: 0.9
    });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
    nozzle.position.y = -scale * 0.4;
    group.add(nozzle);

    // Create nozzle extension
    const extensionGeometry = new THREE.CylinderGeometry(
      scale * 0.55,
      scale * 0.5,
      scale * 0.3,
      16
    );
    const extension = new THREE.Mesh(extensionGeometry, nozzleMaterial);
    extension.position.y = -scale * 0.95;
    group.add(extension);

    // Create thrust vector control actuators
    const actuators = this.createTVCActuators(scale);
    group.add(actuators);

    // Add exhaust effect
    const exhaust = this.createExhaustEffect(part, scale);
    group.add(exhaust);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate an ion engine
   */
  private generateIonEngine(part: Engine, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Create ionization chamber
    const chamberGeometry = new THREE.SphereGeometry(scale * 0.3, 16, 16);
    const chamberMaterial = new THREE.MeshStandardMaterial({
      color: 0x4060FF,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x202060,
      emissiveIntensity: 0.3
    });
    const chamber = new THREE.Mesh(chamberGeometry, chamberMaterial);
    chamber.position.y = scale * 0.2;
    group.add(chamber);

    // Create accelerator grids
    const gridCount = 3;
    for (let i = 0; i < gridCount; i++) {
      const grid = this.createAcceleratorGrid(scale * 0.4);
      grid.position.y = -scale * 0.1 * (i + 1);
      group.add(grid);
    }

    // Create support structure
    const strutCount = 4;
    for (let i = 0; i < strutCount; i++) {
      const angle = (i / strutCount) * Math.PI * 2;
      const strutGeometry = new THREE.CylinderGeometry(
        scale * 0.02,
        scale * 0.02,
        scale * 0.6,
        8
      );
      const strutMaterial = new THREE.MeshStandardMaterial({
        color: 0x606060,
        roughness: 0.6,
        metalness: 0.8
      });
      const strut = new THREE.Mesh(strutGeometry, strutMaterial);
      strut.position.set(
        Math.cos(angle) * scale * 0.35,
        -scale * 0.1,
        Math.sin(angle) * scale * 0.35
      );
      group.add(strut);
    }

    // Add ion beam effect
    const ionBeam = this.createIonBeam(scale);
    group.add(ionBeam);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate a nuclear thermal engine
   */
  private generateNuclearEngine(part: Engine, scale: number): THREE.Group {
    const group = new THREE.Group();

    // Create reactor core housing
    const coreGeometry = new THREE.CylinderGeometry(
      scale * 0.5,
      scale * 0.5,
      scale * 0.8,
      8
    );
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x606060,
      roughness: 0.7,
      metalness: 0.8
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.y = scale * 0.4;
    group.add(core);

    // Add radiation warning symbols
    const warningTexture = this.createRadiationWarning();
    const warningMaterial = new THREE.MeshStandardMaterial({
      map: warningTexture,
      transparent: true
    });
    const warningGeometry = new THREE.PlaneGeometry(scale * 0.6, scale * 0.6);

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const warning = new THREE.Mesh(warningGeometry, warningMaterial);
      warning.position.set(
        Math.cos(angle) * scale * 0.51,
        scale * 0.4,
        Math.sin(angle) * scale * 0.51
      );
      warning.rotation.y = -angle + Math.PI / 2;
      group.add(warning);
    }

    // Create nozzle
    const nozzleGeometry = this.createEngineBell(scale, 1.0, 'bell');
    const nozzleMaterial = new THREE.MeshStandardMaterial({
      color: 0x404040,
      roughness: 0.5,
      metalness: 0.9
    });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
    nozzle.position.y = -scale * 0.3;
    group.add(nozzle);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Create engine bell geometry
   */
  private createEngineBell(
    scale: number,
    lengthMultiplier: number,
    style?: string
  ): THREE.BufferGeometry {
    if (style === 'aerospike') {
      // Create aerospike nozzle
      return new THREE.ConeGeometry(
        scale * 0.6,
        scale * lengthMultiplier * 0.8,
        16,
        1,
        true
      );
    } else {
      // Standard bell nozzle
      return new THREE.ConeGeometry(
        scale * 0.5,
        scale * lengthMultiplier * 0.7,
        16,
        1,
        true
      );
    }
  }

  /**
   * Create turbopump assembly
   */
  private createTurbopump(scale: number): THREE.Mesh {
    const pumpGeometry = new THREE.CylinderGeometry(
      scale * 0.25,
      scale * 0.25,
      scale * 0.3,
      12
    );
    const pumpMaterial = new THREE.MeshStandardMaterial({
      color: 0x505050,
      roughness: 0.5,
      metalness: 0.9
    });
    return new THREE.Mesh(pumpGeometry, pumpMaterial);
  }

  /**
   * Create fuel lines
   */
  private createFuelLines(scale: number): THREE.Group {
    const group = new THREE.Group();

    const lineGeometry = new THREE.CylinderGeometry(
      scale * 0.05,
      scale * 0.05,
      scale * 0.8,
      8
    );
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: 0x4060C0,
      roughness: 0.4,
      metalness: 0.9
    });

    // Add lines around the engine
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(
        Math.cos(angle) * scale * 0.45,
        0,
        Math.sin(angle) * scale * 0.45
      );
      group.add(line);
    }

    return group;
  }

  /**
   * Create gimbal actuators
   */
  private createGimbalActuators(scale: number): THREE.Group {
    const group = new THREE.Group();

    const actuatorGeometry = new THREE.CylinderGeometry(
      scale * 0.05,
      scale * 0.05,
      scale * 0.3,
      8
    );
    const actuatorMaterial = new THREE.MeshStandardMaterial({
      color: 0x606060,
      roughness: 0.6,
      metalness: 0.8
    });

    // Add actuators on opposite sides
    for (let i = 0; i < 2; i++) {
      const angle = (i / 2) * Math.PI * 2;
      const actuator = new THREE.Mesh(actuatorGeometry, actuatorMaterial);
      actuator.position.set(
        Math.cos(angle) * scale * 0.5,
        -scale * 0.2,
        Math.sin(angle) * scale * 0.5
      );
      actuator.rotation.z = Math.PI / 2;
      group.add(actuator);
    }

    return group;
  }

  /**
   * Create TVC (Thrust Vector Control) actuators for solid boosters
   */
  private createTVCActuators(scale: number): THREE.Group {
    const group = new THREE.Group();

    const actuatorGeometry = new THREE.BoxGeometry(
      scale * 0.15,
      scale * 0.4,
      scale * 0.1
    );
    const actuatorMaterial = new THREE.MeshStandardMaterial({
      color: 0x505050,
      roughness: 0.6,
      metalness: 0.8
    });

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const actuator = new THREE.Mesh(actuatorGeometry, actuatorMaterial);
      actuator.position.set(
        Math.cos(angle) * scale * 0.6,
        -scale * 0.5,
        Math.sin(angle) * scale * 0.6
      );
      actuator.lookAt(0, -scale, 0);
      group.add(actuator);
    }

    return group;
  }

  /**
   * Create accelerator grid for ion engine
   */
  private createAcceleratorGrid(diameter: number): THREE.Mesh {
    const gridGeometry = new THREE.RingGeometry(
      diameter * 0.2,
      diameter * 0.5,
      32
    );
    const gridMaterial = new THREE.MeshStandardMaterial({
      color: 0x8080FF,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0x404080,
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide
    });
    return new THREE.Mesh(gridGeometry, gridMaterial);
  }

  /**
   * Create exhaust effect placeholder
   */
  private createExhaustEffect(part: Engine, scale: number): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const exhaustColor = config.customParameters?.exhaustColor || '#FFB84D';

    // Create flame cone
    const flameGeometry = new THREE.ConeGeometry(
      scale * 0.4,
      scale * 0.6,
      8,
      1,
      true
    );
    const flameMaterial = new THREE.MeshBasicMaterial({
      color: exhaustColor,
      transparent: true,
      opacity: 0,  // Set to 0 when not firing, will be animated later
      side: THREE.DoubleSide
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.y = -scale * 0.8;
    flame.name = 'exhaust-flame'; // For later animation
    group.add(flame);

    return group;
  }

  /**
   * Create ion beam effect
   */
  private createIonBeam(scale: number): THREE.Group {
    const group = new THREE.Group();

    const beamGeometry = new THREE.CylinderGeometry(
      scale * 0.1,
      scale * 0.3,
      scale * 1.0,
      8
    );
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x8080FF,
      transparent: true,
      opacity: 0, // Will be animated when engine is active
      side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.y = -scale * 0.8;
    beam.name = 'ion-beam';
    group.add(beam);

    // Add glow
    const glowGeometry = new THREE.SphereGeometry(scale * 0.3, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8080FF,
      transparent: true,
      opacity: 0
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.y = -scale * 0.5;
    glow.name = 'ion-glow';
    group.add(glow);

    return group;
  }

  /**
   * Create radiation warning texture
   */
  private createRadiationWarning(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;

    // Yellow background
    context.fillStyle = '#FFFF00';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw radiation symbol
    context.fillStyle = '#000000';
    context.strokeStyle = '#000000';
    context.lineWidth = 8;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Central circle
    context.beginPath();
    context.arc(centerX, centerY, 20, 0, Math.PI * 2);
    context.fill();

    // Radiation blades
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
      context.beginPath();
      context.arc(
        centerX,
        centerY,
        80,
        angle - Math.PI / 6,
        angle + Math.PI / 6
      );
      context.lineTo(centerX, centerY);
      context.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}
