import express from "express";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import {
  addDish,
  getRecommendations,
  getAllDishes,
  updateDish,
  deleteDish,
  getDishById,
} from "../controllers/dishController.js";

const router = express.Router();

/**
 * ✅ READ (User + Admin)
 */
router.get("/recommendations", auth, getRecommendations);
router.get("/", auth, getAllDishes);
router.get("/:id", auth, getDishById);

/**
 * 🔐 WRITE (Admin only)
 */
router.post("/", auth, admin, addDish);
router.put("/:id", auth, admin, updateDish);
router.delete("/:id", auth, admin, deleteDish);

export default router;
