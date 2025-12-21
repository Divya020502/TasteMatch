// Sweet, Spicy, etc

import { useContext } from "react";
import { TasteContext } from "../../context/TasteContext";

const TasteSliders = () => {
  const { tasteProfile, setTasteProfile } = useContext(TasteContext);

  const handleChange = (key, value) => {
    setTasteProfile({
      ...tasteProfile,
      [key]: Number(value),
    });
  };

  return (
    <div>
      <h3>Taste Profile</h3>

      {Object.keys(tasteProfile).map((key) => (
        <div key={key}>
          <label>
            {key.toUpperCase()}: {tasteProfile[key]}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={tasteProfile[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default TasteSliders;
