import * as THREE from 'three';
import { CelestialBody } from '../types/celestial-body.js';
import { CelestialBodyObject } from '../systems/celestial-body.js';

export class CelestialBodyGenerator {
  private noiseGenerator: SimplexNoise;
  
  constructor() {
    this.noiseGenerator = new SimplexNoise();
  }
  
  public generateCelestialBody(bodyData: CelestialBody): CelestialBodyObject {
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;
    
    if (bodyData.type === 'star') {
      geometry = this.generateStarGeometry(bodyData.radius);
      material = this.generateStarMaterial();
    } else {
      geometry = this.generatePlanetGeometry(bodyData.radius, 32, 32);
      material = this.generatePlanetMaterial(bodyData);
    }
    
    return new CelestialBodyObject(bodyData, geometry, material);
  }
  
  private generateStarGeometry(radius: number): THREE.BufferGeometry {
    // Create a special geometry for stars with glow effect
    const geometry = new THREE.SphereGeometry(radius, 16, 16);
    
    // Add some noise to make it look more like a star
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Add noise based on position
      const noise = this.noiseGenerator.noise3D(x * 0.1, y * 0.1, z * 0.1) * radius * 0.05;
      
      const length = Math.sqrt(x * x + y * y + z * z);
      const normalizedX = x / length;
      const normalizedY = y / length;
      const normalizedZ = z / length;
      
      positions.setXYZ(
        i,
        normalizedX * (radius + noise),
        normalizedY * (radius + noise),
        normalizedZ * (radius + noise)
      );
    }
    
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    
    return geometry;
  }
  
  private generatePlanetGeometry(radius: number, widthSegments: number, heightSegments: number): THREE.BufferGeometry {
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    
    // Add terrain noise for realistic planet surfaces
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Multi-octave noise for more realistic terrain
      let noise = 0;
      let amplitude = radius * 0.05;
      let frequency = 0.01;
      
      for (let octave = 0; octave < 4; octave++) {
        noise += this.noiseGenerator.noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
        amplitude *= 0.5;
        frequency *= 2;
      }
      
      const length = Math.sqrt(x * x + y * y + z * z);
      const normalizedX = x / length;
      const normalizedY = y / length;
      const normalizedZ = z / length;
      
      positions.setXYZ(
        i,
        normalizedX * (radius + noise),
        normalizedY * (radius + noise),
        normalizedZ * (radius + noise)
      );
    }
    
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    
    return geometry;
  }
  
  private generateStarMaterial(): THREE.Material {
    return new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
  }
  
  private generatePlanetMaterial(bodyData: CelestialBody): THREE.Material {
    // Create procedural textures based on body type
    const texture = this.generateProceduralTexture(bodyData);
    const bumpTexture = this.generateBumpTexture(bodyData);
    const specularTexture = this.generateSpecularTexture(bodyData);
    
    return new THREE.MeshStandardMaterial({
      map: texture,
      bumpMap: bumpTexture,
      bumpScale: bodyData.radius * 0.001,
      roughness: this.getRoughnessForBodyType(bodyData.type),
      metalness: this.getMetalnessForBodyType(bodyData.type)
    });
  }
  
  private generateProceduralTexture(bodyData: CelestialBody): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    
    // Create base color based on body type
    if (bodyData.type === 'planet') {
      if (bodyData.id === 'earth') {
        this.generateEarthTexture(context, canvas.width, canvas.height);
      } else if (bodyData.id === 'mars') {
        this.generateMarsTexture(context, canvas.width, canvas.height);
      } else if (bodyData.id === 'jupiter') {
        this.generateJupiterTexture(context, canvas.width, canvas.height);
      } else if (bodyData.id === 'saturn') {
        this.generateSaturnTexture(context, canvas.width, canvas.height);
      } else {
        this.generateGenericPlanetTexture(context, canvas.width, canvas.height, bodyData);
      }
    } else if (bodyData.type === 'moon') {
      this.generateMoonTexture(context, canvas.width, canvas.height);
    } else if (bodyData.type === 'asteroid') {
      this.generateAsteroidTexture(context, canvas.width, canvas.height);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    return texture;
  }
  
  private generateEarthTexture(context: CanvasRenderingContext2D, width: number, height: number): void {
    // Create a simple Earth-like texture with continents and oceans
    const imageData = context.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create noise-based continents
        const noise1 = this.noiseGenerator.noise2D(x * 0.01, y * 0.01);
        const noise2 = this.noiseGenerator.noise2D(x * 0.005, y * 0.005);
        const combinedNoise = (noise1 + noise2 * 2) / 3;
        
        if (combinedNoise > 0.1) {
          // Land
          data[i] = 34 + Math.random() * 30;     // R (greenish)
          data[i + 1] = 139 + Math.random() * 30; // G
          data[i + 2] = 34 + Math.random() * 30;  // B
        } else {
          // Ocean
          data[i] = 25 + Math.random() * 20;      // R (bluish)
          data[i + 1] = 25 + Math.random() * 50;  // G
          data[i + 2] = 112 + Math.random() * 50; // B
        }
        data[i + 3] = 255; // A
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
  
  private generateMarsTexture(context: CanvasRenderingContext2D, width: number, height: number): void {
    // Create a Mars-like texture with red/orange colors
    const imageData = context.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create noise-based terrain
        const noise1 = this.noiseGenerator.noise2D(x * 0.02, y * 0.02);
        const noise2 = this.noiseGenerator.noise2D(x * 0.01, y * 0.01);
        const combinedNoise = (noise1 + noise2 * 2) / 3;
        
        // Mars colors
        const baseRed = 193 + combinedNoise * 30;
        const baseGreen = 68 + combinedNoise * 20;
        const baseBlue = 14 + combinedNoise * 10;
        
        data[i] = Math.max(0, Math.min(255, baseRed));
        data[i + 1] = Math.max(0, Math.min(255, baseGreen));
        data[i + 2] = Math.max(0, Math.min(255, baseBlue));
        data[i + 3] = 255; // A
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
  
  private generateJupiterTexture(context: CanvasRenderingContext2D, width: number, height: number): void {
    // Create a Jupiter-like texture with bands
    const imageData = context.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create bands
        const bandNoise = this.noiseGenerator.noise2D(x * 0.005, y * 0.02);
        const detailNoise = this.noiseGenerator.noise2D(x * 0.02, y * 0.02);
        const combinedNoise = (bandNoise + detailNoise * 0.5) / 1.5;
        
        // Jupiter colors (browns, oranges, whites)
        const bandPosition = y / height;
        let r, g, b;
        
        if (bandPosition < 0.2 || bandPosition > 0.8) {
          // Polar regions - lighter
          r = 220 + combinedNoise * 20;
          g = 200 + combinedNoise * 20;
          b = 180 + combinedNoise * 20;
        } else if (bandPosition > 0.4 && bandPosition < 0.6) {
          // Great Red Spot area - redder
          r = 200 + combinedNoise * 30;
          g = 120 + combinedNoise * 20;
          b = 80 + combinedNoise * 20;
        } else {
          // Regular bands
          r = 180 + combinedNoise * 40;
          g = 140 + combinedNoise * 30;
          b = 100 + combinedNoise * 30;
        }
        
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
        data[i + 3] = 255; // A
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
  
  private generateSaturnTexture(context: CanvasRenderingContext2D, width: number, height: number): void {
    // Create a Saturn-like texture with bands
    const imageData = context.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create bands
        const bandNoise = this.noiseGenerator.noise2D(x * 0.005, y * 0.02);
        const detailNoise = this.noiseGenerator.noise2D(x * 0.02, y * 0.02);
        const combinedNoise = (bandNoise + detailNoise * 0.5) / 1.5;
        
        // Saturn colors (yellows, browns)
        const r = 220 + combinedNoise * 30;
        const g = 200 + combinedNoise * 30;
        const b = 160 + combinedNoise * 30;
        
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
        data[i + 3] = 255; // A
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
  
  private generateGenericPlanetTexture(context: CanvasRenderingContext2D, width: number, height: number, bodyData: CelestialBody): void {
    // Create a generic planet texture
    const imageData = context.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create noise-based terrain
        const noise1 = this.noiseGenerator.noise2D(x * 0.01, y * 0.01);
        const noise2 = this.noiseGenerator.noise2D(x * 0.005, y * 0.005);
        const combinedNoise = (noise1 + noise2 * 2) / 3;
        
        // Generic gray colors
        const baseValue = 128 + combinedNoise * 50;
        
        data[i] = Math.max(0, Math.min(255, baseValue));
        data[i + 1] = Math.max(0, Math.min(255, baseValue));
        data[i + 2] = Math.max(0, Math.min(255, baseValue));
        data[i + 3] = 255; // A
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
  
  private generateMoonTexture(context: CanvasRenderingContext2D, width: number, height: number): void {
    // Create a moon-like texture with craters
    const imageData = context.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create noise-based terrain
        const noise1 = this.noiseGenerator.noise2D(x * 0.02, y * 0.02);
        const noise2 = this.noiseGenerator.noise2D(x * 0.01, y * 0.01);
        const combinedNoise = (noise1 + noise2 * 2) / 3;
        
        // Moon colors (grays)
        const baseValue = 180 + combinedNoise * 40;
        
        data[i] = Math.max(0, Math.min(255, baseValue));
        data[i + 1] = Math.max(0, Math.min(255, baseValue));
        data[i + 2] = Math.max(0, Math.min(255, baseValue));
        data[i + 3] = 255; // A
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
  
  private generateAsteroidTexture(context: CanvasRenderingContext2D, width: number, height: number): void {
    // Create an asteroid-like texture
    const imageData = context.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        
        // Create noise-based terrain
        const noise1 = this.noiseGenerator.noise2D(x * 0.05, y * 0.05);
        const noise2 = this.noiseGenerator.noise2D(x * 0.02, y * 0.02);
        const combinedNoise = (noise1 + noise2 * 2) / 3;
        
        // Asteroid colors (browns)
        const baseValue = 100 + combinedNoise * 50;
        
        data[i] = Math.max(0, Math.min(255, baseValue * 0.8));
        data[i + 1] = Math.max(0, Math.min(255, baseValue * 0.6));
        data[i + 2] = Math.max(0, Math.min(255, baseValue * 0.4));
        data[i + 3] = 255; // A
      }
    }
    
    context.putImageData(imageData, 0, 0);
  }
  
  private generateBumpTexture(bodyData: CelestialBody): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    
    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        
        // Create noise-based bump map
        const noise = this.noiseGenerator.noise2D(x * 0.05, y * 0.05);
        const value = Math.floor((noise + 1) * 127.5);
        
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }
    }
    
    context.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }
  
  private generateSpecularTexture(bodyData: CelestialBody): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    
    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        
        // Create noise-based specular map
        let value = 0;
        
        if (bodyData.id === 'earth') {
          // Earth has water (high specular) and land (low specular)
          const noise = this.noiseGenerator.noise2D(x * 0.01, y * 0.01);
          value = noise > 0.1 ? 200 : 50; // Water vs land
        } else if (bodyData.type === 'planet') {
          // Other planets have medium specular
          value = 100;
        } else {
          // Moons and asteroids have low specular
          value = 50;
        }
        
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }
    }
    
    context.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }
  
  private getRoughnessForBodyType(type: string): number {
    switch (type) {
      case 'planet':
        return 0.8;
      case 'moon':
        return 0.9;
      case 'asteroid':
        return 0.95;
      default:
        return 0.8;
    }
  }
  
  private getMetalnessForBodyType(type: string): number {
    switch (type) {
      case 'planet':
        return 0.2;
      case 'moon':
        return 0.1;
      case 'asteroid':
        return 0.3;
      default:
        return 0.2;
    }
  }
  
  public generateSkybox(): THREE.CubeTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    
    const faces = [];
    
    for (let i = 0; i < 6; i++) {
      // Create a starfield for each face
      const imageData = context.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      // Clear to black
      for (let j = 0; j < data.length; j += 4) {
        data[j] = 0;
        data[j + 1] = 0;
        data[j + 2] = 0;
        data[j + 3] = 255;
      }
      
      // Add stars
      const starCount = 500;
      for (let j = 0; j < starCount; j++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        const index = (y * canvas.width + x) * 4;
        
        const brightness = Math.random() * 255;
        data[index] = brightness;
        data[index + 1] = brightness;
        data[index + 2] = brightness;
      }
      
      context.putImageData(imageData, 0, 0);
      faces.push(canvas.toDataURL());
    }
    
    const loader = new THREE.CubeTextureLoader();
    return loader.load(faces);
  }
}

