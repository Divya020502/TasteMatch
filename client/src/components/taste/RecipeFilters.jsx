import { motion } from "framer-motion";
import CuisineChips from "./CuisineChips";
import "../../styles/filters.css";

const RecipeFilters = ({ filters, setFilters }) => {
  const update = (key, value) =>
    setFilters({ ...filters, [key]: value });

  const tasteLabels = {
    spicy: "🌶️ Spicy",
    sweet: "🍬 Sweet",
    umami: "🍄 Umami",
    sour: "🍋 Sour",
    bitter: "☕ Bitter",
  };

  return (
    <motion.div
      className="recipe-filters"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h4
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        🎛️ Filters
      </motion.h4>

      {/* Search */}
      <motion.div
        className="filter-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label>🔍 Search dishes</label>
        <input
          type="text"
          placeholder="Type dish name or keywords..."
          value={filters.search || ""}
          onChange={(e) => update("search", e.target.value)}
        />
      </motion.div>

      {/* Sliders */}
      {["spicy", "sweet", "umami", "sour", "bitter"].map((key, index) => (
        <motion.div
          key={key}
          className="filter-group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <label>
            {tasteLabels[key]} ≥{" "}
            <span className="slider-value">
              {filters[`min${key.charAt(0).toUpperCase() + key.slice(1)}`]}
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={filters[`min${key.charAt(0).toUpperCase() + key.slice(1)}`]}
            onChange={(e) =>
              update(
                `min${key.charAt(0).toUpperCase() + key.slice(1)}`,
                Number(e.target.value)
              )
            }
          />
        </motion.div>
      ))}

      {/* Diet */}
      <motion.div
        className="filter-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <label>🥗 Diet preference</label>
        <select
          value={filters.diet || "any"}
          onChange={(e) => update("diet", e.target.value)}
        >
          <option value="any">🍽️ Any</option>
          <option value="veg">🥬 Vegetarian</option>
          <option value="non-veg">🍖 Non-Vegetarian</option>
          <option value="vegan">🌱 Vegan</option>
        </select>
      </motion.div>

      {/* Cuisines (NEW – Chips UI) */}
      <motion.div
        className="filter-group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <label>🌍 Preferred cuisines</label>
        <CuisineChips
          selected={filters.cuisines || []}
          onChange={(cuisines) =>
            setFilters({ ...filters, cuisines })
          }
        />
      </motion.div>

      {/* Clear Filters */}
      <motion.button
        type="button"
        className="clear-filters-btn"
        onClick={() =>
          setFilters({
            minSpicy: 0,
            minSweet: 0,
            minUmami: 0,
            minSour: 0,
            minBitter: 0,
            diet: "any",
            cuisines: [],
            search: "",
          })
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        🗑️ Clear All Filters
      </motion.button>
    </motion.div>
  );
};

export default RecipeFilters;
