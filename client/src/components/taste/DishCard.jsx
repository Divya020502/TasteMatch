import { useNavigate } from "react-router-dom";
import "../../styles/dishCard.css";

const DishCard = ({ dish, restaurants }) => {
  const navigate = useNavigate();

  const servingRestaurants = restaurants.filter((r) =>
    r.menu.includes(dish.name)
  );

  return (
    <div className="dish-card">
      <h3>{dish.name}</h3>

      <p className="dish-meta">
        🍽️ {dish.cuisine} | {dish.diet}
      </p>

      <p className="dish-desc">{dish.description}</p>

      <div className="dish-restaurants">
        <strong>📍 Available at:</strong>
        {servingRestaurants.length === 0 ? (
          <p className="muted">No nearby restaurants</p>
        ) : (
          <ul>
            {servingRestaurants.slice(0, 3).map((r) => (
              <li key={r._id}>{r.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="dish-actions">
        <button
          onClick={() =>
            navigate(`/restaurants?dish=${encodeURIComponent(dish.name)}`)
          }
        >
          View Restaurants
        </button>

        <button
          className="secondary"
          onClick={() =>
            navigate(`/recipe/${encodeURIComponent(dish.name)}`)
          }
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default DishCard;
