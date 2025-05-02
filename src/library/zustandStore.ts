import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as THREE from 'three';
import { createFallbackTexture, optimizeTexture } from './threeUtils';

interface ChairState {
  shape: 'office' | 'dining' | 'lounge' | '';
  setShape: (shape: 'office' | 'dining' | 'lounge') => void;
  color: string;
  setColor: (color: string) => void;
  texture: string;
  setTexture: (texture: string) => void;
  textures: Record<string, THREE.Texture>;
  normalMaps: Record<string, THREE.Texture>;
  roughnessMaps: Record<string, THREE.Texture>;
  loadTextures: () => void;
  materialPreset: string;
  setMaterialPreset: (preset: string) => void;
  autoRotate: boolean;
  setAutoRotate: (autoRotate: boolean) => void;
  captureScreenshot: () => void;
  saveConfig: () => void;
  loadConfig: () => void;
  resetView: () => void;
  legColor: string;
  setLegColor: (color: string) => void;
  lightIntensity: number;
  setLightIntensity: (intensity: number) => void;
  lightPosition: { x: number; y: number; z: number };
  setLightPosition: (position: { x: number; y: number; z: number }) => void;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
}

const textureLoader = new THREE.TextureLoader();

const loadTextureWithFallback = (path: string): THREE.Texture => {
  try {
    const texture = textureLoader.load(
      path,
      (tex) => {
        optimizeTexture(tex);
        tex.colorSpace = THREE.SRGBColorSpace;
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture ${path}:`, error);
        return createFallbackTexture();
      }
    );
    return texture;
  } catch (error) {
    console.error(`Error loading texture ${path}:`, error);
    return createFallbackTexture();
  }
};

const colorOptions: Record<string, { label: string; value: string }[]> = {
  fabric: [
    { label: 'Bright Silver', value: '#E6E6FA' }, // Brighter gray
    { label: 'Sunny Beige', value: '#FFFACD' }, // Brighter beige
    { label: 'Vivid Blue', value: '#00BFFF' }, // Brighter blue
    { label: 'Lime Green', value: '#32CD32' }, // Brighter green
  ],
  leather: [
    { label: 'Light Tan', value: '#FFE4B5' }, // Brighter tan
    { label: 'Chocolate', value: '#922724' }, // Brighter brown
    { label: 'Slate Gray', value: '#708090' }, // Brighter gray
    { label: 'Crimson', value: '#DC143C' }, // Brighter red
  ],
  wood: [
    { label: 'Golden Oak', value: '#FFD700' }, // Brighter oak
    { label: 'Light Walnut', value: '#DEB887' }, // Brighter walnut
    { label: 'Honey Maple', value: '#F0C05A' }, // Brighter maple
    { label: 'Cherry Red', value: '#FF4040' }, // Brighter mahogany
  ],
  metal: [
    { label: 'Polished Silver', value: '#F5F5F5' }, // Brighter silver
    { label: 'Dark Steel', value: '#4682B4' }, // Brighter gunmetal
    { label: 'Shiny Brass', value: '#FFD700' }, // Brighter brass
    { label: 'Warm Bronze', value: '#FFA500' }, // Brighter bronze
  ],
};

export const useStore = create<ChairState>()(
  persist(
    (set, get) => ({
      shape: '',
      setShape: (shape) => set({ shape }),
      color: colorOptions['fabric'][0].value,
      setColor: (color) => set({ color }),
      texture: 'fabric',
      setTexture: (texture) => {
        const defaultColor = colorOptions[texture]?.[0]?.value || colorOptions['fabric'][0].value;
        set({ texture, color: defaultColor, materialPreset: 'matte' });
      },
      textures: {},
      normalMaps: {},
      roughnessMaps: {},
      loadTextures: () => {
        const textures = {
          fabric: loadTextureWithFallback('/texture/textures/fabric_diffuse.jpg'),
          leather: loadTextureWithFallback('/texture/textures/leather_diffuse.jpg'),
          wood: loadTextureWithFallback('/texture/textures/wood_diffuse.jpg'),
        };
        const normalMaps = {
          fabric: loadTextureWithFallback('/texture/textures/fabric_normal.jpg'),
          leather: loadTextureWithFallback('/texture/textures/leather_normal.jpg'),
          wood: loadTextureWithFallback('/texture/textures/wood_normal.jpg'),
        };
        const roughnessMaps = {
          fabric: loadTextureWithFallback('/texture/textures/fabric_rough.jpg'),
          leather: loadTextureWithFallback('/texture/textures/leather_rough.jpg'),
          wood: loadTextureWithFallback('/texture/textures/wood_rough.jpg'),
        };
        set({ textures, normalMaps, roughnessMaps });
      },
      materialPreset: 'matte',
      setMaterialPreset: (preset) => set({ materialPreset: preset }),
      autoRotate: true,
      setAutoRotate: (autoRotate) => set({ autoRotate }),
      captureScreenshot: () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          const link = document.createElement('a');
          link.download = 'chair-visualizer.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      },
      saveConfig: () => {
        const {
          shape,
          color,
          texture,
          materialPreset,
          legColor,
          lightIntensity,
          lightPosition,
          autoRotate,
          previewMode,
        } = get();
        localStorage.setItem(
          'chairConfig',
          JSON.stringify({
            shape,
            color,
            texture,
            materialPreset,
            legColor,
            lightIntensity,
            lightPosition,
            autoRotate,
            previewMode,
          })
        );
      },
      loadConfig: () => {
        const config = localStorage.getItem('chairConfig');
        if (config) {
          const parsedConfig = JSON.parse(config);
          const texture = parsedConfig.texture || 'fabric';
          const defaultColor = colorOptions[texture]?.[0]?.value || colorOptions['fabric'][0].value;
          set({
            ...parsedConfig,
            shape: '',
            materialPreset: 'matte',
            color: parsedConfig.color || defaultColor,
          });
        } else {
          set({
            shape: '',
            texture: 'fabric',
            color: colorOptions['fabric'][0].value,
            materialPreset: 'matte',
          });
        }
      },
      resetView: () => {
        set({
          shape: '',
          color: colorOptions['fabric'][0].value,
          texture: 'fabric',
          materialPreset: 'matte',
          legColor: '#5C4033',
          lightIntensity: 0.7,
          lightPosition: { x: 2, y: 2, z: 2 },
          autoRotate: true,
          previewMode: false,
        });
      },
      legColor: '#5C4033',
      setLegColor: (color) => set({ legColor: color }),
      lightIntensity: 0.7,
      setLightIntensity: (intensity) => set({ lightIntensity: intensity }),
      lightPosition: { x: 2, y: 2, z: 2 },
      setLightPosition: (position) => set({ lightPosition: position }),
      previewMode: false,
      setPreviewMode: (previewMode) => set({ previewMode }),
    }),
    { name: 'chair-config' }
  )
);