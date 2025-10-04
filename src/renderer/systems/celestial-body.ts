import * as THREE from 'three';
import { CelestialBody, OrbitPoints } from '../types/celestial-body.js';

export class CelestialBodyObject {
  public body: CelestialBody;
  public mesh: THREE.Mesh | THREE.Points;
  public orbitLine?: THREE.Line;
  public atmosphereMesh?: THREE.Mesh;
  public cloudMesh?: THREE.Mesh;
  public lodLevels: THREE.Mesh[] = [];
  public currentLOD: number = 0;

  constructor(body: CelestialBody, geometry: THREE.BufferGeometry, material: THREE.Material) {
    this.body = body;
    
    if (body.type === 'star') {
      // For stars, use a point cloud or sprite with glow effect
      this.mesh = this.createStarMesh(geometry, material);
    } else {
      // For planets, moons, and asteroids, use a regular mesh
      this.mesh = new THREE.Mesh(geometry, material);
    }
    
    this.mesh.position.copy(body.position);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    
    // Create LOD levels if not a star
    if (body.type !== 'star') {
      this.createLODLevels();
    }
    
    // Create atmosphere if present
    if (body.atmosphere) {
      this.createAtmosphere();
    }
  }
  
  private createStarMesh(geometry: THREE.BufferGeometry, material: THREE.Material): THREE.Points {
    // Create a point-based mesh for stars with glow effect
    const pointsMaterial = new THREE.PointsMaterial({
      color: (material as THREE.MeshStandardMaterial).color,
      size: this.body.radius / 1000000, // Scale down for visualization
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    return new THREE.Points(geometry, pointsMaterial);
  }
  
  private createLODLevels(): void {
    // Create different LOD levels for the same celestial body
    // LOD 0: High detail (close)
    const highDetailGeometry = new THREE.SphereGeometry(this.body.radius, 64, 64);
    const highDetailMaterial = new THREE.MeshStandardMaterial({
      map: this.createProceduralTexture(),
      roughness: 0.8,
      metalness: 0.2
    });
    const highDetailMesh = new THREE.Mesh(highDetailGeometry, highDetailMaterial);
    highDetailMesh.visible = false;
    this.lodLevels.push(highDetailMesh);
    
    // LOD 1: Medium detail (medium distance)
    const mediumDetailGeometry = new THREE.SphereGeometry(this.body.radius, 32, 32);
    const mediumDetailMaterial = new THREE.MeshStandardMaterial({
      map: this.createProceduralTexture(),
      roughness: 0.8,
      metalness: 0.2
    });
    const mediumDetailMesh = new THREE.Mesh(mediumDetailGeometry, mediumDetailMaterial);
    mediumDetailMesh.visible = false;
    this.lodLevels.push(mediumDetailMesh);
    
    // LOD 2: Low detail (far)
    const lowDetailGeometry = new THREE.SphereGeometry(this.body.radius, 16, 16);
    const lowDetailMaterial = new THREE.MeshStandardMaterial({
      map: this.createProceduralTexture(),
      roughness: 0.8,
      metalness: 0.2
    });
    const lowDetailMesh = new THREE.Mesh(lowDetailGeometry, lowDetailMaterial);
    lowDetailMesh.visible = false;
    this.lodLevels.push(lowDetailMesh);
  }
  
  private createProceduralTexture(): THREE.Texture {
    // Create a simple procedural texture for demonstration
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d')!;
    
    // Create a gradient based on body type
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    
    if (this.body.type === 'planet') {
      if (this.body.id === 'earth') {
        gradient.addColorStop(0, '#4A90E2'); // Blue for ocean
        gradient.addColorStop(0.3, '#7CB342'); // Green for land
        gradient.addColorStop(0.6, '#8BC34A'); // Lighter green
        gradient.addColorStop(1, '#4A90E2'); // Blue for ocean
      } else if (this.body.id === 'mars') {
        gradient.addColorStop(0, '#D32F2F'); // Red for Mars
        gradient.addColorStop(0.5, '#F57C00'); // Orange
        gradient.addColorStop(1, '#D32F2F'); // Red
      } else if (this.body.id === 'jupiter') {
        gradient.addColorStop(0, '#FFD54F'); // Light brown
        gradient.addColorStop(0.3, '#8D6E63'); // Brown
        gradient.addColorStop(0.6, '#A1887F'); // Lighter brown
        gradient.addColorStop(1, '#FFD54F'); // Light brown
      } else {
        // Default planet colors
        gradient.addColorStop(0, '#9E9E9E'); // Gray
        gradient.addColorStop(0.5, '#757575'); // Darker gray
        gradient.addColorStop(1, '#9E9E9E'); // Gray
      }
    } else if (this.body.type === 'moon') {
      gradient.addColorStop(0, '#E0E0E0'); // Light gray
      gradient.addColorStop(0.5, '#BDBDBD'); // Gray
      gradient.addColorStop(1, '#E0E0E0'); // Light gray
    } else if (this.body.type === 'asteroid') {
      gradient.addColorStop(0, '#6D4C41'); // Brown
      gradient.addColorStop(0.5, '#5D4037'); // Darker brown
      gradient.addColorStop(1, '#6D4C41'); // Brown
    } else {
      gradient.addColorStop(0, '#FFFFFF'); // White
      gradient.addColorStop(1, '#CCCCCC'); // Light gray
    }
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise for texture
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2;
      const opacity = Math.random() * 0.5;
      
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      context.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }
  
  private createAtmosphere(): void {
    if (!this.body.atmosphere) return;
    
    const atmosphereGeometry = new THREE.SphereGeometry(
      this.body.radius + this.body.atmosphere.height,
      32,
      32
    );
    
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        c: { value: 0.5 },
        p: { value: 4.0 }
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
          float intensity = pow(c - dot(vNormal, vec3(0, 0, 1.0)), p);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `
    });
    
    this.atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    this.atmosphereMesh.position.copy(this.body.position);
  }
  
  public updateLOD(cameraPosition: THREE.Vector3): void {
    if (this.body.type === 'star') return;
    
    const distance = this.mesh.position.distanceTo(cameraPosition);
    
    // Determine LOD level based on distance
    let newLOD = 0;
    if (distance > this.body.radius * 100) {
      newLOD = 2; // Low detail
    } else if (distance > this.body.radius * 50) {
      newLOD = 1; // Medium detail
    } else {
      newLOD = 0; // High detail
    }
    
    if (newLOD !== this.currentLOD) {
      // Hide current LOD mesh
      if (this.currentLOD < this.lodLevels.length) {
        this.lodLevels[this.currentLOD].visible = false;
        this.lodLevels[this.currentLOD].parent?.remove(this.lodLevels[this.currentLOD]);
      }
      
      // Show new LOD mesh
      this.currentLOD = newLOD;
      if (this.currentLOD < this.lodLevels.length) {
        this.lodLevels[this.currentLOD].visible = true;
        this.lodLevels[this.currentLOD].position.copy(this.mesh.position);
        this.lodLevels[this.currentLOD].rotation.copy(this.mesh.rotation);
      }
    }
  }
  
  public update(deltaTime: number): void {
    // Update rotation
    const rotationSpeed = 0.0001 * deltaTime; // Simple rotation speed
    this.mesh.rotation.y += rotationSpeed;
    
    // Update LOD meshes if they exist
    this.lodLevels.forEach(lod => {
      lod.rotation.copy(this.mesh.rotation);
    });
    
    // Update atmosphere position if it exists
    if (this.atmosphereMesh) {
      this.atmosphereMesh.position.copy(this.mesh.position);
    }
  }
  
  public addToScene(scene: THREE.Scene): void {
    scene.add(this.mesh);
    
    // Add LOD meshes to scene
    this.lodLevels.forEach(lod => {
      scene.add(lod);
    });
    
    if (this.atmosphereMesh) {
      scene.add(this.atmosphereMesh);
    }
    
    if (this.orbitLine) {
      scene.add(this.orbitLine);
    }
  }
  
  public removeFromScene(scene: THREE.Scene): void {
    scene.remove(this.mesh);
    
    // Remove LOD meshes from scene
    this.lodLevels.forEach(lod => {
      scene.remove(lod);
    });
    
    if (this.atmosphereMesh) {
      scene.remove(this.atmosphereMesh);
    }
    
    if (this.orbitLine) {
      scene.remove(this.orbitLine);
    }
  }
}