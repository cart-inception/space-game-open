

# Programmatic Asset Creation for Space Simulation Game

## Overview

Creating assets programmatically (procedural generation) offers several advantages:
- Consistent visual style
- Easy iteration and tweaking
- Smaller game file size
- Infinite variety with minimal effort
- Easier to maintain and update

## Procedural Celestial Bodies

### Planets and Moons

```typescript
class CelestialBodyGenerator {
  // Generate planet mesh with subdivisions
  generatePlanetMesh(radius: number, subdivisions: number = 6): THREE.Mesh {
    const geometry = new THREE.IcosahedronGeometry(radius, subdivisions);
    
    // Add noise to surface for realistic terrain
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      
      // Normalize to unit sphere
      const length = Math.sqrt(x * x + y * y + z * z);
      vertices[i] /= length;
      vertices[i + 1] /= length;
      vertices[i + 2] /= length;
      
      // Apply noise for terrain variation
      const noise = this.terrainNoise(x, y, z);
      vertices[i] *= radius * (1 + noise * 0.1);
      vertices[i + 1] *= radius * (1 + noise * 0.1);
      vertices[i + 2] *= radius * (1 + noise * 0.1);
    }
    
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshPhongMaterial({
      color: this.planetColor(),
      bumpMap: this.generateBumpMap(),
      specularMap: this.generateSpecularMap()
    });
    
    return new THREE.Mesh(geometry, material);
  }
  
  // Simple noise function for terrain
  terrainNoise(x: number, y: number, z: number): number {
    // Simple implementation - replace with Perlin or Simplex noise
    return (Math.sin(x * 5) + Math.sin(y * 7) + Math.sin(z * 11)) / 3;
  }
  
  // Generate planet color based on type
  planetColor(): THREE.Color {
    const planetTypes = [
      { color: new THREE.Color(0x8B7355), weight: 20 }, // Rocky
      { color: new THREE.Color(0x2E4E7E), weight: 15 }, // Ice
      { color: new THREE.Color(0x4E7E4E), weight: 10 }, // Vegetation
      { color: new THREE.Color(0xE7D4A0), weight: 5 },  // Desert
      { color: new THREE.Color(0x8B4513), weight: 10 }, // Mars-like
      { color: new THREE.Color(0xFFA500), weight: 3 },  // Gas giant
    ];
    
    const totalWeight = planetTypes.reduce((sum, type) => sum + type.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const type of planetTypes) {
      random -= type.weight;
      if (random <= 0) return type.color;
    }
    
    return planetTypes[0].color;
  }
  
  // Generate bump map texture
  generateBumpMap(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    // Create noise pattern
    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random();
      data[i] = noise * 255;     // Red
      data[i + 1] = noise * 255; // Green
      data[i + 2] = noise * 255; // Blue
      data[i + 3] = 255;         // Alpha
    }
    
    context.putImageData(imageData, 0, 0);
    
    return new THREE.CanvasTexture(canvas);
  }
  
  // Generate specular map texture
  generateSpecularMap(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    // Create pattern for water/ice areas
    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        
        // Create patches of high specular (water/ice)
        const noise = this.terrainNoise(x / 50, y / 50, 0);
        const specular = noise > 0.5 ? 200 : 20;
        
        data[i] = specular;     // Red
        data[i + 1] = specular; // Green
        data[i + 2] = specular; // Blue
        data[i + 3] = 255;      // Alpha
      }
    }
    
    context.putImageData(imageData, 0, 0);
    
    return new THREE.CanvasTexture(canvas);
  }
}
```

### Atmospheric Effects

