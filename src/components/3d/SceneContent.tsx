'use client';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Lightformer,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Stage,
} from '@react-three/drei';
import { Suspense } from 'react';
import ChairModel from './ChairModel';
import { useStore } from '@/library/zustandStore';

interface SceneContentProps {
  autoRotate: boolean;
  shape: 'office' | 'dining' | 'lounge';
}

const SceneContent: React.FC<SceneContentProps> = ({ autoRotate, shape }) => {
  const { lightIntensity, lightPosition } = useStore();

  return (
    <Canvas
      camera={{ position: [2, 1, 2], fov: 45 }}
      gl={{ 
        antialias: true,
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      shadows
      dpr={[1, 2]}
      className="h-full w-full"
    >
      <color attach="background" args={['#f5f5f5']} />
      <fog attach="fog" args={['#f5f5f5', 10, 20]} />
      
      <Suspense fallback={null}>
        <Stage
          intensity={1}
          environment={null as any}
          adjustCamera={false}
          preset="rembrandt"
        >
          <ChairModel shape={shape} />
        </Stage>

        <AccumulativeShadows
          temporal
          frames={30}
          alphaTest={0.85}
          scale={8}
          position={[0, -0.5, 0]}
        >
          <RandomizedLight
            amount={8}
            radius={10}
            intensity={lightIntensity}
            ambient={0.25}
            position={[lightPosition.x, lightPosition.y, lightPosition.z]}
            castShadow
          />
        </AccumulativeShadows>

        <ContactShadows
          opacity={0.8}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />

        <Environment files="/hdr/studio_small_09_2k.hdr" background />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <group rotation={[Math.PI / 2, 0, 0]}>
          {[2, -2, 2, -4, 2, -5, 2, -6, 2, -7].map((x, i) => (
            <Lightformer
              key={i}
              intensity={1}
              rotation={[Math.PI / 4, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
        </group>

      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={6}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default SceneContent;