import * as THREE from 'three';

/**
 * Generates procedural textures for spacecraft parts
 */
export class TextureGenerator {
  private noiseGenerator: SimplexNoise;

  constructor() {
    this.noiseGenerator = new SimplexNoise();
  }

  /**
   * Generate a metal texture with panel lines, scratches, and rivets
   */
  public generateMetalTexture(
    width: number = 512,
    height: number = 512,
    options: {
      baseColor?: string;
      panelSize?: number;
      scratchCount?: number;
      rivetDensity?: number;
    } = {}
  ): THREE.Texture {
    const {
      baseColor = '#C0C0C0',
      panelSize = 64,
      scratchCount = 100,
      rivetDensity = 1.0
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;

    // Base metal color with noise variation
    const imageData = context.createImageData(width, height);
    const data = imageData.data;

    // Parse base color
    const rgb = this.hexToRgb(baseColor);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        // Add noise variation to base color
        const noise = this.noiseGenerator.noise2D(x * 0.05, y * 0.05);
        const variation = 1 + noise * 0.15;

        data[i] = Math.min(255, rgb.r * variation);
        data[i + 1] = Math.min(255, rgb.g * variation);
        data[i + 2] = Math.min(255, rgb.b * variation);
        data[i + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);

    // Add panel lines
    context.strokeStyle = '#606060';
    context.lineWidth = 2;

    for (let x = 0; x < width; x += panelSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y < height; y += panelSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    // Add scratches
    context.strokeStyle = '#808080';
    context.lineWidth = 1;

    for (let i = 0; i < scratchCount; i++) {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const length = Math.random() * 50 + 10;
      const angle = Math.random() * Math.PI * 2;

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x1 + Math.cos(angle) * length, y1 + Math.sin(angle) * length);
      context.stroke();
    }

    // Add rivets at panel intersections
    if (rivetDensity > 0) {
      context.fillStyle = '#A0A0A0';

      for (let x = panelSize / 2; x < width; x += panelSize) {
        for (let y = panelSize / 2; y < height; y += panelSize) {
          if (Math.random() < rivetDensity) {
            context.beginPath();
            context.arc(x, y, 3, 0, Math.PI * 2);
            context.fill();
          }
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }

  /**
   * Generate a carbon fiber weave texture
   */
  public generateCarbonFiberTexture(
    width: number = 512,
    height: number = 512,
    options: {
      weaveSize?: number;
      baseColor?: string;
      weaveColor?: string;
    } = {}
  ): THREE.Texture {
    const {
      weaveSize = 16,
      baseColor = '#202020',
      weaveColor = '#404040'
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;

    // Base color
    context.fillStyle = baseColor;
    context.fillRect(0, 0, width, height);

    // Create weave pattern
    context.strokeStyle = weaveColor;
    context.lineWidth = 2;

    for (let x = 0; x < width; x += weaveSize) {
      for (let y = 0; y < height; y += weaveSize) {
        const pattern = Math.floor((x / weaveSize + y / weaveSize)) % 2;

        context.beginPath();
        if (pattern === 0) {
          // Diagonal from top-left to bottom-right
          context.moveTo(x, y);
          context.lineTo(x + weaveSize, y + weaveSize);
        } else {
          // Diagonal from top-right to bottom-left
          context.moveTo(x + weaveSize, y);
          context.lineTo(x, y + weaveSize);
        }
        context.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }

  /**
   * Generate a circuit board texture
   */
  public generateCircuitBoardTexture(
    width: number = 512,
    height: number = 512,
    options: {
      baseColor?: string;
      traceColor?: string;
      traceCount?: number;
      componentCount?: number;
    } = {}
  ): THREE.Texture {
    const {
      baseColor = '#104028',
      traceColor = '#D0D0D0',
      traceCount = 20,
      componentCount = 50
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;

    // Base color
    context.fillStyle = baseColor;
    context.fillRect(0, 0, width, height);

    // Add circuit traces
    context.strokeStyle = traceColor;
    context.lineWidth = 2;

    for (let i = 0; i < traceCount; i++) {
      let x = Math.random() * width;
      let y = Math.random() * height;

      context.beginPath();
      context.moveTo(x, y);

      // Create random path with right angles (like circuit traces)
      for (let j = 0; j < 5; j++) {
        const horizontal = Math.random() > 0.5;
        const distance = Math.random() * 80 + 20;

        if (horizontal) {
          x += (Math.random() > 0.5 ? 1 : -1) * distance;
        } else {
          y += (Math.random() > 0.5 ? 1 : -1) * distance;
        }

        x = Math.max(0, Math.min(width, x));
        y = Math.max(0, Math.min(height, y));

        context.lineTo(x, y);
      }

      context.stroke();
    }

    // Add components
    const componentColors = ['#000000', '#808080', '#FF0000', '#0000FF', '#FFFF00'];

    for (let i = 0; i < componentCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 5 + Math.random() * 10;
      const color = componentColors[Math.floor(Math.random() * componentColors.length)];

      context.fillStyle = color;

      if (Math.random() > 0.5) {
        // Rectangle component
        context.fillRect(x - size / 2, y - size / 2, size, size);
      } else {
        // Circular component
        context.beginPath();
        context.arc(x, y, size / 2, 0, Math.PI * 2);
        context.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }

  /**
   * Generate a composite material texture
   */
  public generateCompositeTexture(
    width: number = 512,
    height: number = 512,
    options: {
      baseColor?: string;
      fiberDensity?: number;
    } = {}
  ): THREE.Texture {
    const {
      baseColor = '#4A4A4A',
      fiberDensity = 0.5
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;

    const imageData = context.createImageData(width, height);
    const data = imageData.data;

    const rgb = this.hexToRgb(baseColor);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        // Create fiber-like pattern
        const noise1 = this.noiseGenerator.noise2D(x * 0.02, y * 0.02);
        const noise2 = this.noiseGenerator.noise2D(x * 0.05, y * 0.05);
        const fiber = (noise1 + noise2) * fiberDensity;

        const variation = 1 + fiber * 0.3;

        data[i] = Math.min(255, rgb.r * variation);
        data[i + 1] = Math.min(255, rgb.g * variation);
        data[i + 2] = Math.min(255, rgb.b * variation);
        data[i + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }

  /**
   * Generate a ceramic heat shield texture
   */
  public generateCeramicTexture(
    width: number = 512,
    height: number = 512,
    options: {
      baseColor?: string;
      tileSize?: number;
    } = {}
  ): THREE.Texture {
    const {
      baseColor = '#2A2A2A',
      tileSize = 32
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;

    // Base texture with variation
    const imageData = context.createImageData(width, height);
    const data = imageData.data;

    const rgb = this.hexToRgb(baseColor);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        const noise = this.noiseGenerator.noise2D(x * 0.1, y * 0.1);
        const variation = 1 + noise * 0.2;

        data[i] = Math.min(255, rgb.r * variation);
        data[i + 1] = Math.min(255, rgb.g * variation);
        data[i + 2] = Math.min(255, rgb.b * variation);
        data[i + 3] = 255;
      }
    }

    context.putImageData(imageData, 0, 0);

    // Add tile separators
    context.strokeStyle = '#000000';
    context.lineWidth = 2;

    for (let x = 0; x < width; x += tileSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y < height; y += tileSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }

  /**
   * Generate a normal map from a noise pattern
   */
  public generateNormalMap(
    width: number = 512,
    height: number = 512,
    strength: number = 1.0
  ): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d')!;

    const imageData = context.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;

        // Calculate gradients
        const left = this.noiseGenerator.noise2D((x - 1) * 0.05, y * 0.05);
        const right = this.noiseGenerator.noise2D((x + 1) * 0.05, y * 0.05);
        const top = this.noiseGenerator.noise2D(x * 0.05, (y - 1) * 0.05);
        const bottom = this.noiseGenerator.noise2D(x * 0.05, (y + 1) * 0.05);

        const dx = (right - left) * strength;
        const dy = (bottom - top) * strength;

        // Convert to normal map color
        data[i] = ((dx + 1) * 0.5) * 255;     // R
        data[i + 1] = ((dy + 1) * 0.5) * 255; // G
        data[i + 2] = 255;                     // B (always pointing up)
        data[i + 3] = 255;                     // A
      }
    }

    context.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }

  /**
   * Helper function to convert hex color to RGB
   */
  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 192, g: 192, b: 192 };
  }
}

/**
 * Simplex noise implementation for procedural generation
 * (Reused from CelestialBodyGenerator pattern)
 */
class SimplexNoise {
  private grad3: number[][];
  private p: number[];
  private perm: number[];

  constructor() {
    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];

    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }

    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  public noise2D(xin: number, yin: number): number {
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

    const s = (xin + yin) * F2;
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

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    let n0 = 0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[this.perm[ii + this.perm[jj]] % 12], x0, y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    let n1 = 0;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[this.perm[ii + i1 + this.perm[jj + j1]] % 12], x1, y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    let n2 = 0;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[this.perm[ii + 1 + this.perm[jj + 1]] % 12], x2, y2);
    }

    return 70.0 * (n0 + n1 + n2);
  }

  private dot(g: number[], x: number, y: number): number {
    return g[0] * x + g[1] * y;
  }
}
