import { CUISINES } from "../../utils/constants";
import "../../styles/taste.css";

const CuisineChips = ({ selected, setSelected }) => {
  const toggleCuisine = (cuisine) => {
    if (selected.includes(cuisine)) {
      setSelected(selected.filter((c) => c !== cuisine));
    } else {
      setSelected([...selected, cuisine]);
    }
  };

  return (
    <div className="cuisine-chips">
      {CUISINES.map((cuisine) => (
        <button
          key={cuisine}
          className={
            selected.includes(cuisine)
              ? "chip chip-active"
              : "chip"
          }
          onClick={() => toggleCuisine(cuisine)}
        >
          {cuisine}
        </button>
      ))}
    </div>
  );
};

export default CuisineChips;
