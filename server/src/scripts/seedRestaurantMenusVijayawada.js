import mongoose from "mongoose";
import dotenv from "dotenv";
import Dish from "../models/Dish.js";
import Restaurant from "../models/Restaurant.js";
import RestaurantMenu from "../models/RestaurantMenu.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const biryani = await Dish.findOne({ name: "Chicken Biryani" });
  const paneer = await Dish.findOne({ name: "Paneer Butter Masala" });
  const gongura = await Dish.findOne({ name: "Gongura Chicken" });
  const meals = await Dish.findOne({ name: "Veg Meals" });

  const babai = await Restaurant.findOne({ name: "Babai Hotel" });
  const sweetMagic = await Restaurant.findOne({ name: "Sweet Magic" });
  const rasoie = await Restaurant.findOne({ name: "Rasoie" });

  await RestaurantMenu.deleteMany();

  await RestaurantMenu.insertMany([
    { restaurantId: babai._id, dishId: meals._id, price: 180 },
    { restaurantId: rasoie._id, dishId: paneer._id, price: 260 },
    { restaurantId: sweetMagic._id, dishId: biryani._id, price: 320 },
    { restaurantId: sweetMagic._id, dishId: gongura._id, price: 340 }
  ]);

  console.log("✅ Vijayawada restaurant menus seeded");
  process.exit();
};

seed();
