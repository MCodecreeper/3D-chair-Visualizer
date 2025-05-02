import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// Load HDR environment map for realistic lighting
export const loadHDREnvironment = (scene: THREE.Scene): Promise<void> => {
  return new Promise((resolve, reject) => {
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      '/hdr/studio.hdr',
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
        texture.dispose();
        resolve();
      },
      undefined,
      (error) => {
        console.error('Failed to load HDR environment:', error);
        reject(error);
      }
    );
  });
};

// Create a fallback texture if actual textures fail to load
export const createFallbackTexture = (): THREE.Texture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#808080'; // Gray fallback color
    context.fillRect(0, 0, 512, 512);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Dispose of Three.js objects to prevent memory leaks
export const disposeObject = (object: THREE.Object3D): void => {
  if (object instanceof THREE.Mesh) {
    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((mat) => mat.dispose());
      } else {
        object.material.dispose();
      }
    }
  }
  object.children.forEach((child) => disposeObject(child));
};

// Optimize texture for better performance and adjust brightness
export const optimizeTexture = (texture: THREE.Texture): void => {
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  // Brighten the texture even more
  const canvas = document.createElement('canvas');
  canvas.width = texture.image.width;
  canvas.height = texture.image.height;
  const context = canvas.getContext('2d')!;
  context.drawImage(texture.image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = Math.min(255, imageData.data[i] * 2.0);     // Red
    imageData.data[i + 1] = Math.min(255, imageData.data[i + 1] * 2.0); // Green
    imageData.data[i + 2] = Math.min(255, imageData.data[i + 2] * 2.0); // Blue
  }
  context.putImageData(imageData, 0, 0);
  texture.image = canvas;
  texture.needsUpdate = true;
};