// /api/places

import express from "express";
import auth from "../middlewares/auth.js";
import { getNearbyRestaurants } from "../controllers/placesController.js";

const router = express.Router();

router.get("/nearby", auth, getNearbyRestaurants);

export default router;

