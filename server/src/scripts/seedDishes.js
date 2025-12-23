import mongoose from "mongoose";
import dotenv from "dotenv";
import Dish from "../models/Dish.js";

dotenv.config();

const dishes = [
  {
    name: "Gongura Chicken",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Tangy and spicy chicken curry made with fresh gongura leaves.",
    tasteVector: { spicy: 9, sweet: 0, umami: 8, sour: 7, bitter: 1 }
  },
  {
    name: "Andhra Chicken Curry",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Classic Vijayawada-style chicken curry with fiery spices.",
    tasteVector: { spicy: 8, sweet: 1, umami: 8, sour: 2, bitter: 0 }
  },
  {
    name: "Rayalaseema Chicken Fry",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Dry chicken fry loaded with red chilies and garlic.",
    tasteVector: { spicy: 10, sweet: 0, umami: 7, sour: 1, bitter: 1 }
  },
  {
    name: "Kodi Kura",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Traditional Andhra chicken gravy cooked slowly.",
    tasteVector: { spicy: 7, sweet: 1, umami: 7, sour: 2, bitter: 0 }
  },
  {
    name: "Royyala Vepudu",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Spicy prawn fry tossed with curry leaves.",
    tasteVector: { spicy: 8, sweet: 1, umami: 8, sour: 1, bitter: 0 }
  },
  {
    name: "Chepala Pulusu",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Sour and spicy fish curry cooked in tamarind gravy.",
    tasteVector: { spicy: 7, sweet: 0, umami: 7, sour: 8, bitter: 0 }
  },
  {
    name: "Natu Kodi Pulusu",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Country chicken curry slow-cooked for deep flavor.",
    tasteVector: { spicy: 8, sweet: 0, umami: 8, sour: 3, bitter: 0 }
  },
  {
    name: "Chicken 65",
    cuisine: "Andhra",
    diet: "non-veg",
    description: "Crispy fried chicken with bold Andhra spices.",
    tasteVector: { spicy: 8, sweet: 1, umami: 7, sour: 1, bitter: 0 }
  },
  {
    name: "Pesarattu",
    cuisine: "Andhra",
    diet: "veg",
    description: "Protein-rich dosa made from green gram.",
    tasteVector: { spicy: 3, sweet: 0, umami: 5, sour: 1, bitter: 0 }
  },
  {
    name: "Upma Pesarattu",
    cuisine: "Andhra",
    diet: "veg",
    description: "Pesarattu served with upma filling.",
    tasteVector: { spicy: 3, sweet: 0, umami: 6, sour: 1, bitter: 0 }
  },
  {
    name: "Punugulu",
    cuisine: "Andhra",
    diet: "veg",
    description: "Crispy fritters made from dosa batter.",
    tasteVector: { spicy: 4, sweet: 0, umami: 5, sour: 1, bitter: 0 }
  },
  {
    name: "Gutti Vankaya",
    cuisine: "Andhra",
    diet: "veg",
    description: "Stuffed brinjal curry with ground spices.",
    tasteVector: { spicy: 6, sweet: 1, umami: 6, sour: 2, bitter: 2 }
  },
  {
    name: "Bendakaya Fry",
    cuisine: "Andhra",
    diet: "veg",
    description: "Crispy fried okra with spices.",
    tasteVector: { spicy: 4, sweet: 0, umami: 4, sour: 0, bitter: 2 }
  },
  {
    name: "Tomato Pappu",
    cuisine: "Andhra",
    diet: "veg",
    description: "Comforting tomato dal served with rice.",
    tasteVector: { spicy: 3, sweet: 1, umami: 5, sour: 4, bitter: 0 }
  },
  {
    name: "Avakaya Annam",
    cuisine: "Andhra",
    diet: "veg",
    description: "Rice mixed with spicy mango pickle.",
    tasteVector: { spicy: 6, sweet: 0, umami: 4, sour: 5, bitter: 0 }
  },
  {
    name: "Chicken Biryani",
    cuisine: "Indian",
    diet: "non-veg",
    description: "Fragrant rice cooked with spiced chicken.",
    tasteVector: { spicy: 6, sweet: 1, umami: 8, sour: 1, bitter: 0 }
  },
  {
    name: "Mutton Biryani",
    cuisine: "Indian",
    diet: "non-veg",
    description: "Rich and aromatic biryani with tender mutton.",
    tasteVector: { spicy: 7, sweet: 1, umami: 9, sour: 1, bitter: 0 }
  },
  {
    name: "Paneer Butter Masala",
    cuisine: "Indian",
    diet: "veg",
    description: "Creamy tomato-based paneer curry.",
    tasteVector: { spicy: 4, sweet: 4, umami: 6, sour: 2, bitter: 0 }
  },
  {
    name: "Veg Meals",
    cuisine: "Andhra",
    diet: "veg",
    description: "Traditional Andhra thali with rice and sides.",
    tasteVector: { spicy: 5, sweet: 2, umami: 6, sour: 2, bitter: 1 }
  },
  {
    name: "Egg Curry",
    cuisine: "Indian",
    diet: "non-veg",
    description: "Boiled eggs cooked in spicy onion-tomato gravy.",
    tasteVector: { spicy: 6, sweet: 1, umami: 6, sour: 2, bitter: 0 }
  },
  {
    name: "Masala Dosa",
    cuisine: "Indian",
    diet: "veg",
    description: "Crispy dosa filled with spiced potato masala",
    tasteVector: { spicy: 3, sweet: 1, umami: 5, sour: 1, bitter: 0 }
  },
];


const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Dish.deleteMany();
  await Dish.insertMany(dishes);
  console.log("✅ Vijayawada dishes seeded");
  process.exit();
};

seed();
