import React, { useState } from "react";
import "../../styles/recipes.css";

const Recipes = () => {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");

  // Mock recipe data
  const mockRecipes = [
    {
      _id: "1",
      name: "Butter Chicken",
      cuisine: "Indian",
      difficulty: "Intermediate",
      cookTime: "40 mins",
      servings: 4,
      rating: 4.7,
      description: "Creamy, aromatic chicken curry with a rich tomato-based sauce",
      ingredients: ["Chicken", "Cream", "Tomato", "Spices"],
      image: "/images/placeholders/dish-placeholder.png"
    },
    {
      _id: "2",
      name: "Pad Thai",
      cuisine: "Thai",
      difficulty: "Easy",
      cookTime: "25 mins",
      servings: 2,
      rating: 4.5,
      description: "Stir-fried rice noodles with shrimp, vegetables, and peanuts",
      ingredients: ["Noodles", "Shrimp", "Vegetables", "Peanuts"],
      image: "/images/placeholders/dish-placeholder.png"
    },
    {
      _id: "3",
      name: "Sushi Rolls",
      cuisine: "Japanese",
      difficulty: "Hard",
      cookTime: "60 mins",
      servings: 4,
      rating: 4.8,
      description: "Fresh salmon and avocado rolls with perfectly seasoned rice",
      ingredients: ["Salmon", "Rice", "Nori", "Avocado"],
      image: "/images/placeholders/dish-placeholder.png"
    },
    {
      _id: "4",
      name: "Margherita Pizza",
      cuisine: "Italian",
      difficulty: "Easy",
      cookTime: "30 mins",
      servings: 2,
      rating: 4.4,
      description: "Classic pizza with fresh mozzarella, basil, and tomato",
      ingredients: ["Dough", "Mozzarella", "Tomato", "Basil"],
      image: "/images/placeholders/dish-placeholder.png"
    },
    {
      _id: "5",
      name: "Kung Pao Chicken",
      cuisine: "Chinese",
      difficulty: "Intermediate",
      cookTime: "35 mins",
      servings: 3,
      rating: 4.6,
      description: "Spicy stir-fried chicken with peanuts and bell peppers",
      ingredients: ["Chicken", "Peanuts", "Bell Peppers", "Soy Sauce"],
      image: "/images/placeholders/dish-placeholder.png"
    },
    {
      _id: "6",
      name: "Green Curry",
      cuisine: "Thai",
      difficulty: "Intermediate",
      cookTime: "45 mins",
      servings: 4,
      rating: 4.5,
      description: "Aromatic green curry with vegetables and coconut milk",
      ingredients: ["Green Curry Paste", "Coconut Milk", "Vegetables", "Basil"],
      image: "/images/placeholders/dish-placeholder.png"
    }
  ];

  // Filter recipes
  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || recipe.difficulty === selectedDifficulty;
    const matchesTime = selectedTime === "All" || 
      (selectedTime === "Quick" && parseInt(recipe.cookTime) <= 30) ||
      (selectedTime === "Medium" && parseInt(recipe.cookTime) > 30 && parseInt(recipe.cookTime) <= 50) ||
      (selectedTime === "Long" && parseInt(recipe.cookTime) > 50);
    return matchesSearch && matchesDifficulty && matchesTime;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="recipes-header">
        <div>
          <h1 className="page-title">👨‍🍳 Recipes</h1>
          <p className="page-subtitle">Discover delicious recipes tailored to your taste</p>
        </div>
        <div className="header-stats">
          <span>{filteredRecipes.length} recipes available</span>
        </div>
      </div>

      {/* Filters */}
      <div className="recipes-controls">
        <div className="search-bar-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="recipes-filters">
          <select
            className="filter-select"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="All">📊 All Levels</option>
            <option value="Easy">✨ Easy</option>
            <option value="Intermediate">⭐ Intermediate</option>
            <option value="Hard">🔥 Advanced</option>
          </select>

          <select
            className="filter-select"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="All">⏱️ Any Time</option>
            <option value="Quick">⚡ Quick (≤30 min)</option>
            <option value="Medium">🕐 Medium (30-50 min)</option>
            <option value="Long">🕰️ Long (&gt;50 min)</option>
          </select>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="recipes-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <div className="recipe-image-wrapper">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                <div className="recipe-badge">
                  <span className="recipe-rating">⭐ {recipe.rating}</span>
                </div>
                <div className="recipe-difficulty-tag">{recipe.difficulty}</div>
              </div>
              <div className="recipe-content">
                <h3 className="recipe-name">{recipe.name}</h3>
                <p className="recipe-description">{recipe.description}</p>
                
                <div className="recipe-meta">
                  <span className="meta-item">🍽️ {recipe.servings} servings</span>
                  <span className="meta-item">⏱️ {recipe.cookTime}</span>
                  <span className="meta-item">🌍 {recipe.cuisine}</span>
                </div>

                <div className="recipe-ingredients">
                  <p className="ingredients-label">Ingredients:</p>
                  <div className="ingredients-tags">
                    {recipe.ingredients.map((ing, idx) => (
                      <span key={idx} className="ingredient-tag">{ing}</span>
                    ))}
                  </div>
                </div>

                <button className="recipe-btn">View Recipe</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
            <p className="empty-icon">🔍</p>
            <p className="empty-text">No recipes found</p>
            <p className="empty-subtext">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
