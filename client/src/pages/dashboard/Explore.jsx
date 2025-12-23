import { useEffect, useState } from "react";
import DishCard from "../../components/taste/DishCard";
import { getRecommendations } from "../../api/dish";
import api from "../../api/axios";
import Navbar from "../../components/layout/Navbar";
import RecipeFilters from "../../components/taste/RecipeFilters";
import "../../styles/explore.css";

const Explore = () => {
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minSpicy: 0,
    minSweet: 0,
    minUmami: 0,
    minSour: 0,
    minBitter: 0,
    diet: "any",
    cuisines: [],
    search: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dishRes, restRes] = await Promise.all([
          getRecommendations(),
          api.get("/restaurants"),
        ]);

        setDishes(dishRes.data);
        setRestaurants(restRes.data);
      } catch (err) {
        console.error("Explore load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading dishes...</p>;

  return (
    <>
      <Navbar />
      <div className="explore-page">
        <RecipeFilters filters={filters} setFilters={setFilters} />
        <h2>⭐ Best Match For You</h2>

        <div className="dish-grid">
          {dishes.map((dish) => (
            <DishCard
              key={dish._id}
              dish={dish}
              restaurants={restaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
