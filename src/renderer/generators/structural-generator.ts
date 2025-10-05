import * as THREE from 'three';
import { StructuralComponent } from '../types/part.js';
import { PartGenerator } from './part-generator.js';

/**
 * Generates structural components (decouplers, adapters, nose cones, struts, etc.)
 */
export class StructuralComponentGenerator extends PartGenerator {
  /**
   * Generate a structural component mesh
   */
  public generateStructuralComponent(part: StructuralComponent): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const structuralType = config.structuralType;

    switch (structuralType) {
      case 'decoupler':
        return this.generateDecoupler(part);
      case 'adapter':
        return this.generateAdapter(part);
      case 'nose-cone':
        return this.generateNoseCone(part);
      case 'strut':
        return this.generateStrut(part);
      case 'panel':
        return this.generatePanel(part);
      default:
        return this.generateDecoupler(part);
    }
  }

  /**
   * Generate a stage decoupler
   */
  private generateDecoupler(part: StructuralComponent): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);

    // Create decoupler ring
    const ringGeometry = new THREE.CylinderGeometry(
      scale * 0.5,
      scale * 0.5,
      scale * 0.15,
      32
    );
    const material = this.getMaterialForPart(part);
    const ring = new THREE.Mesh(ringGeometry, material);
    group.add(ring);

    // Add separation mechanism details
    const separationRing = this.createSeparationRing(scale);
    group.add(separationRing);

    // Add explosive bolts visualization
    const boltCount = 8;
    const boltGeometry = new THREE.CylinderGeometry(
      scale * 0.02,
      scale * 0.02,
      scale * 0.1,
      6
    );
    const boltMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.6,
      metalness: 0.8
    });

    for (let i = 0; i < boltCount; i++) {
      const angle = (i / boltCount) * Math.PI * 2;
      const bolt = new THREE.Mesh(boltGeometry, boltMaterial);
      bolt.position.set(
        Math.cos(angle) * scale * 0.48,
        0,
        Math.sin(angle) * scale * 0.48
      );
      bolt.rotation.z = Math.PI / 2;
      group.add(bolt);
    }

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate a size adapter
   */
  private generateAdapter(part: StructuralComponent): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);

    const topDiameter = config.customParameters?.topDiameter || scale * 0.8;
    const bottomDiameter = config.customParameters?.bottomDiameter || scale;
    const height = config.customParameters?.height || scale * 0.6;

    // Create tapered adapter
    const adapterGeometry = this.createTaperedCylinder(
      topDiameter * 0.5,
      bottomDiameter * 0.5,
      height,
      32
    );
    const material = this.getMaterialForPart(part);
    const adapter = new THREE.Mesh(adapterGeometry, material);
    group.add(adapter);

    // Add reinforcement rings
    this.addReinforcementRings(group, topDiameter, bottomDiameter, height);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate a nose cone
   */
  private generateNoseCone(part: StructuralComponent): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);

    // Create nose cone shape
    const coneGeometry = this.createNoseConeGeometry(scale);
    const material = this.getMaterialForPart(part);
    const cone = new THREE.Mesh(coneGeometry, material);
    group.add(cone);

    // Add aerodynamic details
    this.addAerodynamicDetails(group, scale);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate a structural strut
   */
  private generateStrut(part: StructuralComponent): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);

    const hasLattice = config.customParameters?.hasLattice || false;

    if (hasLattice) {
      // Create lattice structure
      const lattice = this.createLatticeStructure(scale);
      group.add(lattice);
    } else {
      // Create solid beam
      const beamGeometry = new THREE.BoxGeometry(
        scale * 0.1,
        scale * 2.0,
        scale * 0.1
      );
      const material = this.getMaterialForPart(part);
      const beam = new THREE.Mesh(beamGeometry, material);
      group.add(beam);
    }

    // Add attachment points
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Generate a structural panel
   */
  private generatePanel(part: StructuralComponent): THREE.Group {
    const group = new THREE.Group();
    const config = part.proceduralConfig;
    const scale = this.getSizeScale(config.size);

    // Create panel
    const panelGeometry = new THREE.BoxGeometry(
      scale * 1.5,
      scale * 0.05,
      scale * 1.0
    );
    const material = this.getMaterialForPart(part);
    const panel = new THREE.Mesh(panelGeometry, material);
    group.add(panel);

    // Add reinforcement ribs
    this.addReinforcements(group, scale);

    // Add attachment point visuals
    const attachPoints = this.createAttachPointVisuals(part);
    group.add(attachPoints);

    return group;
  }

  /**
   * Create separation ring for decoupler
   */
  private createSeparationRing(scale: number): THREE.Mesh {
    const ringGeometry = new THREE.TorusGeometry(
      scale * 0.5,
      scale * 0.03,
      8,
      32
    );
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6600,
      roughness: 0.7,
      metalness: 0.5,
      emissive: 0x331100,
      emissiveIntensity: 0.2
    });
    return new THREE.Mesh(ringGeometry, ringMaterial);
  }

  /**
   * Add reinforcement rings to adapter
   */
  private addReinforcementRings(
    group: THREE.Group,
    topDiameter: number,
    bottomDiameter: number,
    height: number
  ): void {
    const ringCount = 3;
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x909090,
      roughness: 0.6,
      metalness: 0.8
    });

    for (let i = 0; i < ringCount; i++) {
      const t = (i + 1) / (ringCount + 1);
      const y = -height / 2 + height * t;
      const diameter = bottomDiameter + (topDiameter - bottomDiameter) * t;

      const ringGeometry = new THREE.TorusGeometry(
        diameter * 0.5,
        diameter * 0.02,
        8,
        32
      );
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.y = y;
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }
  }

  /**
   * Create nose cone geometry
   */
  private createNoseConeGeometry(scale: number): THREE.BufferGeometry {
    // Create a parabolic nose cone
    const geometry = new THREE.ConeGeometry(
      scale * 0.5,
      scale * 1.5,
      32,
      1
    );

    // Modify vertices to create a more aerodynamic shape
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      if (y > 0) {
        // Apply parabolic curve to upper portion
        const t = y / (scale * 1.5);
        const scale_factor = Math.sqrt(1 - t);
        positions.setX(i, positions.getX(i) * scale_factor);
        positions.setZ(i, positions.getZ(i) * scale_factor);
      }
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();

    return geometry;
  }

  /**
   * Add aerodynamic details to nose cone
   */
  private addAerodynamicDetails(group: THREE.Group, scale: number): void {
    // Add tip cap
    const tipGeometry = new THREE.SphereGeometry(scale * 0.05, 8, 8);
    const tipMaterial = new THREE.MeshStandardMaterial({
      color: 0xC0C0C0,
      roughness: 0.3,
      metalness: 0.9
    });
    const tip = new THREE.Mesh(tipGeometry, tipMaterial);
    tip.position.y = scale * 0.75;
    group.add(tip);
  }

  /**
   * Create lattice structure for struts
   */
  private createLatticeStructure(scale: number): THREE.Group {
    const group = new THREE.Group();

    const beamMaterial = new THREE.MeshStandardMaterial({
      color: 0xB0B0B0,
      roughness: 0.7,
      metalness: 0.8
    });

    const beamRadius = scale * 0.02;
    const height = scale * 2.0;
    const segments = 4;

    // Create vertical beams
    const verticalCount = 4;
    for (let i = 0; i < verticalCount; i++) {
      const angle = (i / verticalCount) * Math.PI * 2;
      const beamGeometry = new THREE.CylinderGeometry(
        beamRadius,
        beamRadius,
        height,
        6
      );
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.set(
        Math.cos(angle) * scale * 0.15,
        0,
        Math.sin(angle) * scale * 0.15
      );
      group.add(beam);
    }

    // Create horizontal cross-braces
    for (let i = 0; i < segments; i++) {
      const y = -height / 2 + (height / segments) * (i + 0.5);

      for (let j = 0; j < verticalCount; j++) {
        const angle1 = (j / verticalCount) * Math.PI * 2;
        const angle2 = ((j + 1) / verticalCount) * Math.PI * 2;

        const x1 = Math.cos(angle1) * scale * 0.15;
        const z1 = Math.sin(angle1) * scale * 0.15;
        const x2 = Math.cos(angle2) * scale * 0.15;
        const z2 = Math.sin(angle2) * scale * 0.15;

        const length = Math.sqrt(
          (x2 - x1) ** 2 + (z2 - z1) ** 2
        );

        const braceGeometry = new THREE.CylinderGeometry(
          beamRadius * 0.8,
          beamRadius * 0.8,
          length,
          6
        );
        const brace = new THREE.Mesh(braceGeometry, beamMaterial);

        brace.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
        brace.rotation.x = Math.PI / 2;
        brace.rotation.y = Math.atan2(z2 - z1, x2 - x1);

        group.add(brace);
      }
    }

    return group;
  }

  /**
   * Add reinforcement ribs to panels
   */
  private addReinforcements(group: THREE.Group, scale: number): void {
    const ribMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.7,
      metalness: 0.8
    });

    const ribCount = 3;
    for (let i = 0; i < ribCount; i++) {
      const x = -scale * 0.6 + (scale * 1.2 / (ribCount - 1)) * i;

      const ribGeometry = new THREE.BoxGeometry(
        scale * 0.05,
        scale * 0.08,
        scale * 1.0
      );
      const rib = new THREE.Mesh(ribGeometry, ribMaterial);
      rib.position.set(x, 0, 0);
      group.add(rib);
    }
  }
}
