import express from "express";
import { getAllRestaurants, getRestaurantsByDish } from "../controllers/restaurantController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getAllRestaurants);
router.get("/dish/:dishId", auth, getRestaurantsByDish);

export default router;
