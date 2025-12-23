import { useNavigate } from "react-router-dom";
import "../../styles/dishCard.css";

const DishCard = ({ dish }) => {
  const navigate = useNavigate();

  return (
    <div className="dish-card">

      {/* Dish name */}
      <h3 className="dish-name">{dish.name}</h3>

      {/* Cuisine + Diet */}
      <p className="dish-meta">
        {dish.cuisine} • {dish.diet === "veg" ? "🥬 Veg" : "🍖 Non-Veg"}
      </p>

      {/* Taste highlights */}
      <div className="dish-tastes">
        {dish.tasteVector.spicy >= 7 && <span>🌶️ Spicy</span>}
        {dish.tasteVector.umami >= 7 && <span>🍄 Umami-rich</span>}
        {dish.tasteVector.sweet >= 5 && <span>🍬 Slightly Sweet</span>}
      </div>

      {/* Description */}
      <p className="dish-description">
        {dish.description || "A delicious dish loved by food lovers."}
      </p>

      {/* Restaurants */}
      <div className="dish-restaurants">
        <div className="restaurants-header">
          <span>📍 Available Nearby</span>
          <button
            className="link-btn"
            onClick={() => navigate(`/map?dish=${dish._id}`)}
          >
            View Restaurants
          </button>
        </div>

        <ul>
          {dish.restaurants?.slice(0, 3).map((r) => (
            <li key={r._id}>{r.name}</li>
          ))}
        </ul>
      </div>

      {/* Recipe */}
      <button
        className="recipe-btn"
        onClick={() => navigate(`/dish/${dish._id}`)}
      >
        🍳 View Recipe
      </button>

    </div>
  );
};

export default DishCard;
