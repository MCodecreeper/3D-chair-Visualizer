'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '@/library/zustandStore';

const Lighting: React.FC = () => {
  const { lightIntensity, lightPosition } = useStore((state) => ({
    lightIntensity: state.lightIntensity,
    lightPosition: state.lightPosition,
  }));

  const clampedIntensity = Math.max(0.5, Math.min(lightIntensity, 3.0));

  const directionalLightMain = useMemo(() => {
    const light = new THREE.DirectionalLight(0xffffff, clampedIntensity * 1.5);
    light.position.set(lightPosition.x + 2, lightPosition.y + 4, lightPosition.z + 2);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 20;
    light.shadow.camera.left = -5;
    light.shadow.camera.right = 5;
    light.shadow.camera.top = 5;
    light.shadow.camera.bottom = -5;
    light.shadow.bias = -0.0001;
    return light;
  }, [clampedIntensity, lightPosition]);

  const directionalLightSecondary = useMemo(() => {
    const light = new THREE.DirectionalLight(0xffffff, clampedIntensity * 0.8);
    light.position.set(-2, 3, -2); // Opposite angle to highlight details
    light.castShadow = false; // No shadows to avoid clutter
    return light;
  }, [clampedIntensity]);

  const hemisphereLight = useMemo(() => {
    return new THREE.HemisphereLight(0xffffff, 0xbbbbbb, 1.0); // Increased intensity
  }, []);

  return (
    <>
      <ambientLight intensity={4} />
      <primitive object={directionalLightMain} />
      <primitive object={directionalLightSecondary} />
      <primitive object={hemisphereLight} />
      <pointLight
        position={[3, 4, 3]}
        intensity={1.2}
        color="#ffffff"
        distance={12}
      />
    </>
  );
};

export default Lighting;