```typescript
class AtmosphereGenerator {
  generateAtmosphere(planet: THREE.Mesh, atmosphereHeight: number, density: number): THREE.Object3D {
    const atmosphereGroup = new THREE.Object3D();
    
    // Create glow effect
    const glowGeometry = new THREE.SphereGeometry(
      planet.geometry.parameters.radius + atmosphereHeight, 
      32, 
      32
    );
    
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: { value: 0.6 },
        p: { value: density }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p);
          gl_FragColor = vec4(0.2, 0.5, 1.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    const atmosphereMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    atmosphereGroup.add(atmosphereMesh);
    
    // Add cloud layer if applicable
    if (Math.random() > 0.5) {
      const cloudMesh = this.generateCloudLayer(planet.geometry.parameters.radius);
      atmosphereGroup.add(cloudMesh);
    }
    
    return atmosphereGroup;
  }
  
  generateCloudLayer(planetRadius: number): THREE.Mesh {
    const cloudGeometry = new THREE.SphereGeometry(planetRadius * 1.01, 32, 32);
    
    // Generate cloud texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Create cloud patterns using Perlin noise
    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        
        // Use noise to create cloud patterns
        const noise = this.cloudNoise(x / 100, y / 100);
        const cloud = noise > 0.3 ? 255 : 0;
        
        data[i] = cloud;       // Red
        data[i + 1] = cloud;   // Green
        data[i + 2] = cloud;   // Blue
        data[i + 3] = cloud;   // Alpha
      }
    }
    
    context.putImageData(imageData, 0, 0);
    const cloudTexture = new THREE.CanvasTexture(canvas);
    
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.7
    });
    
    return new THREE.Mesh(cloudGeometry, cloudMaterial);
  }
  
  cloudNoise(x: number, y: number): number {
    // Simple cloud noise - replace with Perlin or Simplex noise
    return (Math.sin(x * 2) + Math.sin(y * 3) + Math.sin((x + y) * 4)) / 3;
  }
}
```

## Procedural Spacecraft Parts

### Fuel Tanks

```typescript
class FuelTankGenerator {
  generateFuelTank(diameter: number, length: number, type: 'liquid' | 'solid'): THREE.Mesh {
    // Create cylinder for tank body
    const geometry = new THREE.CylinderGeometry(diameter / 2, diameter / 2, length, 16);
    
    // Add details like rivets and panels
    this.addTankDetails(geometry, diameter, length);
    
    // Create material based on type
    const material = type === 'liquid' 
      ? new THREE.MeshPhongMaterial({ color: 0xE0E0E0 })
      : new THREE.MeshPhongMaterial({ color: 0x404040 });
    
    const tank = new THREE.Mesh(geometry, material);
    
    // Add fuel indicators and markings
    this.addTankMarkings(tank, diameter, length);
    
    return tank;
  }
  
  addTankDetails(geometry: THREE.CylinderGeometry, diameter: number, length: number): void {
    // Add radial segments for panels
    const positions = geometry.attributes.position.array;
    const vertices = [];
    
    for (let i = 0; i < positions.length; i += 3) {
      vertices.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
    }
    
    // Add rivets along the seams
    const rivetGeometry = new THREE.SphereGeometry(diameter * 0.01, 8, 8);
    const rivetMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      for (let y = -length / 2; y <= length / 2; y += length / 4) {
        const rivet = new THREE.Mesh(rivetGeometry, rivetMaterial);
        rivet.position.set(
          Math.cos(angle) * diameter / 2,
          y,
          Math.sin(angle) * diameter / 2
        );
        // Add rivet to tank as a child mesh
      }
    }
  }
  
  addTankMarkings(tank: THREE.Mesh, diameter: number, length: number): void {
    // Create texture for markings
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    
    // Draw fuel level indicators
    context.strokeStyle = '#FF0000';
    context.lineWidth = 2;
    
    for (let i = 1; i < 10; i++) {
      const y = (canvas.height / 10) * i;
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width * 0.1, y);
      context.moveTo(canvas.width * 0.9, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }
    
    // Add warning text
    context.fillStyle = '#FF0000';
    context.font = '20px Arial';
    context.fillText('FLAMMABLE', canvas.width / 2 - 50, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    tank.material = new THREE.MeshPhongMaterial({
      map: texture,
      color: 0xE0E0E0
    });
  }
}
```

### Engines

