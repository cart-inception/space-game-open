import * as THREE from 'three';
import { Part } from '../types/part.js';
import { TextureGenerator } from './texture-generator.js';

/**
 * Base class for all part generators
 * Provides common functionality for procedural part generation
 */
export class PartGenerator {
  protected textureGenerator: TextureGenerator;

  constructor() {
    this.textureGenerator = new TextureGenerator();
  }

  /**
   * Get material based on part configuration
   */
  protected getMaterialForPart(part: Part): THREE.Material {
    const materialType = part.proceduralConfig.material;

    let texture: THREE.Texture;
    let normalMap: THREE.Texture;
    let roughness: number;
    let metalness: number;

    switch (materialType) {
      case 'metal':
        texture = this.textureGenerator.generateMetalTexture(512, 512, {
          baseColor: '#C0C0C0'
        });
        normalMap = this.textureGenerator.generateNormalMap(512, 512, 0.5);
        roughness = 0.6;
        metalness = 0.8;
        break;

      case 'carbon-fiber':
        texture = this.textureGenerator.generateCarbonFiberTexture(512, 512);
        normalMap = this.textureGenerator.generateNormalMap(512, 512, 0.3);
        roughness = 0.4;
        metalness = 0.2;
        break;

      case 'composite':
        texture = this.textureGenerator.generateCompositeTexture(512, 512);
        normalMap = this.textureGenerator.generateNormalMap(512, 512, 0.4);
        roughness = 0.5;
        metalness = 0.3;
        break;

      case 'ceramic':
        texture = this.textureGenerator.generateCeramicTexture(512, 512, {
          baseColor: '#2A2A2A'
        });
        normalMap = this.textureGenerator.generateNormalMap(512, 512, 0.2);
        roughness = 0.8;
        metalness = 0.1;
        break;

      default:
        texture = this.textureGenerator.generateMetalTexture(512, 512);
        normalMap = this.textureGenerator.generateNormalMap(512, 512, 0.5);
        roughness = 0.6;
        metalness = 0.8;
    }

    return new THREE.MeshStandardMaterial({
      map: texture,
      normalMap: normalMap,
      roughness: roughness,
      metalness: metalness
    });
  }

  /**
   * Create visual representation of attach points
   */
  protected createAttachPointVisuals(part: Part): THREE.Group {
    const group = new THREE.Group();

    for (const attachPoint of part.attachPoints) {
      const ringGeometry = new THREE.TorusGeometry(
        attachPoint.size * 0.5,
        attachPoint.size * 0.02,
        8,
        16
      );

      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x606060,
        roughness: 0.7,
        metalness: 0.8
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(attachPoint.position);

      // Orient the ring to face the normal direction
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(up, attachPoint.normal);
      ring.quaternion.copy(quaternion);

      group.add(ring);
    }

    return group;
  }

  /**
   * Add detail elements like panel lines, markings, etc.
   */
  protected addDetailElements(
    mesh: THREE.Mesh,
    options: {
      addPanelLines?: boolean;
      addMarkings?: boolean;
      addRivets?: boolean;
    } = {}
  ): void {
    // This can be extended by subclasses for specific detail types
    // For now, details are primarily in the textures
  }

  /**
   * Get size scale based on size parameter
   */
  protected getSizeScale(size: 'small' | 'medium' | 'large'): number {
    switch (size) {
      case 'small':
        return 0.625; // 0.625m standard
      case 'medium':
        return 1.25;  // 1.25m standard
      case 'large':
        return 2.5;   // 2.5m standard
      default:
        return 1.25;
    }
  }

  /**
   * Create a standard cylinder geometry with rounded caps
   */
  protected createRoundedCylinder(
    radius: number,
    height: number,
    radialSegments: number = 16
  ): THREE.BufferGeometry {
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      radialSegments,
      1
    );

    return geometry;
  }

  /**
   * Create a tapered cylinder (cone-like)
   */
  protected createTaperedCylinder(
    radiusTop: number,
    radiusBottom: number,
    height: number,
    radialSegments: number = 16
  ): THREE.BufferGeometry {
    const geometry = new THREE.CylinderGeometry(
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      1
    );

    return geometry;
  }

  /**
   * Create a capsule-like geometry (cylinder with spherical caps)
   */
  protected createCapsuleGeometry(
    radius: number,
    cylinderHeight: number,
    radialSegments: number = 16,
    heightSegments: number = 8
  ): THREE.BufferGeometry {
    const geometry = new THREE.CapsuleGeometry(
      radius,
      cylinderHeight,
      radialSegments,
      heightSegments
    );

    return geometry;
  }
}
