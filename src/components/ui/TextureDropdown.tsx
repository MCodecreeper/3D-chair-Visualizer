import { useStore } from '@/library/zustandStore';

const textures = ['fabric', 'leather', 'wood', 'velvet'];

const TextureDropdown: React.FC = () => {
  const setTexture = useStore((state) => state.setTexture);

  return (
    <select
      onChange={(e) => setTexture(e.target.value)}
      className="w-full p-2 bg-slate-800 text-ivory rounded-md"
    >
      {textures.map((texture) => (
        <option key={texture} value={texture}>
          {texture.charAt(0).toUpperCase() + texture.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default TextureDropdown;