```typescript
class EngineGenerator {
  generateEngine(type: 'liquid' | 'solid' | 'ion', size: 'small' | 'medium' | 'large'): THREE.Group {
    const engine = new THREE.Group();
    
    // Size parameters
    const sizeParams = {
      small: { diameter: 0.5, length: 1.0 },
      medium: { diameter: 1.0, length: 2.0 },
      large: { diameter: 2.0, length: 4.0 }
    };
    
    const { diameter, length } = sizeParams[size];
    
    // Create engine bell
    const bellGeometry = new THREE.ConeGeometry(diameter, length * 0.7, 16, true);
    const bellMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x303030,
      side: THREE.DoubleSide
    });
    const bell = new THREE.Mesh(bellGeometry, bellMaterial);
    bell.position.y = -length * 0.35;
    engine.add(bell);
    
    // Create engine body
    const bodyGeometry = new THREE.CylinderGeometry(diameter * 0.8, diameter * 0.8, length * 0.3, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = length * 0.15;
    engine.add(body);
    
    // Add engine-specific details
    if (type === 'liquid') {
      this.addLiquidEngineDetails(engine, diameter, length);
    } else if (type === 'solid') {
      this.addSolidEngineDetails(engine, diameter, length);
    } else if (type === 'ion') {
      this.addIonEngineDetails(engine, diameter, length);
    }
    
    // Create engine exhaust effect
    const exhaust = this.createEngineExhaust(type, diameter, length);
    engine.add(exhaust);
    
    return engine;
  }
  
  addLiquidEngineDetails(engine: THREE.Group, diameter: number, length: number): void {
    // Add fuel lines
    const lineGeometry = new THREE.CylinderGeometry(diameter * 0.05, diameter * 0.05, length * 0.5, 8);
    const lineMaterial = new THREE.MeshPhongMaterial({ color: 0x4040FF });
    
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(
        Math.cos(angle) * diameter * 0.6,
        0,
        Math.sin(angle) * diameter * 0.6
      );
      engine.add(line);
    }
    
    // Add turbopump
    const pumpGeometry = new THREE.CylinderGeometry(diameter * 0.3, diameter * 0.3, length * 0.2, 12);
    const pumpMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    const pump = new THREE.Mesh(pumpGeometry, pumpMaterial);
    pump.position.y = length * 0.35;
    engine.add(pump);
  }
  
  addSolidEngineDetails(engine: THREE.Group, diameter: number, length: number): void {
    // Add nozzle extension
    const extensionGeometry = new THREE.CylinderGeometry(diameter * 1.1, diameter, length * 0.2, 16);
    const extensionMaterial = new THREE.MeshPhongMaterial({ color: 0x202020 });
    const extension = new THREE.Mesh(extensionGeometry, extensionMaterial);
    extension.position.y = -length * 0.6;
    engine.add(extension);
    
    // Add thrust vector control actuators
    const actuatorGeometry = new THREE.BoxGeometry(diameter * 0.15, length * 0.3, diameter * 0.15);
    const actuatorMaterial = new THREE.MeshPhongMaterial({ color: 0x505050 });
    
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const actuator = new THREE.Mesh(actuatorGeometry, actuatorMaterial);
      actuator.position.set(
        Math.cos(angle) * diameter * 0.7,
        -length * 0.3,
        Math.sin(angle) * diameter * 0.7
      );
      actuator.lookAt(0, -length * 0.5, 0);
      engine.add(actuator);
    }
  }
  
  addIonEngineDetails(engine: THREE.Group, diameter: number, length: number): void {
    // Add ionization chamber
    const chamberGeometry = new THREE.SphereGeometry(diameter * 0.4, 16, 16);
    const chamberMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4040FF,
      emissive: 0x202040
    });
    const chamber = new THREE.Mesh(chamberGeometry, chamberMaterial);
    chamber.position.y = length * 0.2;
    engine.add(chamber);
    
    // Add accelerator grid
    const gridGeometry = new THREE.RingGeometry(diameter * 0.3, diameter * 0.5, 16);
    const gridMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8080FF,
      emissive: 0x404080,
      side: THREE.DoubleSide
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.position.y = -length * 0.1;
    engine.add(grid);
  }
  
  createEngineExhaust(type: 'liquid' | 'solid' | 'ion', diameter: number, length: number): THREE.Group {
    const exhaust = new THREE.Group();
    
    if (type === 'liquid') {
      // Create flame effect
      const flameGeometry = new THREE.ConeGeometry(diameter * 0.8, length * 0.5, 8, true);
      const flameMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xFFAA00,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const flame = new THREE.Mesh(flameGeometry, flameMaterial);
      flame.position.y = -length * 0.6;
      exhaust.add(flame);
      
      // Add smoke particles
      const particleCount = 50;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * diameter * 0.5;
        positions[i + 1] = -length * 0.5 - Math.random() * length * 0.5;
        positions[i + 2] = (Math.random() - 0.5) * diameter * 0.5;
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x888888,
        size: diameter * 0.05,
        transparent: true,
        opacity: 0.5
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      exhaust.add(particleSystem);
    } else if (type === 'solid') {
      // Create thick smoke
      const smokeGeometry = new THREE.ConeGeometry(diameter * 1.2, length * 0.7, 8, true);
      const smokeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x444444,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
      smoke.position.y = -length * 0.7;
      exhaust.add(smoke);
      
      // Add sparks
      const sparkCount = 30;
      const sparks = new THREE.BufferGeometry();
      const sparkPositions = new Float32Array(sparkCount * 3);
      
      for (let i = 0; i < sparkCount * 3; i += 3) {
        sparkPositions[i] = (Math.random() - 0.5) * diameter;
        sparkPositions[i + 1] = -length * 0.5 - Math.random() * length * 0.5;
        sparkPositions[i + 2] = (Math.random() - 0.5) * diameter;
      }
      
      sparks.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
      
      const sparkMaterial = new THREE.PointsMaterial({
        color: 0xFF8800,
        size: diameter * 0.03,
        transparent: true,
        opacity: 0.8
      });
      
      const sparkSystem = new THREE.Points(sparks, sparkMaterial);
      exhaust.add(sparkSystem);
    } else if (type === 'ion') {
      // Create ion beam
      const beamGeometry = new THREE.CylinderGeometry(diameter * 0.1, diameter * 0.3, length * 0.8, 8);
      const beamMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x8080FF,
        transparent: true,
        opacity: 0.5
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.y = -length * 0.7;
      exhaust.add(beam);
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(diameter * 0.4, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x8080FF,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.y = -length * 0.4;
      exhaust.add(glow);
    }
    
    return exhaust;
  }
}
```

## Procedural Command Pods

```typescript
class CommandPodGenerator {
  generateCommandPod(type: 'manned' | 'unmanned', size: 'small' | 'medium' | 'large'): THREE.Group {
    const pod = new THREE.Group();
    
    // Size parameters
    const sizeParams = {
      small: { diameter: 1.0, length: 1.5 },
      medium: { diameter: 2.0, length: 2.5 },
      large: { diameter: 3.0, length: 4.0 }
    };
    
    const { diameter, length } = sizeParams[size];
    
    // Create main body
    const bodyGeometry = new THREE.CapsuleGeometry(diameter / 2, length - diameter, 8, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xE0E0E0 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    pod.add(body);
    
    // Add windows if manned
    if (type === 'manned') {
      this.addWindows(pod, diameter, length);
    }
    
    // Add antenna if unmanned
    if (type === 'unmanned') {
      this.addAntenna(pod, diameter, length);
    }
    
    // Add heat shield
    const shieldGeometry = new THREE.SphereGeometry(diameter / 2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const shieldMaterial = new THREE.MeshPhongMaterial({ color: 0x202020 });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    shield.position.y = -length / 2;
    pod.add(shield);
    
    // Add attachment points
    this.addAttachmentPoints(pod, diameter, length);
    
    return pod;
  }
  
  addWindows(pod: THREE.Group, diameter: number, length: number): void {
    const windowGeometry = new THREE.CircleGeometry(diameter * 0.15, 16);
    const windowMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2020FF,
      transparent: true,
      opacity: 0.7
    });
    
    // Add windows around the pod
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(
        Math.cos(angle) * diameter / 2,
        0,
        Math.sin(angle) * diameter / 2
      );
      window.lookAt(0, 0, 0);
      pod.add(window);
    }
    
    // Add top window
    const topWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    topWindow.position.set(0, length / 2 - diameter / 4, 0);
    topWindow.lookAt(0, length, 0);
    pod.add(topWindow);
  }
  
  addAntenna(pod: THREE.Group, diameter: number, length: number): void {
    // Create antenna mast
    const mastGeometry = new THREE.CylinderGeometry(diameter * 0.02, diameter * 0.02, length * 0.5, 8);
    const mastMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const mast = new THREE.Mesh(mastGeometry, mastMaterial);
    mast.position.set(0, length / 2 + length * 0.25, 0);
    pod.add(mast);
    
    // Create antenna dish
    const dishGeometry = new THREE.SphereGeometry(diameter * 0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const dishMaterial = new THREE.MeshPhongMaterial({ color: 0xF0F0F0 });
    const dish = new THREE.Mesh(dishGeometry, dishMaterial);
    dish.position.set(0, length / 2 + length * 0.5, 0);
    dish.rotation.x = Math.PI;
    pod.add(dish);
  }
  
  addAttachmentPoints(pod: THREE.Group, diameter: number, length: number): void {
    // Create attachment point visual
    const pointGeometry = new THREE.TorusGeometry(diameter * 0.1, diameter * 0.02, 8, 16);
    const pointMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    
    // Add attachment points around the pod
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 3) {
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.set(
        Math.cos(angle) * diameter / 2,
        -length / 4,
        Math.sin(angle) * diameter / 2
      );
      point.lookAt(0, -length / 4, 0);
      pod.add(point);
    }
  }
}
```

