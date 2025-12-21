import mongoose from "mongoose";
import Dish from "../models/Dish.js";
import dotenv from "dotenv";

dotenv.config();

const dishes = [
  {
    name: "Spicy Ramen",
    cuisine: "Japanese",
    diet: "non-veg",
    tasteVector: {
      sweet: 1,
      spicy: 9,
      umami: 9,
      sour: 1,
      bitter: 0,
    },
  },
  {
    name: "Paneer Butter Masala",
    cuisine: "Indian",
    diet: "veg",
    tasteVector: {
      sweet: 6,
      spicy: 6,
      umami: 7,
      sour: 2,
      bitter: 0,
    },
  },
];


const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Dish.deleteMany();
  await Dish.insertMany(dishes);
  console.log("✅ Dishes seeded");
  process.exit();
};

seed();
