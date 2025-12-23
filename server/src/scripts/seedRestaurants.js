import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "../models/Restaurant.js";

dotenv.config();

const seedRestaurants = async () => {
  try {
    console.log("🌱 Seeding restaurants...");

    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data
    await Restaurant.deleteMany();

    const restaurants = [
      {
        name: "Minerva Coffee Shop",
        cuisines: ["Andhra", "South Indian"],
        address: "Benz Circle, Vijayawada",
        lat: 16.5081,
        lng: 80.6475,
        menu: [
          "Pesarattu",
          "Upma Pesarattu",
          "Punugulu",
          "Veg Meals",
          "Gutti Vankaya",
          "Tomato Pappu",
        ],
      },

      {
        name: "Babai Hotel",
        cuisines: ["Andhra"],
        address: "Governorpet, Vijayawada",
        lat: 16.517,
        lng: 80.6305,
        menu: [
          "Pesarattu",
          "Punugulu",
          "Veg Meals",
          "Avakaya Annam",
        ],
      },

      {
        name: "Sweet Magic",
        cuisines: ["Andhra", "Indian"],
        address: "Moghalrajpuram, Vijayawada",
        lat: 16.5076,
        lng: 80.6418,
        menu: [
          "Veg Meals",
          "Paneer Butter Masala",
          "Gutti Vankaya",
          "Bendakaya Fry",
        ],
      },

      {
        name: "Barbeque Nation",
        cuisines: ["Indian", "BBQ"],
        address: "MG Road, Vijayawada",
        lat: 16.5069,
        lng: 80.6482,
        menu: [
          "Chicken 65",
          "Andhra Chicken Curry",
          "Chicken Biryani",
          "Paneer Butter Masala",
        ],
      },

      {
        name: "Platform 65",
        cuisines: ["Indian", "Multi-Cuisine"],
        address: "Labbipet, Vijayawada",
        lat: 16.5051,
        lng: 80.6523,
        menu: [
          "Chicken Biryani",
          "Mutton Biryani",
          "Chicken 65",
          "Paneer Butter Masala",
        ],
      },

      {
        name: "Rasoie",
        cuisines: ["North Indian", "Andhra"],
        address: "Labbipet, Vijayawada",
        lat: 16.5058,
        lng: 80.6509,
        menu: [
          "Veg Meals",
          "Paneer Butter Masala",
          "Gutti Vankaya",
        ],
      },

      {
        name: "Rajdhani Restaurant",
        cuisines: ["Andhra"],
        address: "Auto Nagar, Vijayawada",
        lat: 16.5202,
        lng: 80.6821,
        menu: [
          "Andhra Chicken Curry",
          "Kodi Kura",
          "Royyala Vepudu",
          "Veg Meals",
        ],
      },

      {
        name: "Daspalla Executive Court",
        cuisines: ["Indian"],
        address: "MG Road, Vijayawada",
        lat: 16.5087,
        lng: 80.646,
        menu: [
          "Chicken Biryani",
          "Mutton Biryani",
          "Egg Curry",
          "Paneer Butter Masala",
        ],
      },

      {
        name: "Anjaneya Vilas",
        cuisines: ["South Indian"],
        address: "Patamata, Vijayawada",
        lat: 16.4943,
        lng: 80.6569,
        menu: [
          "Pesarattu",
          "Punugulu",
          "Veg Meals",
        ],
      },

      {
        name: "Southern Spice",
        cuisines: ["South Indian", "Andhra"],
        address: "Governorpet, Vijayawada",
        lat: 16.5154,
        lng: 80.6339,
        menu: [
          "Gongura Chicken",
          "Chepala Pulusu",
          "Veg Meals",
        ],
      },

      {
        name: "Blue Fox",
        cuisines: ["Indian", "Chinese"],
        address: "Labbipet, Vijayawada",
        lat: 16.5042,
        lng: 80.6511,
        menu: [
          "Chicken 65",
          "Egg Curry",
          "Chicken Biryani",
        ],
      },

      {
        name: "Food Republic",
        cuisines: ["Multi-Cuisine"],
        address: "Gurunanak Colony, Vijayawada",
        lat: 16.5021,
        lng: 80.6583,
        menu: [
          "Paneer Butter Masala",
          "Chicken Biryani",
          "Veg Meals",
        ],
      },

      {
        name: "Red Chillies",
        cuisines: ["Andhra"],
        address: "Poranki, Vijayawada",
        lat: 16.4735,
        lng: 80.6982,
        menu: [
          "Rayalaseema Chicken Fry",
          "Andhra Chicken Curry",
          "Kodi Kura",
        ],
      },

      {
        name: "Kritunga Restaurant",
        cuisines: ["Rayalaseema", "Andhra"],
        address: "MG Road, Vijayawada",
        lat: 16.5098,
        lng: 80.6479,
        menu: [
          "Rayalaseema Chicken Fry",
          "Natu Kodi Pulusu",
          "Veg Meals",
        ],
      },

      {
        name: "Spicy Venue",
        cuisines: ["Andhra"],
        address: "Kanuru, Vijayawada",
        lat: 16.4882,
        lng: 80.6954,
        menu: [
          "Gongura Chicken",
          "Royyala Vepudu",
          "Egg Curry",
        ],
      },

      {
        name: "Ironhill Brewery",
        cuisines: ["Indian", "Continental"],
        address: "MG Road, Vijayawada",
        lat: 16.506,
        lng: 80.6495,
        menu: [
          "Chicken 65",
          "Paneer Butter Masala",
          "Chicken Biryani",
        ],
      },

      {
        name: "KFC Vijayawada",
        cuisines: ["Fast Food"],
        address: "Benz Circle, Vijayawada",
        lat: 16.5084,
        lng: 80.6478,
        menu: ["Chicken 65"],
      },

      {
        name: "Domino's Pizza",
        cuisines: ["Italian"],
        address: "Labbipet, Vijayawada",
        lat: 16.5037,
        lng: 80.6502,
        menu: ["Paneer Butter Masala"],
      },

      {
        name: "Pizza Hut",
        cuisines: ["Italian"],
        address: "Auto Nagar, Vijayawada",
        lat: 16.519,
        lng: 80.681,
        menu: ["Paneer Butter Masala"],
      },

      {
        name: "Hotel Ilapuram",
        cuisines: ["Indian", "Andhra"],
        address: "Gandhinagar, Vijayawada",
        lat: 16.5142,
        lng: 80.6291,
        menu: [
          "Chicken Biryani",
          "Egg Curry",
          "Veg Meals",
        ],
      },
    ];

    await Restaurant.insertMany(restaurants);

    console.log("✅ Restaurants seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedRestaurants();
