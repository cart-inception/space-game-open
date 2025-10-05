import * as THREE from 'three';
import { CommandPod } from '../types/part.js';
import { PartGenerator } from './part-generator.js';

/**
 * Generates command pods and probe cores
 */
export class CommandPodGenerator extends PartGenerator {
  /**
   * Generate a command pod or probe core mesh
   */
  public generateCommandPod(part: CommandPod): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;

    if (config.type === 'command-pod') {
      return this.generateMannedPod(part);
    } else {
      return this.generateProbeCore(part);
    }
  }

  /**
   * Generate a manned command pod
   */
  private generateMannedPod(part: CommandPod): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);
    const style = config.style || 'capsule';

    let bodyGeometry: THREE.BufferGeometry;

    switch (style) {
      case 'capsule':
        bodyGeometry = this.createCapsuleGeometry(scale * 0.5, scale * 0.6, 16, 8);
        break;

      case 'lander':
        bodyGeometry = this.createTaperedCylinder(scale * 0.6, scale * 0.4, scale * 1.2, 8);
        break;

      case 'aircraft':
        bodyGeometry = this.createAircraftCockpit(scale);
        break;

      default:
        bodyGeometry = this.createCapsuleGeometry(scale * 0.5, scale * 0.6, 16, 8);
    }

    const material = this.getMaterialForPart(part);
    const body = new THREE.Mesh(bodyGeometry, material);
    group.add(body);

    // Add windows if specified
    if (config.hasWindows) {
      const windows = this.createWindows(part, scale);
      group.add(windows);
    }

    // Add heat shield at bottom
    const heatShield = this.createHeatShield(scale);
    heatShield.position.y = -scale * 0.8;
    group.add(heatShield);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate an unmanned probe core
   */
  private generateProbeCore(part: CommandPod): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);

    // Create main body - typically a small box or cylinder
    const bodyGeometry = new THREE.BoxGeometry(scale, scale * 0.3, scale);
    const material = this.getMaterialForPart(part);
    const body = new THREE.Mesh(bodyGeometry, material);
    group.add(body);

    // Add circuit board texture for electronics look
    const circuitTexture = this.textureGenerator.generateCircuitBoardTexture(256, 256);
    const circuitMaterial = new THREE.MeshStandardMaterial({
      map: circuitTexture,
      roughness: 0.7,
      metalness: 0.3
    });

    // Add side panels
    const panelGeometry = new THREE.BoxGeometry(scale * 1.05, scale * 0.32, scale * 1.05);
    const panel = new THREE.Mesh(panelGeometry, circuitMaterial);
    group.add(panel);

    // Add antenna if specified
    if (config.hasAntenna) {
      const antenna = this.createAntenna(part, scale);
      antenna.position.y = scale * 0.2;
      group.add(antenna);
    }

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Create windows for manned pods
   */
  private createWindows(part: CommandPod, scale: number): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const windowCount = config.customParameters?.windowCount || 3;

    const windowGeometry = new THREE.CircleGeometry(scale * 0.15, 16);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x2040A0,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x102040,
      emissiveIntensity: 0.2
    });

    // Arrange windows around the pod
    for (let i = 0; i < windowCount; i++) {
      const angle = (i / windowCount) * Math.PI * 2;
      const window = new THREE.Mesh(windowGeometry, windowMaterial);

      window.position.set(
        Math.cos(angle) * scale * 0.5,
        scale * 0.1,
        Math.sin(angle) * scale * 0.5
      );

      // Orient window to face outward
      window.lookAt(
        Math.cos(angle) * scale,
        scale * 0.1,
        Math.sin(angle) * scale
      );

      group.add(window);
    }

    // Add top window
    const topWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    topWindow.position.set(0, scale * 0.6, 0);
    topWindow.rotation.x = -Math.PI / 2;
    group.add(topWindow);

    return group;
  }

  /**
   * Create heat shield for command pod
   */
  private createHeatShield(scale: number): THREE.Mesh {
    const shieldGeometry = new THREE.SphereGeometry(
      scale * 0.6,
      16,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );

    const shieldTexture = this.textureGenerator.generateCeramicTexture(512, 512, {
      baseColor: '#2A2A2A',
      tileSize: 32
    });

    const shieldMaterial = new THREE.MeshStandardMaterial({
      map: shieldTexture,
      roughness: 0.9,
      metalness: 0.1,
      color: 0x3A3A3A
    });

    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shield.rotation.x = Math.PI; // Flip to face downward

    return shield;
  }

  /**
   * Create antenna for probe cores
   */
  private createAntenna(part: CommandPod, scale: number): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const antennaType = config.customParameters?.antennaType || 'rod';

    const antennaMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.5,
      metalness: 0.9
    });

    if (antennaType === 'rod') {
      // Simple rod antenna
      const mastGeometry = new THREE.CylinderGeometry(
        scale * 0.02,
        scale * 0.02,
        scale * 0.8,
        8
      );
      const mast = new THREE.Mesh(mastGeometry, antennaMaterial);
      mast.position.y = scale * 0.4;
      group.add(mast);

      // Tip
      const tipGeometry = new THREE.SphereGeometry(scale * 0.04, 8, 8);
      const tip = new THREE.Mesh(tipGeometry, antennaMaterial);
      tip.position.y = scale * 0.8;
      group.add(tip);

    } else if (antennaType === 'dish') {
      // Dish antenna
      const dishGeometry = new THREE.SphereGeometry(
        scale * 0.3,
        16,
        16,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      );
      const dish = new THREE.Mesh(dishGeometry, antennaMaterial);
      dish.rotation.x = Math.PI;
      dish.position.y = scale * 0.4;
      group.add(dish);

      // Mount
      const mountGeometry = new THREE.CylinderGeometry(
        scale * 0.03,
        scale * 0.03,
        scale * 0.3,
        8
      );
      const mount = new THREE.Mesh(mountGeometry, antennaMaterial);
      mount.position.y = scale * 0.25;
      group.add(mount);

    } else if (antennaType === 'array') {
      // Multiple rod antennas
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const rodGeometry = new THREE.CylinderGeometry(
          scale * 0.015,
          scale * 0.015,
          scale * 0.5,
          8
        );
        const rod = new THREE.Mesh(rodGeometry, antennaMaterial);
        rod.position.set(
          Math.cos(angle) * scale * 0.1,
          scale * 0.25,
          Math.sin(angle) * scale * 0.1
        );
        group.add(rod);
      }
    }

    return group;
  }

  /**
   * Create aircraft-style cockpit
   */
  private createAircraftCockpit(scale: number): THREE.BufferGeometry {
    // Create a custom shape for aircraft cockpit
    const shape = new THREE.Shape();

    // Define cockpit profile
    shape.moveTo(0, 0);
    shape.lineTo(scale * 0.5, scale * 0.2);
    shape.lineTo(scale * 0.5, scale * 0.8);
    shape.quadraticCurveTo(scale * 0.5, scale * 1.2, 0, scale * 1.2);
    shape.lineTo(-scale * 0.5, scale * 0.8);
    shape.lineTo(-scale * 0.5, scale * 0.2);
    shape.lineTo(0, 0);

    const extrudeSettings = {
      depth: scale,
      bevelEnabled: true,
      bevelThickness: scale * 0.05,
      bevelSize: scale * 0.05,
      bevelSegments: 3
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    // Center the geometry
    geometry.translate(0, -scale * 0.6, -scale * 0.5);

    return geometry;
  }
}
