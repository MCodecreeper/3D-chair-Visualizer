'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/library/zustandStore';

const Controls: React.FC = () => {
  const {
    color,
    setColor,
    texture,
    setTexture,
    shape,
    setShape,
    autoRotate,
    setAutoRotate,
    materialPreset,
    setMaterialPreset,
    captureScreenshot,
  } = useStore();

  const shapes = [
    { id: 'office', label: 'Office Chair' },
    { id: 'dining', label: 'Dining Chair' },
    { id: 'lounge', label: 'Lounge Chair' },
  ];

  const textures = [
    { id: 'fabric', label: 'Premium Fabric' },
    { id: 'leather', label: 'Fine Leather' },
    { id: 'wood', label: 'Solid Wood' },
    { id: 'metal', label: 'Brushed Metal' },
    { id: 'velvet', label: 'Luxury Velvet' },
  ];

  const colorOptions: Record<string, { label: string; value: string }[]> = {
    fabric: [
      { label: 'Soft Gray', value: '#D3D3D3' },
      { label: 'Warm Beige', value: '#F5F5DC' },
      { label: 'Deep Blue', value: '#4682B4' },
      { label: 'Sage Green', value: '#9AB973' },
    ],
    leather: [
      { label: 'Rich Brown', value: '#8B4513' },
      { label: 'Classic Black', value: '#1C2526' },
      { label: 'Tan', value: '#D2B48C' },
      { label: 'Burgundy', value: '#800020' },
    ],
    wood: [
      { label: 'Walnut', value: '#5C4033' },
      { label: 'Oak', value: '#C19A6B' },
      { label: 'Ebony', value: '#2F2F2F' },
      { label: 'Cherry', value: '#922724' },
    ],
    metal: [
      { label: 'Silver', value: '#C0C0C0' },
      { label: 'Gunmetal', value: '#2A3439' },
      { label: 'Brass', value: '#B5A642' },
      { label: 'Bronze', value: '#CD7F32' },
    ],
    velvet: [
      { label: 'Emerald', value: '#2ECC71' },
      { label: 'Royal Purple', value: '#8E44AD' },
      { label: 'Ruby Red', value: '#E74C3C' },
      { label: 'Midnight Blue', value: '#191970' },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl w-[90%] max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Chair Style</h3>
          <div className="flex flex-wrap gap-2">
            {shapes.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setShape(id as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  shape === id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Material</h3>
          <div className="flex flex-wrap gap-2">
            {textures.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setTexture(id);
                }}
                className={`px-4 py-2 rounded-lg transition-all ${
                  texture === id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions[texture].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setColor(value)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  color === value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: value }}
                />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Finish</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMaterialPreset('default')}
              className={`px-4 py-2 rounded-lg transition-all ${
                materialPreset === 'default'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Default
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700">Auto-Rotate</label>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`w-12 h-6 rounded-full transition-all ${
              autoRotate ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <motion.div
              animate={{ x: autoRotate ? 24 : 2 }}
              className="w-5 h-5 bg-white rounded-full shadow-md"
            />
          </button>
        </div>

        <button
          onClick={captureScreenshot}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Capture
        </button>
      </div>
    </motion.div>
  );
};

export default Controls;