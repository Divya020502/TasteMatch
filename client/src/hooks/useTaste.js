import { useContext } from "react";
import { TasteContext } from "../context/TasteContext";

const useTaste = () => {
  const context = useContext(TasteContext);

  if (!context) {
    throw new Error("useTaste must be used within TasteProvider");
  }

  return context;
};

export default useTaste;
