import * as THREE from 'three';
import { FuelTank } from '../types/part.js';
import { PartGenerator } from './part-generator.js';

/**
 * Generates fuel tank meshes
 */
export class FuelTankGenerator extends PartGenerator {
  /**
   * Generate a fuel tank mesh
   */
  public generateFuelTank(part: FuelTank): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);
    const aspectRatio = config.aspectRatio || 2.0;
    const tankType = config.tankType;

    // Calculate dimensions
    const radius = scale * 0.5;
    const height = radius * 2 * aspectRatio;

    // Create main tank body
    const tankBody = this.createTankBody(radius, height, tankType);
    const material = this.getTankMaterial(part);
    const tankMesh = new THREE.Mesh(tankBody, material);
    group.add(tankMesh);

    // Add end caps
    const topCap = this.createEndCap(radius, 'top');
    topCap.position.y = height / 2;
    group.add(topCap);

    const bottomCap = this.createEndCap(radius, 'bottom');
    bottomCap.position.y = -height / 2;
    group.add(bottomCap);

    // Add fuel lines if specified
    if (config.customParameters?.hasFuelLines) {
      const fuelLines = this.createFuelLines(radius, height);
      group.add(fuelLines);
    }

    // Add markings
    if (config.customParameters?.markerStyle) {
      const markers = this.createTankMarkings(
        radius,
        height,
        config.customParameters.markerStyle,
        tankType
      );
      group.add(markers);
    }

    // Add insulation for cryogenic tanks
    if (config.customParameters?.hasInsulation && tankType === 'liquid') {
      const insulation = this.createInsulation(radius, height);
      group.add(insulation);
    }

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Create the main cylindrical body of the tank
   */
  private createTankBody(
    radius: number,
    height: number,
    tankType: string
  ): THREE.BufferGeometry {
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      32,
      1,
      true // Open-ended, we'll add caps separately
    );

    return geometry;
  }

  /**
   * Create tank end cap (dome-shaped for liquid, flat for solid)
   */
  private createEndCap(radius: number, position: 'top' | 'bottom'): THREE.Mesh {
    // Create ellipsoidal cap
    const capGeometry = new THREE.SphereGeometry(
      radius,
      32,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );

    const capMaterial = new THREE.MeshStandardMaterial({
      color: 0xB0B0B0,
      roughness: 0.7,
      metalness: 0.8
    });

    const cap = new THREE.Mesh(capGeometry, capMaterial);

    if (position === 'bottom') {
      cap.rotation.x = Math.PI;
    }

    return cap;
  }

  /**
   * Get material with appropriate textures and markings
   */
  private getTankMaterial(part: FuelTank): THREE.Material {
    const baseMaterial = this.getMaterialForPart(part);

    // Modify color based on tank type
    if (part.proceduralConfig.tankType === 'solid') {
      (baseMaterial as THREE.MeshStandardMaterial).color.setHex(0x404040);
    } else if (part.proceduralConfig.tankType === 'xenon') {
      (baseMaterial as THREE.MeshStandardMaterial).color.setHex(0x6080A0);
    }

    return baseMaterial;
  }

  /**
   * Create fuel line details running along the tank
   */
  private createFuelLines(radius: number, height: number): THREE.Group {
    const group = new THREE.Group();

    const lineRadius = radius * 0.03;
    const lineGeometry = new THREE.CylinderGeometry(
      lineRadius,
      lineRadius,
      height * 0.9,
      8
    );

    const lineMaterial = new THREE.MeshStandardMaterial({
      color: 0x4060FF,
      roughness: 0.5,
      metalness: 0.9
    });

    // Add fuel lines around the tank
    const lineCount = 4;
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const line = new THREE.Mesh(lineGeometry, lineMaterial);

      line.position.set(
        Math.cos(angle) * (radius + lineRadius),
        0,
        Math.sin(angle) * (radius + lineRadius)
      );

      group.add(line);
    }

    return group;
  }

  /**
   * Create visual markings on the tank
   */
  private createTankMarkings(
    radius: number,
    height: number,
    style: string,
    tankType: string
  ): THREE.Group {
    const group = new THREE.Group();

    if (style === 'stripes') {
      // Add horizontal stripes
      const stripeCount = 3;
      const stripeHeight = height * 0.05;

      const stripeGeometry = new THREE.CylinderGeometry(
        radius * 1.01,
        radius * 1.01,
        stripeHeight,
        32
      );

      const stripeMaterial = new THREE.MeshStandardMaterial({
        color: tankType === 'liquid' ? 0xFFFFFF : 0xFFAA00,
        roughness: 0.8,
        metalness: 0.2
      });

      for (let i = 0; i < stripeCount; i++) {
        const y = (-height / 2) + ((height / (stripeCount + 1)) * (i + 1));
        const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
        stripe.position.y = y;
        group.add(stripe);
      }

    } else if (style === 'warning') {
      // Add warning symbols and text
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const context = canvas.getContext('2d')!;

      // Draw warning pattern
      context.fillStyle = '#FFD700';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#000000';
      context.font = 'bold 40px Arial';
      context.textAlign = 'center';

      if (tankType === 'liquid') {
        context.fillText('FLAMMABLE', canvas.width / 2, 80);
        context.fillText('LIQUID FUEL', canvas.width / 2, 140);
      } else if (tankType === 'solid') {
        context.fillText('SOLID FUEL', canvas.width / 2, 80);
        context.fillText('EXPLOSIVE', canvas.width / 2, 140);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const decalMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.9,
        metalness: 0.1
      });

      const decalGeometry = new THREE.PlaneGeometry(radius * 1.5, radius * 0.8);
      const decal = new THREE.Mesh(decalGeometry, decalMaterial);
      decal.position.set(radius * 1.01, 0, 0);
      decal.rotation.y = -Math.PI / 2;

      group.add(decal);
    }

    return group;
  }

  /**
   * Create insulation layer for cryogenic tanks
   */
  private createInsulation(radius: number, height: number): THREE.Mesh {
    const insulationGeometry = new THREE.CylinderGeometry(
      radius * 1.02,
      radius * 1.02,
      height,
      32,
      1,
      true
    );

    // Create foam-like texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;

    context.fillStyle = '#FFA500';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Add foam texture
    for (let i = 0; i < 1000; i++) {
      context.fillStyle = `rgba(255, ${165 + Math.random() * 40}, 0, ${0.3 + Math.random() * 0.3})`;
      context.beginPath();
      context.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 5 + 1,
        0,
        Math.PI * 2
      );
      context.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const insulationMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.9,
      metalness: 0.0,
      transparent: true,
      opacity: 0.8
    });

    return new THREE.Mesh(insulationGeometry, insulationMaterial);
  }
}
