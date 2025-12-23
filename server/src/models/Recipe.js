import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    dishName: String,
    ingredients: [String],
    steps: [String],
    cookingTime: String,
    calories: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", RecipeSchema);
