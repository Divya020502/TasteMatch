import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import DishCard from "../../components/taste/DishCard";
import RecipeFilters from "../../components/taste/RecipeFilters";
import { LoadingCard } from "../../components/common/Loading";
import "../../styles/explore.css";
import { getRecommendations } from "../../api/dish";

const Explore = () => {
  const [dishes, setDishes] = useState([]);
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
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getRecommendations(filters);
        setDishes(res.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setDishes([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetch, 300);
    return () => clearTimeout(timeoutId);
  }, [filters]);

  return (
    <>
      <Navbar />

      <div className="container explore-container">
        <motion.div
          className="explore-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="explore-title">Discover Your Perfect Dish</h1>
          <p className="explore-subtitle">
            Find dishes that match your taste preferences using our advanced recommendation system
          </p>
        </motion.div>

        <div className="explore-layout">
          <motion.div
            className="filters-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="filters-title">🍽️ Refine Your Search</h3>
            <RecipeFilters
              filters={filters}
              setFilters={setFilters}
            />
          </motion.div>

          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              ⭐ Best Match For You
            </motion.h2>

            {loading ? (
              <div className="loading-grid">
                {[...Array(6)].map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            ) : dishes.length === 0 ? (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="no-results-icon">🔍</div>
                <h3>No matches found</h3>
                <p>Try adjusting your filters or search terms to find more dishes.</p>
              </motion.div>
            ) : (
              <motion.div
                className="dish-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {dishes.map((dish, index) => (
                  <DishCard key={dish._id} dish={dish} index={index} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
