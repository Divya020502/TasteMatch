// src/pages/tastes/CuisineSelection.jsx
import React, { useState, useEffect, useContext } from "react";
import "../../styles/tastes.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";

const CUISINES = ["Indian", "Japanese", "Chinese", "Italian", "Thai", "Continental"];

const CuisineSelection = () => {
  const { user } = useContext(AuthContext);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  useEffect(() => {
    const fetchCuisines = async () => {
      if (!user) return;
      const res = await axios.get(`/api/users/${user._id}/cuisines`);
      setSelectedCuisines(res.data.cuisines || []);
    };
    fetchCuisines();
  }, [user]);

  const handleToggle = (cuisine) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleSave = async () => {
    if (!user) return;
    await axios.put(`/api/users/${user._id}/cuisines`, { cuisines: selectedCuisines });
    alert("Cuisines saved!");
  };

  return (
    <div className="cuisine-selection">
      <h2>Select Your Favorite Cuisines</h2>
      <div className="cuisine-grid">
        {CUISINES.map((cuisine) => (
          <label key={cuisine} className="cuisine-card" onClick={() => handleToggle(cuisine)}>
            <input
              type="checkbox"
              checked={selectedCuisines.includes(cuisine)}
              onChange={() => handleToggle(cuisine)}
            />
            <div>
              <div className="cuisine-label">{cuisine}</div>
              <span className="cuisine-subtext">Popular choice</span>
            </div>
          </label>
        ))}
      </div>

      <div className="cuisine-actions">
        <div className="select-count">{selectedCuisines.length} selected</div>
        <button className="save-btn" onClick={handleSave} disabled={selectedCuisines.length===0}>
          Save Cuisines
        </button>
      </div>
    </div>
  );
};

export default CuisineSelection;
