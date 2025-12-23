import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "../models/Recipe.js";

dotenv.config();

const recipes = [
  {
    dishName: "Gongura Chicken",
    ingredients: [
      "Chicken",
      "Gongura leaves",
      "Onions",
      "Red chilies",
      "Garlic",
      "Oil",
      "Salt",
    ],
    steps: [
      "Wash and cook chicken until tender",
      "Grind gongura with chilies and garlic",
      "Fry onions until golden",
      "Add chicken and ground paste",
      "Cook until oil separates",
    ],
    cookingTime: "40 mins",
    calories: 420,
  },

  {
    dishName: "Andhra Chicken Curry",
    ingredients: [
      "Chicken",
      "Onions",
      "Tomatoes",
      "Green chilies",
      "Garam masala",
    ],
    steps: [
      "Marinate chicken with spices",
      "Saute onions and tomatoes",
      "Add chicken and cook",
      "Simmer until thick gravy forms",
    ],
    cookingTime: "35 mins",
    calories: 400,
  },

  {
    dishName: "Rayalaseema Chicken Fry",
    ingredients: [
      "Chicken",
      "Red chili powder",
      "Garlic",
      "Curry leaves",
    ],
    steps: [
      "Boil chicken with salt",
      "Dry fry with chili powder and garlic",
      "Fry until crispy",
    ],
    cookingTime: "30 mins",
    calories: 450,
  },

  {
    dishName: "Kodi Kura",
    ingredients: [
      "Chicken",
      "Onions",
      "Green chilies",
      "Spices",
    ],
    steps: [
      "Heat oil and fry onions",
      "Add spices and chicken",
      "Cook on low flame",
    ],
    cookingTime: "35 mins",
    calories: 380,
  },

  {
    dishName: "Royyala Vepudu",
    ingredients: ["Prawns", "Red chili powder", "Garlic", "Oil"],
    steps: [
      "Clean prawns",
      "Marinate with spices",
      "Shallow fry until crisp",
    ],
    cookingTime: "25 mins",
    calories: 360,
  },

  {
    dishName: "Chepala Pulusu",
    ingredients: ["Fish", "Tamarind", "Onions", "Spices"],
    steps: [
      "Prepare tamarind broth",
      "Add fish pieces",
      "Simmer gently",
    ],
    cookingTime: "30 mins",
    calories: 340,
  },

  {
    dishName: "Natu Kodi Pulusu",
    ingredients: ["Country chicken", "Onions", "Spices"],
    steps: [
      "Cook chicken slowly",
      "Add spice paste",
      "Simmer until soft",
    ],
    cookingTime: "60 mins",
    calories: 480,
  },

  {
    dishName: "Chicken 65",
    ingredients: ["Chicken", "Cornflour", "Chili paste"],
    steps: [
      "Marinate chicken",
      "Deep fry until crisp",
    ],
    cookingTime: "20 mins",
    calories: 390,
  },

  {
    dishName: "Pesarattu",
    ingredients: ["Green gram", "Ginger", "Green chilies"],
    steps: [
      "Soak green gram",
      "Grind batter",
      "Cook dosa on pan",
    ],
    cookingTime: "20 mins",
    calories: 220,
  },

  {
    dishName: "Upma Pesarattu",
    ingredients: ["Green gram", "Upma", "Ginger"],
    steps: [
      "Prepare pesarattu batter",
      "Add upma filling",
      "Cook dosa",
    ],
    cookingTime: "25 mins",
    calories: 260,
  },

  {
    dishName: "Punugulu",
    ingredients: ["Dosa batter", "Onions", "Green chilies"],
    steps: [
      "Mix ingredients",
      "Deep fry spoonfuls",
    ],
    cookingTime: "15 mins",
    calories: 280,
  },

  {
    dishName: "Gutti Vankaya",
    ingredients: ["Brinjal", "Peanuts", "Spices"],
    steps: [
      "Prepare stuffing",
      "Stuff brinjals",
      "Slow cook",
    ],
    cookingTime: "40 mins",
    calories: 310,
  },

  {
    dishName: "Bendakaya Fry",
    ingredients: ["Okra", "Spices", "Oil"],
    steps: [
      "Slice okra",
      "Fry until crisp",
    ],
    cookingTime: "20 mins",
    calories: 200,
  },

  {
    dishName: "Tomato Pappu",
    ingredients: ["Toor dal", "Tomatoes", "Spices"],
    steps: [
      "Cook dal",
      "Add tomato masala",
    ],
    cookingTime: "30 mins",
    calories: 250,
  },

  {
    dishName: "Avakaya Annam",
    ingredients: ["Rice", "Avakaya pickle"],
    steps: [
      "Cook rice",
      "Mix pickle",
    ],
    cookingTime: "15 mins",
    calories: 300,
  },

  {
    dishName: "Chicken Biryani",
    ingredients: ["Rice", "Chicken", "Spices"],
    steps: [
      "Cook rice separately",
      "Prepare chicken masala",
      "Dum cook together",
    ],
    cookingTime: "50 mins",
    calories: 550,
  },

  {
    dishName: "Mutton Biryani",
    ingredients: ["Rice", "Mutton", "Spices"],
    steps: [
      "Cook mutton slowly",
      "Layer with rice",
      "Dum cook",
    ],
    cookingTime: "70 mins",
    calories: 650,
  },

  {
    dishName: "Paneer Butter Masala",
    ingredients: ["Paneer", "Butter", "Tomatoes"],
    steps: [
      "Prepare tomato gravy",
      "Add paneer",
    ],
    cookingTime: "30 mins",
    calories: 420,
  },

  {
    dishName: "Veg Meals",
    ingredients: ["Rice", "Vegetables", "Dal"],
    steps: [
      "Cook rice",
      "Prepare curries",
    ],
    cookingTime: "45 mins",
    calories: 500,
  },

  {
    dishName: "Egg Curry",
    ingredients: ["Eggs", "Onions","Spices"],
    steps: [
      "Boil eggs",
      "Prepare gravy",
      "Add eggs to gravy",
    ],
    cookingTime: "25 mins",
    calories: 330,
  },

  {
    dishName: "Masala Dosa",
    ingredients: ["Rice", "Urad dal", "Potato"],
    steps: [
      "Prepare dosa batter",
      "Cook potato masala",
      "Serve hot",
    ],
    cookingTime: "30 mins",
    calories: 350,
  },
];

const seedRecipes = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Recipe.deleteMany();
  await Recipe.insertMany(recipes);
  console.log("✅ Recipes seeded (22 dishes)");
  process.exit();
};

seedRecipes();
