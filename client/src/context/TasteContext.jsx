import { createContext, useState } from "react";
import { showSuccess, showError } from "../utils/toast";
import api from "../api/axios";

export const TasteContext = createContext(null);

export const TasteProvider = ({ children }) => {
  const [taste, setTaste] = useState({
    sweet: 3,
    spicy: 3,
    umami: 3,
    sour: 0,
    bitter: 0,
  });

  const [cuisines, setCuisines] = useState([]);
  const [diet, setDiet] = useState("");

  const saveTasteProfile = async () => {
    try {
      const res = await api.put("/users/profile", {
        tasteProfile: taste,
        cuisines,
        diet,
      });

      console.log("Profile saved:", res.data);
      showSuccess("Taste profile saved 🎯");
    } catch (err) {
      console.error(
        "Save profile error:",
        err.response?.data || err.message
      );
      showError("Failed to save taste profile");
    }
  };


  return (
    <TasteContext.Provider
      value={{
        taste,
        setTaste,
        cuisines,
        setCuisines,
        diet,
        setDiet,
        saveTasteProfile,
      }}
    >
      {children}
    </TasteContext.Provider>
  );
};
