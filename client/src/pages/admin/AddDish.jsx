import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { addDish } from "../../api/dish";
import { showSuccess, showError } from "../../utils/toast";
import "../../styles/editDish.css"; // reuse same styles

const initialDish = {
  name: "",
  cuisine: "",
  diet: "",
  tasteVector: {
    sweet: 0,
    spicy: 0,
    umami: 0,
    sour: 0,
    bitter: 0,
  },
};

const AddDish = () => {
  const [dish, setDish] = useState(initialDish);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setDish({ ...dish, [field]: value });
  };

  const handleTasteChange = (key, value) => {
    setDish({
      ...dish,
      tasteVector: { ...dish.tasteVector, [key]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDish(dish);
      showSuccess("Dish added successfully 🍽️");
      navigate("/admin/dishes");
    } catch {
      showError("Failed to add dish");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="dish-form-card">
          <h2>Add New Dish</h2>

          <form onSubmit={handleSubmit}>
            {/* Dish Name */}
            <label>Dish Name</label>
            <input
              value={dish.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              placeholder="e.g. Spicy Ramen"
              required
            />

            {/* Cuisine */}
            <label>Cuisine</label>
            <input
              value={dish.cuisine}
              onChange={(e) =>
                handleChange("cuisine", e.target.value)
              }
              placeholder="e.g. Japanese"
              required
            />

            {/* Diet */}
            <label>Diet</label>
            <select
              value={dish.diet}
              onChange={(e) =>
                handleChange("diet", e.target.value)
              }
            >
              <option value="">Any</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
              <option value="vegan">Vegan</option>
            </select>

            {/* Taste Profile */}
            <h4>🎯 Taste Profile</h4>

            {Object.entries(dish.tasteVector).map(
              ([key, value]) => (
                <div key={key} className="slider-row">
                  <label>
                    {key.toUpperCase()} ({value})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={value}
                    onChange={(e) =>
                      handleTasteChange(
                        key,
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              )
            )}

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn secondary"
                onClick={() => navigate("/admin/dishes")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn primary"
              >
                Create Dish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDish;
