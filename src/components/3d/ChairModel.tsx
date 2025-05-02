'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '@/library/zustandStore';
import { useTexture } from '@react-three/drei';

// Preload all textures proactively
const textureTypes = ['fabric', 'leather', 'wood'];
textureTypes.forEach((tex) => {
  useTexture.preload(`/texture/textures/${tex}_diffuse.jpg`);
  useTexture.preload(`/texture/textures/${tex}_normal.jpg`);
  useTexture.preload(`/texture/textures/${tex}_rough.jpg`);
});

interface MaterialProps {
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
  normalScale: number;
}

interface ChairModelProps {
  shape: 'office' | 'dining' | 'lounge';
}

const ChairModel: React.FC<ChairModelProps> = ({ shape }) => {
  const { color, texture, materialPreset, legColor } = useStore((state) => ({
    color: state.color || '#808080',
    texture: state.texture || 'fabric',
    materialPreset: state.materialPreset || 'matte',
    legColor: state.legColor || '#333333',
  }));

  const materialProperties = useMemo<Record<string, MaterialProps>>(() => ({
    fabric: { roughness: 0.1, metalness: 0.1, clearcoat: 0.1, clearcoatRoughness: 0.5, envMapIntensity: 1, normalScale: 0.8 },
    leather: { roughness: 0.4, metalness: 0.15, clearcoat: 0.4, clearcoatRoughness: 0.3, envMapIntensity: 1.2, normalScale: 1.2 },
    wood: { roughness: 0.3, metalness: 0.2, clearcoat: 0.7, clearcoatRoughness: 0.2, envMapIntensity: 1.5, normalScale: 0.7 },
    metal: { roughness: 0.05, metalness: 0.95, clearcoat: 0.6, clearcoatRoughness: 0.1, envMapIntensity: 1.7, normalScale: 0.3 },
    velvet: { roughness: 0.5, metalness: 0.1, clearcoat: 0.2, clearcoatRoughness: 0.3, envMapIntensity: 2, normalScale: 0.6 },
  }), []);

  const texturePaths = useMemo(() => {
    const basePath = '/texture/textures/';
    if (texture === 'metal') {
      return []; // Return empty array instead of [null, null, null]
    }
    return [
      `${basePath}${texture.toLowerCase()}_diffuse.jpg`,
      `${basePath}${texture.toLowerCase()}_normal.jpg`,
      `${basePath}${texture.toLowerCase()}_rough.jpg`,
    ];
  }, [texture]); // TypeScript infers as string[]

  const textures = useTexture(texturePaths);
  const [chairTexture, normalMap, roughnessMap] = texturePaths.length > 0 ? textures : [null, null, null];

  const configureTextures = useMemo(() => {
    const texArray = [chairTexture, normalMap, roughnessMap];
    texArray.forEach((tex) => {
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
      }
    });
    return texArray;
  }, [chairTexture, normalMap, roughnessMap]);

  const mainMaterial = useMemo(() => {
    const props = materialProperties[texture] || materialProperties['fabric'];
    const mat = new THREE.MeshPhysicalMaterial({
      map: texture === 'metal' || !chairTexture ? null : configureTextures[0],
      normalMap: texture === 'metal' || !normalMap ? null : configureTextures[1],
      normalScale: new THREE.Vector2(props.normalScale, props.normalScale),
      roughnessMap: texture === 'metal' || !roughnessMap ? null : configureTextures[2],
      color: new THREE.Color(color).lerp(new THREE.Color(1, 1, 1), 0.2),
      roughness: props.roughness,
      metalness: props.metalness,
      clearcoat: props.clearcoat,
      clearcoatRoughness: props.clearcoatRoughness,
      envMapIntensity: props.envMapIntensity,
    });

    if (materialPreset === 'glossy') {
      mat.roughness = 0.1;
      mat.metalness = 0.4;
    } else if (materialPreset === 'matte') {
      mat.roughness = 0.8;
      mat.metalness = 0.1;
    } else if (materialPreset === 'satin') {
      mat.roughness = 0.3;
      mat.metalness = 0.3;
    } else if (materialPreset === 'polished') {
      mat.roughness = 0.05;
      mat.metalness = 0.7;
    }

    return mat;
  }, [color, texture, materialPreset, configureTextures, materialProperties]);

  const legMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(legColor),
    roughness: 0.4,
    metalness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
    envMapIntensity: 1.2,
  }), [legColor]);

  const chair = useMemo(() => {
    const group = new THREE.Group();

    const seatGeometry = new THREE.BoxGeometry(2, 0.5, 2, 4, 4, 4);
    seatGeometry.scale(1, 1.2, 1);
    const seat = new THREE.Mesh(seatGeometry, mainMaterial);
    seat.position.set(0, 0.5, 0);
    seat.castShadow = true;
    seat.receiveShadow = true;
    group.add(seat);

    if (shape === 'office') {
      const backrestGeometry = new THREE.BoxGeometry(2, 2, 0.3, 4, 4, 4);
      backrestGeometry.scale(1, 1.2, 1);
      const backrest = new THREE.Mesh(backrestGeometry, mainMaterial);
      backrest.position.set(0, 1.5, -0.9);
      backrest.rotation.x = -Math.PI / 8;
      backrest.castShadow = true;
      backrest.receiveShadow = true;
      group.add(backrest);

      const armrestGeometry = new THREE.BoxGeometry(0.2, 0.8, 1.5, 4, 4, 4);
      for (let i = 0; i < 2; i++) {
        const armrest = new THREE.Mesh(armrestGeometry, legMaterial);
        armrest.position.set((i === 0 ? 1.1 : -1.1), 0.9, -0.3);
        armrest.castShadow = true;
        armrest.receiveShadow = true;
        group.add(armrest);
      }

      const baseGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 8);
      const base = new THREE.Mesh(baseGeometry, legMaterial);
      base.position.set(0, -0.5, 0);
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 6);
      const centralLeg = new THREE.Mesh(legGeometry, legMaterial);
      centralLeg.position.set(0, 0, 0);
      centralLeg.castShadow = true;
      centralLeg.receiveShadow = true;
      group.add(centralLeg);

      const wheelGeometry = new THREE.SphereGeometry(0.15, 12, 12);
      const wheelMaterial = new THREE.MeshPhysicalMaterial({ color: 0x333333 });
      for (let i = 0; i < 5; i++) {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        const angle = (i / 5) * Math.PI * 2;
        wheel.position.set(Math.cos(angle) * 0.4, -0.6, Math.sin(angle) * 0.5);
        wheel.castShadow = true;
        group.add(wheel);
      }

      group.position.y += 0.5;
    } else if (shape === 'dining') {
      const backrestGeometry = new THREE.BoxGeometry(2, 3, 0.3, 4, 4, 4);
      backrestGeometry.scale(0.9, 1.1, 1);
      const backrest = new THREE.Mesh(backrestGeometry, mainMaterial);
      backrest.position.set(0, 3.5, -0.9);
      backrest.castShadow = true;
      backrest.receiveShadow = true;
      group.add(backrest);

      seat.position.set(0, 1.8, 0);

      const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.4, 12);
      for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        const x = (i % 2 === 0 ? 0.9 : -0.9);
        const z = (i < 2 ? 0.9 : -0.9);
        leg.position.set(x, 0.8, z);
        leg.castShadow = true;
        leg.receiveShadow = true;
        group.add(leg);
      }
    } else if (shape === 'lounge') {
      const seatGeometryLounge = new THREE.BoxGeometry(3, 0.7, 3, 4, 4, 4);
      seatGeometryLounge.scale(1, 1.3, 1);
      const seatLounge = new THREE.Mesh(seatGeometryLounge, mainMaterial);
      seatLounge.position.set(0, 0.5, 0);
      seatLounge.castShadow = true;
      seatLounge.receiveShadow = true;
      group.add(seatLounge);

      const backrestGeometry = new THREE.BoxGeometry(3, 1.5, 0.5, 4, 4, 4);
      backrestGeometry.scale(1, 1.2, 1);
      const backrest = new THREE.Mesh(backrestGeometry, mainMaterial);
      backrest.position.set(0, 1.25, -1.3);
      backrest.rotation.x = -Math.PI / 4;
      backrest.castShadow = true;
      backrest.receiveShadow = true;
      group.add(backrest);

      const legGeometryLounge = new THREE.CylinderGeometry(0.1, 0.1, 0.7, 12);
      for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(legGeometryLounge, legMaterial);
        const x = (i % 2 === 0 ? 1.4 : -1.4);
        const z = (i < 2 ? 1.4 : -1.4);
        leg.position.set(x, -0.25, z);
        leg.castShadow = true;
        leg.receiveShadow = true;
        group.add(leg);
      }
    }

    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    group.position.sub(center);
    group.position.y += 1;

    const maxDimension = Math.max(size.x, size.y, size.z);
    const desiredSize = 6;
    const scale = desiredSize / maxDimension;
    group.scale.set(scale, scale, scale);

    group.rotation.y = Math.PI;

    return group;
  }, [shape, mainMaterial, legMaterial]);

  return <primitive object={chair} />;
};

export default React.memo(ChairModel);