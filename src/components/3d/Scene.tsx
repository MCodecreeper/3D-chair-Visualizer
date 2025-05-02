'use client';

import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import ChairModel from './ChairModel';
import Lighting from './Lightening';
import SceneBackground from './SceneBackground';
import { useStore } from '@/library/zustandStore';
import * as THREE from 'three';

interface StoreState {
  shape: 'office' | 'dining' | 'lounge' | '';
  autoRotate: boolean;
  loadConfig: () => void;
  previewMode: boolean;
}

const Mat: React.FC = () => {
  const texture = useTexture('/texture/textures/mat1.jpg', (tex) => { tex.colorSpace = THREE.SRGBColorSpace; });

  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[5, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const Scene: React.FC = () => {
  const { shape, autoRotate, loadConfig, previewMode } = useStore() as StoreState;
  const [isMounted, setIsMounted] = useState(false);
  const orbitControlsRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    loadConfig();
  }, [loadConfig]);

  // Ensure autoRotate is applied
  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.autoRotate = autoRotate;
      orbitControlsRef.current.update();
    }
  }, [autoRotate, previewMode]);

  if (!isMounted) {
    return null;
  }

  return (
    <Canvas
      className="w-full h-full"
      shadows
      gl={{
        antialias: true,
        alpha: true,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.outputColorSpace = THREE.SRGBColorSpace;
        console.log('Canvas created with transparent clear color');
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={[0, 5, -15]} // Negative Z to view the front (chair front faces positive Z)
          fov={50}
          near={0.1}
          far={100}
        />

        <OrbitControls
          ref={orbitControlsRef}
          enablePan={false}
          enableZoom={!previewMode}
          enableRotate={!previewMode}
          minDistance={3}
          maxDistance={40}
          autoRotate={autoRotate}
          autoRotateSpeed={2.0}
          minPolarAngle={Math.PI / 6} // Restrict below mat level (above horizon)
          maxPolarAngle={Math.PI * 5 / 6} // Restrict above mat level
          target={[0, 1, 0]} // Target the chair's center
        />

        {shape && <ChairModel shape={shape} />}
        <Mat />
        <Lighting />
        <SceneBackground />
      </Suspense>
    </Canvas>
  );
};

export default Scene;