## Procedural Textures

```typescript
class TextureGenerator {
  generateMetalTexture(width: number = 512, height: number = 512): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    
    // Base metal color
    context.fillStyle = '#C0C0C0';
    context.fillRect(0, 0, width, height);
    
    // Add scratches
    context.strokeStyle = '#808080';
    context.lineWidth = 1;
    
    for (let i = 0; i < 100; i++) {
      context.beginPath();
      context.moveTo(Math.random() * width, Math.random() * height);
      context.lineTo(Math.random() * width, Math.random() * height);
      context.stroke();
    }
    
    // Add panel lines
    context.strokeStyle = '#606060';
    context.lineWidth = 2;
    
    const panelSize = 64;
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
    
    // Add rivets
    context.fillStyle = '#A0A0A0';
    
    for (let x = panelSize / 2; x < width; x += panelSize) {
      for (let y = panelSize / 2; y < height; y += panelSize) {
        context.beginPath();
        context.arc(x, y, 3, 0, Math.PI * 2);
        context.fill();
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }
  
  generateCarbonFiberTexture(width: number = 512, height: number = 512): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    
    // Base color
    context.fillStyle = '#202020';
    context.fillRect(0, 0, width, height);
    
    // Create weave pattern
    const weaveSize = 16;
    
    for (let x = 0; x < width; x += weaveSize) {
      for (let y = 0; y < height; y += weaveSize) {
        // Determine pattern based on position
        const pattern = (x / weaveSize + y / weaveSize) % 2;
        
        if (pattern === 0) {
          // Diagonal line from top-left to bottom-right
          context.strokeStyle = '#404040';
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + weaveSize, y + weaveSize);
          context.stroke();
        } else {
          // Diagonal line from top-right to bottom-left
          context.strokeStyle = '#404040';
          context.lineWidth = 2;
          context.beginPath();
          context.moveTo(x + weaveSize, y);
          context.lineTo(x, y + weaveSize);
          context.stroke();
        }
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }
  
  generateCircuitBoardTexture(width: number = 512, height: number = 512): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    
    // Base color
    context.fillStyle = '#104028';
    context.fillRect(0, 0, width, height);
    
    // Add circuit traces
    context.strokeStyle = '#D0D0D0';
    context.lineWidth = 2;
    
    // Generate random circuit paths
    for (let i = 0; i < 20; i++) {
      let x = Math.random() * width;
      let y = Math.random() * height;
      
      context.beginPath();
      context.moveTo(x, y);
      
      // Create a random path
      for (let j = 0; j < 5; j++) {
        x += (Math.random() - 0.5) * 100;
        y += (Math.random() - 0.5) * 100;
        
        // Keep within bounds
        x = Math.max(0, Math.min(width, x));
        y = Math.max(0, Math.min(height, y));
        
        context.lineTo(x, y);
      }
      
      context.stroke();
    }
    
    // Add components
    const componentColors = ['#000000', '#808080', '#FF0000', '#0000FF', '#FFFF00'];
    
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 5 + Math.random() * 10;
      const color = componentColors[Math.floor(Math.random() * componentColors.length)];
      
      context.fillStyle = color;
      context.fillRect(x - size / 2, y - size / 2, size, size);
    }
    
    return new THREE.CanvasTexture(canvas);
  }
}
```

