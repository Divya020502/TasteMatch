import express from "express";
import { getAllRestaurants } from "../controllers/restaurantController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getAllRestaurants);

export default router;
