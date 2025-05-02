import { useStore } from '@/library/zustandStore';

const LightingSliders: React.FC = () => {
  const { lightIntensity, lightPosition, setLightIntensity, setLightPosition } = useStore();

  return (
    <div className="space-y-4">
      <div>
        <label className="text-ivory">Intensity</label>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.1"
          value={lightIntensity}
          onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      {['x', 'y', 'z'].map((axis) => (
        <div key={axis}>
          <label className="text-ivory capitalize">{`${axis} Position`}</label>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={lightPosition[axis as keyof typeof lightPosition]}
            onChange={(e) =>
              setLightPosition({
                ...lightPosition,
                [axis]: parseFloat(e.target.value),
              })
            }
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default LightingSliders;