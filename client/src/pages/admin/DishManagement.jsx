import { useEffect, useState } from "react";
import { getAllDishes, deleteDish } from "../../api/dish";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toast";
import "../../styles/admin.css";

const DishManagement = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    try {
      const res = await getAllDishes();
      setDishes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      await deleteDish(id);
      showSuccess("Dish deleted");
      fetchDishes();
    } catch {
      showError("Failed to delete dish");
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="admin-header">
          <h2>🍽️ Dish Management</h2>

          <Link to="/admin/dishes/new" className="btn primary">
            ➕ Add New Dish
          </Link>
        </div>

        {loading ? (
          <p>Loading dishes...</p>
        ) : dishes.length === 0 ? (
          <p className="muted">No dishes found.</p>
        ) : (
          <div className="admin-grid">
            {dishes.map((dish) => (
              <div key={dish._id} className="admin-card">
                <h4>{dish.name}</h4>
                <p className="muted">
                  {dish.cuisine} • {dish.diet}
                </p>

                <div className="taste-row">
                  🌶️ {dish.tasteVector.spicy} | 🍬{" "}
                  {dish.tasteVector.sweet} | 🍄{" "}
                  {dish.tasteVector.umami}
                </div>

                <div className="admin-actions">
                  <Link
                    to={`/admin/dishes/${dish._id}`}
                    className="btn secondary"
                  >
                    ✏️ Edit
                  </Link>

                  <button
                    className="btn danger"
                    onClick={() => handleDelete(dish._id)}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DishManagement;
