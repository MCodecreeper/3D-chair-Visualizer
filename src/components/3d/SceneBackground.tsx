'use client';

import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { useStore } from '@/library/zustandStore';

// Define the store's shape to avoid TypeScript errors
interface StoreState {
  shape: 'office' | 'dining' | 'lounge';
  previewMode: boolean;
}

const SceneBackground: React.FC = () => {
  const { shape, previewMode } = useStore((state) => ({
    shape: state.shape,
    previewMode: state.previewMode,
  })) as StoreState;

  const backgroundRef = useRef<THREE.Mesh>(null);

  // Determine the background texture based on the chair shape
  const backgroundTexturePath = useMemo(() => {
    if (!previewMode) {
      console.log('Preview mode is off, no background texture will be loaded');
      return null;
    }

    switch (shape) {
      case 'office':
        return '/texture/textures/office_background.jpg';
      case 'dining':
        return '/texture/textures/dining_background.jpg';
      case 'lounge':
        return '/texture/textures/lounge_background.jpg';
      default:
        console.log('Unknown chair shape:', shape);
        return null;
    }
  }, [shape, previewMode]);

  // Load the background texture
  const texture = useMemo(() => {
    if (!backgroundTexturePath) return null;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      backgroundTexturePath,
      (tex) => {
        tex.mapping = THREE.EquirectangularReflectionMapping; // For 360° panorama
        tex.colorSpace = THREE.SRGBColorSpace; // Ensure vibrant colors
        console.log(`Successfully loaded background texture: ${backgroundTexturePath}`);
      },
      undefined,
      (error) => {
        console.error(`Failed to load background texture ${backgroundTexturePath}:`, error);
      }
    );
    return texture;
  }, [backgroundTexturePath]);

  // Create the background geometry and material
  const background = useMemo(() => {
    if (!texture) {
      console.log('No texture available, background will not render');
      return null;
    }

    const geometry = new THREE.SphereGeometry(50, 60, 40); // Large sphere to surround the scene
    geometry.scale(-1, 1, 1); // Invert the sphere so the texture is inside

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide, // Render the inside of the sphere
      transparent: true,
      opacity: 1.0, // Increased opacity to ensure visibility
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0); // Center the background around the chair
    console.log('Background mesh created:', mesh);
    return mesh;
  }, [texture]);

  // Update the background visibility
  useEffect(() => {
    if (backgroundRef.current) {
      backgroundRef.current.visible = previewMode;
      console.log('Background visibility set to:', previewMode);
    }
  }, [previewMode]);

  // Fallback gradient background when not in preview mode
  const gradientBackground = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d')!;
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, '#e0e0e0');
    gradient.addColorStop(1, '#ffffff');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.SphereGeometry(50, 60, 40);
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.visible = !previewMode; // Visible only when not in preview mode
    return mesh;
  }, [previewMode]);

  return (
    <>
      {background && <primitive object={background} ref={backgroundRef} />}
      <primitive object={gradientBackground} />
    </>
  );
};

export default SceneBackground;