// Simplex noise implementation for procedural generation
class SimplexNoise {
  private grad3: number[][];
  private p: number[];
  private perm: number[];
  private simplex: number[][];
  
  constructor() {
    this.grad3 = [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
    ];
    
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    
    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
    
    this.simplex = [
      [0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],
      [0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],
      [1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],
      [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
      [2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],
      [2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]
    ];
  }
  
  public noise2D(xin: number, yin: number): number {
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
    
    let s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    
    let i1, j1;
    if (x0 > y0) {
      i1 = 1; j1 = 0;
    } else {
      i1 = 0; j1 = 1;
    }
    
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;
    
    const ii = i & 255;
    const jj = j & 255;
    
    let t0 = 0.5 - x0*x0 - y0*y0;
    let n0 = 0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[this.perm[ii + this.perm[jj]] % 12], x0, y0);
    }
    
    let t1 = 0.5 - x1*x1 - y1*y1;
    let n1 = 0;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[this.perm[ii + i1 + this.perm[jj + j1]] % 12], x1, y1);
    }
    
    let t2 = 0.5 - x2*x2 - y2*y2;
    let n2 = 0;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[this.perm[ii + 1 + this.perm[jj + 1]] % 12], x2, y2);
    }
    
    return 70.0 * (n0 + n1 + n2);
  }
  
  public noise3D(xin: number, yin: number, zin: number): number {
    const F3 = 1.0/3.0;
    const G3 = 1.0/6.0;
    
    let s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;
    const z0 = zin - Z0;
    
    let i1, j1, k1;
    let i2, j2, k2;
    
    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1; j1 = 0; k1 = 0;
        i2 = 1; j2 = 1; k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1; j1 = 0; k1 = 0;
        i2 = 1; j2 = 0; k2 = 1;
      } else {
        i1 = 0; j1 = 0; k1 = 1;
        i2 = 1; j2 = 0; k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0; j1 = 0; k1 = 1;
        i2 = 0; j2 = 1; k2 = 1;
      } else if (x0 < z0) {
        i1 = 0; j1 = 1; k1 = 0;
        i2 = 0; j2 = 1; k2 = 1;
      } else {
        i1 = 0; j1 = 1; k1 = 0;
        i2 = 1; j2 = 1; k2 = 0;
      }
    }
    
    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3;
    const y2 = y0 - j2 + 2.0 * G3;
    const z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3;
    const y3 = y0 - 1.0 + 3.0 * G3;
    const z3 = z0 - 1.0 + 3.0 * G3;
    
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;
    
    let n0 = 0;
    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[this.perm[ii + this.perm[jj + this.perm[kk]]] % 12], x0, y0, z0);
    }
    
    let n1 = 0;
    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12], x1, y1, z1);
    }
    
    let n2 = 0;
    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12], x2, y2, z2);
    }
    
    let n3 = 0;
    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if (t3 >= 0) {
      t3 *= t3;
      n3 = t3 * t3 * this.dot(this.grad3[this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12], x3, y3, z3);
    }
    
    return 32.0 * (n0 + n1 + n2 + n3);
  }
  
  private dot(g: number[], x: number, y: number, z?: number): number {
    if (z !== undefined) {
      return g[0] * x + g[1] * y + g[2] * z;
    } else {
      return g[0] * x + g[1] * y;
    }
  }
}