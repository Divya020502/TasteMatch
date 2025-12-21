import Navbar from "../../components/layout/Navbar";
import { useContext } from "react";
import { TasteContext } from "../../context/TasteContext";
import "../../styles/taste.css";

const TasteQuiz = () => {
  const {
    taste,
    setTaste,
    cuisines,
    setCuisines,
    diet,
    setDiet,
    saveTasteProfile,
  } = useContext(TasteContext);

  const handleTasteChange = (key, value) => {
    setTaste({ ...taste, [key]: value });
  };

  const toggleCuisine = (cuisine) => {
    if (cuisines.includes(cuisine)) {
      setCuisines(cuisines.filter((c) => c !== cuisine));
    } else {
      setCuisines([...cuisines, cuisine]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>🎯 Taste Profile</h2>

        {/* Taste Sliders */}
        {taste &&
        Object.keys(taste).map((key) => (
          <div key={key} style={{ marginBottom: "12px" }}>
            <label>
              {key.toUpperCase()}: {taste[key]}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={taste[key]}
              onChange={(e) =>
                handleTasteChange(key, Number(e.target.value))
              }
            />
          </div>
        ))}

        {/* Cuisine Selection */}
        <h3>Select Cuisines</h3>
        {["Indian", "Japanese", "Chinese", "Italian"].map((c) => (
          <button
            key={c}
            onClick={() => toggleCuisine(c)}
            style={{
              marginRight: "8px",
              background: cuisines.includes(c)
                ? "#2563eb"
                : "#e5e7eb",
              color: cuisines.includes(c) ? "#fff" : "#000",
              padding: "6px 12px",
            }}
          >
            {c}
          </button>
        ))}

        {/* Diet */}
        <h3 style={{ marginTop: "16px" }}>Diet Preference</h3>
        <select
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="">Any</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="vegan">Vegan</option>
        </select>

        {/* Save */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={saveTasteProfile}
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "10px 16px",
            }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </>
  );
};

export default TasteQuiz;
