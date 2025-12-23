import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/recipe.css";

const RecipePage = () => {
  const { dishName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(
          `/recipes/${encodeURIComponent(dishName)}`
        );
        setRecipe(res.data);
      } catch (err) {
        console.error("Recipe not found");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [dishName]);

  if (loading) return <p>Loading recipe...</p>;
  if (!recipe) return <p>Recipe not available</p>;

  return (
    <div className="recipe-page">
      <h2>{recipe.dishName}</h2>

      <p>
        ⏱️ {recipe.cookingTime} | 🔥 {recipe.calories} kcal
      </p>

      <h3>🧂 Ingredients</h3>
      <ul>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h3>👩‍🍳 Steps</h3>
      <ol>
        {recipe.steps.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipePage;