## Procedural Skybox

```typescript
class SkyboxGenerator {
  generateSpaceSkybox(): THREE.CubeTexture {
    const loader = new THREE.CubeTextureLoader();
    
    // Generate textures for each face of the cube
    const faces = [
      this.generateStarField(1024, 1024), // right
      this.generateStarField(1024, 1024), // left
      this.generateStarField(1024, 1024), // top
      this.generateStarField(1024, 1024), // bottom
      this.generateStarField(1024, 1024), // front
      this.generateStarField(1024, 1024)  // back
    ];
    
    return new THREE.CubeTexture(faces);
  }
  
  generateStarField(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    
    // Black background
    context.fillStyle = '#000000';
    context.fillRect(0, 0, width, height);
    
    // Add stars
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      const brightness = Math.random();
      
      // Create gradient for star glow
      const gradient = context.createRadialGradient(x, y, 0, x, y, size * 3);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${brightness * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.fillRect(x - size * 3, y - size * 3, size * 6, size * 6);
    }
    
    // Add nebula
    if (Math.random() > 0.5) {
      const nebulaX = Math.random() * width;
      const nebulaY = Math.random() * height;
      const nebulaSize = 100 + Math.random() * 200;
      
      const gradient = context.createRadialGradient(
        nebulaX, nebulaY, 0,
        nebulaX, nebulaY, nebulaSize
      );
      
      const colors = [
        ['rgba(255, 0, 0, 0.1)', 'rgba(255, 0, 0, 0)'],
        ['rgba(0, 0, 255, 0.1)', 'rgba(0, 0, 255, 0)'],
        ['rgba(255, 0, 255, 0.1)', 'rgba(255, 0, 255, 0)']
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      gradient.addColorStop(0, color[0]);
      gradient.addColorStop(1, color[1]);
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    }
    
    return canvas;
  }
}
```

## Integration with Development Plan

To integrate programmatic asset creation into your development plan, you would modify the following phases:

### Phase 2: Celestial Bodies System
- Add "Implement Procedural Celestial Body Generation" as a major task
- Include subtasks for planet, moon, and asteroid generation
- Add procedural atmosphere and cloud generation

### Phase 4: Vehicle System
- Replace "Create Part Database" with "Implement Procedural Part Generation"
- Add subtasks for generating different part types (engines, fuel tanks, etc.)
- Include procedural texture generation for parts

### Phase 7: Advanced Features
- Add "Implement Procedural Skybox Generation"
- Include procedural generation for planetary surfaces and features

## Tools and Libraries

Consider these tools to enhance your procedural generation:

1. **Noise Libraries**:
   - simplex-noise - Simple implementation of Simplex noise
   - perlin-noise - Perlin noise implementation
   - noisejs - A comprehensive noise library

2. **Procedural Generation Libraries**:
   - procedural-js - Various procedural generation algorithms
   - three-procedural-planet - Three.js extension for procedural planets

3. **Texture Generation**:
   - canvas-texture - Helper for creating canvas textures in Three.js
   - procedural-textures - Collection of procedural texture generators

## Advantages and Challenges

### Advantages:
- **Consistency**: All assets will have a consistent style
- **Flexibility**: Easy to tweak parameters to adjust appearance
- **Size**: Smaller download size as assets are generated at runtime
- **Variety**: Can generate endless variations of similar assets

### Challenges:
- **Performance**: Complex generation can impact loading times
- **Artistic Control**: Harder to create specific artistic visions
- **Complexity**: Requires more technical implementation
- **Optimization**: May need to cache generated assets for performance

By using programmatic asset generation, you'll create a unique visual style for your game while reducing the need for traditional asset creation. This approach is particularly well-suited for a space simulation game where variety and consistency are both important.