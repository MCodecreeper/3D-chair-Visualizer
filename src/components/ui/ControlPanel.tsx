'use client';

import { motion } from 'framer-motion';
import { useStore } from '@/library/zustandStore';
import { memo, useState } from 'react';

interface ControlPanelProps {
  setIsControlPanelOpen: (value: boolean) => void;
  onOptionClick: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = memo(({ setIsControlPanelOpen, onOptionClick }) => {
  const {
    color,
    setColor,
    texture,
    setTexture,
    shape,
    setShape,
    materialPreset,
    setMaterialPreset,
    autoRotate,
    setAutoRotate,
    captureScreenshot,
    legColor,
    setLegColor,
  } = useStore();

  const [isCrossRotating, setIsCrossRotating] = useState(false);

  const colorOptions: Record<string, { label: string; value: string }[]> = {
    fabric: [
      { label: 'Bright Silver', value: '#E6E6FA' },
      { label: 'Sunny Beige', value: '#FFFACD' },
      { label: 'Vivid Blue', value: '#00BFFF' },
      { label: 'Lime Green', value: '#32CD32' },
    ],
    leather: [
      { label: 'Light Tan', value: '#FFE4B5' },
      { label: 'Chocolate', value: '#D2691E' },
      { label: 'Slate Gray', value: '#708090' },
      { label: 'Crimson', value: '#DC143C' },
    ],
    wood: [
      { label: 'Golden Oak', value: '#FFD700' },
      { label: 'Light Walnut', value: '#DEB887' },
      { label: 'Honey Maple', value: '#F0C05A' },
      { label: 'Cherry Red', value: '#FF4040' },
    ],
    metal: [
      { label: 'Polished Silver', value: '#F5F5F5' },
      { label: 'Dark Steel', value: '#4682B4' },
      { label: 'Shiny Brass', value: '#FFD700' },
      { label: 'Warm Bronze', value: '#FFA500' },
    ],
  };

  const textures = [
    { id: 'fabric', label: 'Fabric' },
    { id: 'leather', label: 'Leather' },
    { id: 'wood', label: 'Wood' },
    { id: 'metal', label: 'Metal' },
  ];

  const shapes = [
    { id: 'office', label: 'Office Chair' },
    { id: 'dining', label: 'Dining Chair' },
    { id: 'lounge', label: 'Lounge Chair' },
  ];

  const legColorOptions: { label: string; value: string }[] = [
    { label: 'Walnut', value: '#5C4033' },
    { label: 'Oak', value: '#C19A6B' },
    { label: 'Ebony', value: '#2F2F2F' },
    { label: 'Cherry', value: '#922724' },
  ];

  const finishOptions = [
    { id: 'default', label: 'Default' },
    { id: 'glossy', label: 'Glossy' },
    { id: 'matte', label: 'Matte' },
    { id: 'satin', label: 'Satin' },
    { id: 'polished', label: 'Polished' },
  ];

  const handleClose = () => {
    setIsCrossRotating(true);
    setTimeout(() => {
      setIsControlPanelOpen(false);
      setIsCrossRotating(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed right-0 top-0 h-full w-[80%] max-w-xs bg-gradient-to-b from-gray-50 to-gray-100 shadow-xl p-4 overflow-y-auto rounded-tl-2xl rounded-bl-2xl sm:w-80 sm:max-w-none sm:p-6 md:p-8"
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-[#1A2A44] hover:text-[#D4AF37] transition-colors duration-300 sm:top-6 md:top-8"
      >
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isCrossRotating ? 'rotate-90' : 'rotate-0'} sm:w-7 sm:h-7`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 sm:text-xl md:text-2xl">Chair Style</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {shapes.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { setShape(id as 'office' | 'dining' | 'lounge'); onOptionClick(); }}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-3 ${
                shape === id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:shadow-sm border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 sm:text-xl md:text-2xl">Material</h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {textures.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { setTexture(id); onOptionClick(); }}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-3 ${
                texture === id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:shadow-sm border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 sm:text-xl md:text-2xl">Color</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {colorOptions[texture].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => { setColor(value); onOptionClick(); }}
              className={`w-6 h-6 rounded-full transition-all duration-300 border-2 hover:scale-110 sm:w-8 sm:h-8 md:w-10 md:h-10 ${
                color === value ? 'border-indigo-500 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: value }}
              title={label}
            />
          ))}
        </div>
        <span className="text-gray-600 text-xs mt-1 block sm:text-sm md:text-base">{color}</span>
      </div>

      {(shape === 'dining' || shape === 'lounge') && (
        <div className="mb-4 sm:mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 sm:text-xl md:text-2xl">Leg Color</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {legColorOptions.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => { setLegColor(value); onOptionClick(); }}
                className={`w-6 h-6 rounded-full transition-all duration-300 border-2 hover:scale-110 sm:w-8 sm:h-8 md:w-10 md:h-10 ${
                  legColor === value ? 'border-indigo-500 scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: value }}
                title={label}
              />
            ))}
          </div>
          <span className="text-gray-600 text-xs mt-1 block sm:text-sm md:text-base">{legColor}</span>
        </div>
      )}

      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 sm:text-xl md:text-2xl">Finish</h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {finishOptions.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { setMaterialPreset(id); onOptionClick(); }}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-3 ${
                materialPreset === id
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:shadow-sm border border-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 sm:text-xl md:text-2xl">Actions</h3>
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="flex justify-between items-center gap-2 sm:gap-3">
            <button
              onClick={() => { setAutoRotate(!autoRotate); onOptionClick(); }}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-3 ${
                autoRotate
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-indigo-50 hover:shadow-sm border border-gray-200'
              }`}
            >
              {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
            </button>
            <button
              onClick={() => { captureScreenshot(); onOptionClick(); }}
              className="px-2 py-2 rounded-lg bg-[#D4AF37] text-white text-sm hover:bg-[#b89b2f] transition-all duration-300 shadow-md font-semibold sm:px-3 sm:py-2 sm:text-base md:px-4 md:py-3"
            >
              Download Design
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default ControlPanel;