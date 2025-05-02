import { motion } from 'framer-motion';
import { useStore } from '@/library/zustandStore';

const colors = [
  { name: 'Midnight Black', value: '#1a202c' },
  { name: 'Ivory White', value: '#f7fafc' },
  { name: 'Crimson Red', value: '#dc2626' },
  { name: 'Navy Blue', value: '#1e40af' },
  { name: 'Olive Green', value: '#4b5e40' },
];

const ColorSwatch: React.FC = () => {
  const setColor = useStore((state) => state.setColor);

  return (
    <div className="grid grid-cols-5 gap-2">
      {colors.map((color) => (
        <motion.div
          key={color.name}
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-slate-700"
          style={{ backgroundColor: color.value }}
          onClick={() => setColor(color.value)}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorSwatch;