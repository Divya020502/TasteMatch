import mongoose from "mongoose";
import dotenv from "dotenv";
import Dish from "../models/Dish.js";

dotenv.config();

const dishes = [
  {
    name: "Chicken Biryani",
    cuisine: "Indian",
    diet: "non-veg",
    tasteVector: { sweet: 2, spicy: 8, umami: 8, sour: 1, bitter: 0 },
    keywords: ["biryani", "rice", "spicy"]
  },
  {
    name: "Paneer Butter Masala",
    cuisine: "Indian",
    diet: "veg",
    tasteVector: { sweet: 4, spicy: 5, umami: 7, sour: 2, bitter: 0 },
    keywords: ["paneer", "curry"]
  },
  {
    name: "Gongura Chicken",
    cuisine: "Indian",
    diet: "non-veg",
    tasteVector: { sweet: 1, spicy: 9, umami: 8, sour: 7, bitter: 0 },
    keywords: ["gongura", "spicy"]
  },
  {
    name: "Veg Meals",
    cuisine: "Indian",
    diet: "veg",
    tasteVector: { sweet: 2, spicy: 4, umami: 6, sour: 2, bitter: 1 },
    keywords: ["meals", "thali"]
  }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Dish.deleteMany();
  await Dish.insertMany(dishes);
  console.log("✅ Vijayawada dishes seeded");
  process.exit();
};

seed();
