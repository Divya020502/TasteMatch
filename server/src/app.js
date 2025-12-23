import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import dishRoutes from "./routes/dishes.js";
import placesRoutes from "./routes/places.js";
import restaurantRoutes from "./routes/restaurants.js";
import recipeRoutes from "./routes/recipes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "TasteMatch API running " });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/recipes", recipeRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
