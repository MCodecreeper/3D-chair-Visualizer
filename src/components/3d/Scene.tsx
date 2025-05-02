'use client';

import React, { Suspense, useEffect, useRef, useMemo } from 'react';
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

const Mat = React.memo(() => {
  const texture = useTexture('/texture/textures/mat1.jpg', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
  });

  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[5, 16]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
});

const Scene: React.FC = () => {
  const { shape, autoRotate, loadConfig, previewMode } = useStore() as StoreState;
  const orbitControlsRef = useRef<any>(null);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const controlsConfig = useMemo(() => ({
    enablePan: false as const,
    enableZoom: !previewMode,
    enableRotate: !previewMode,
    minDistance: 3,
    maxDistance: 40,
    autoRotate,
    autoRotateSpeed: 2.0,
    minPolarAngle: Math.PI / 6,
    maxPolarAngle: Math.PI * 5 / 6,
    target: new THREE.Vector3(0, 1, 0), // Explicitly use Vector3
    enableDamping: true,
    dampingFactor: 0.05,
  }), [autoRotate, previewMode]);

  return (
    <Canvas
      shadows
      gl={{
        antialias: true,
        alpha: true,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={[0, 5, -15]}
          fov={50}
          near={0.1}
          far={100}
        />

        <OrbitControls
          ref={orbitControlsRef}
          {...controlsConfig}
        />

        {shape && <ChairModel shape={shape} />}
        <Mat />
        <Lighting />
        <SceneBackground />
      </Suspense>
    </Canvas>
  );
};

export default React.memo(Scene);