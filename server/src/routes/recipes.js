// /api/recipes
import express from "express";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import {
  getAllRecipes,
  getRecipeById,
  getRecipeByDishName,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

// Public routes (for viewing recipes)
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.get("/dish/:dishName", getRecipeByDishName);

// Admin only routes
router.post("/", auth, admin, createRecipe);
router.put("/:id", auth, admin, updateRecipe);
router.delete("/:id", auth, admin, deleteRecipe);

export default router;