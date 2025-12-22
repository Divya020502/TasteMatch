import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "../models/Restaurant.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Restaurant.deleteMany();

await Restaurant.insertMany([
  {
    name: "Minerva Coffee Shop",
    cuisine: "Indian",
    address: "Benz Circle, Vijayawada",
    lat: 16.5081,
    lng: 80.6475,
    dishes: ["Dosa", "Idli", "Veg Meals"],
  },
  {
    name: "Babai Hotel",
    cuisine: "Indian",
    address: "Gandhinagar",
    lat: 16.5153,
    lng: 80.6306,
    dishes: ["Poori", "Upma"],
  },
  {
    name: "Spicy Ramen House",
    cuisine: "Japanese",
    address: "MG Road",
    lat: 16.5065,
    lng: 80.6489,
    dishes: ["Spicy Ramen"],
  },
]);

console.log("✅ Restaurants seeded");
process.exit();
