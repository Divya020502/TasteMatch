// Diet preferences

import { useContext } from "react";
import { TasteContext } from "../../context/TasteContext";

const DietSelector = () => {
  const { diet, setDiet } = useContext(TasteContext);

  return (
    <div>
      <h3>Diet Preference</h3>

      <select
        value={diet ?? ""}
        onChange={(e) => setDiet(e.target.value)}
      >
        <option value="">Select Diet</option>
        <option value="veg">Veg</option>
        <option value="non-veg">Non-Veg</option>
        <option value="vegan">Vegan</option>
      </select>

    </div>
  );
};

export default DietSelector;
