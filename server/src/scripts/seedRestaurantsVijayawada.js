import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "../models/Restaurant.js";

dotenv.config();

const restaurants = [
  {
    name: "Babai Hotel",
    cuisine: "Indian",
    lat: 16.5062,
    lng: 80.6480,
    address: "Gandhinagar, Vijayawada"
  },
  {
    name: "Sweet Magic",
    cuisine: "Indian",
    lat: 16.5105,
    lng: 80.6463,
    address: "Benz Circle, Vijayawada"
  },
  {
    name: "Rasoie",
    cuisine: "Indian",
    lat: 16.5069,
    lng: 80.6460,
    address: "Labbipet, Vijayawada"
  },
  {
    name: "Minerva Coffee Shop",
    cuisine: "Indian",
    lat: 16.5151,
    lng: 80.6497,
    address: "Governorpet, Vijayawada"
  }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Restaurant.deleteMany();
  await Restaurant.insertMany(restaurants);
  console.log("✅ Vijayawada restaurants seeded");
  process.exit();
};

seed();
