// /api/users

import express from "express";
import auth from "../middlewares/auth.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Protected routes
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

export default router;
