import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toast";
import Navbar from "../../components/layout/Navbar";
import {
  getDishById,
  addDish,
  updateDish,
} from "../../api/dish";
import "../../styles/editDish.css";

const emptyDish = {
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

const EditDish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [dish, setDish] = useState(emptyDish);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;

    const fetchDish = async () => {
      try {
        const res = await getDishById(id);
        setDish(res.data);
      } catch (err) {
        alert("Dish not found");
        navigate("/admin/dishes");
      } finally {
        setLoading(false);
      }
    };

    fetchDish();
  }, [id, isEdit, navigate]);

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
      if (isEdit) {
        await updateDish(id, dish);
        showSuccess("Dish updated successfully");
      } else {
        await addDish(dish);
        showSuccess("Dish created successfully");
      }

      navigate("/admin/dishes");
    } catch (err) {
      alert("Failed to save dish");
    }
  };

  if (loading) return <p>Loading dish...</p>;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="dish-form-card">
          <h2>
            {isEdit ? "✏️ Edit Dish" : "➕ Add New Dish"}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <label>Dish Name</label>
            <input
              value={dish.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              required
            />

            {/* Cuisine */}
            <label>Cuisine</label>
            <input
              value={dish.cuisine}
              onChange={(e) =>
                handleChange("cuisine", e.target.value)
              }
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

            {/* Taste Sliders */}
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
                {isEdit ? "Update Dish" : "Create Dish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDish;
