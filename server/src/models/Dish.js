// Dish + taste vector schema

import mongoose from "mongoose";

const TasteVectorSchema = new mongoose.Schema(
  {
    sweet: { type: Number, required: true, min: 0, max: 10 },
    spicy: { type: Number, required: true, min: 0, max: 10 },
    umami: { type: Number, required: true, min: 0, max: 10 },
    sour: { type: Number, required: true, min: 0, max: 10 },
    bitter: { type: Number, required: true, min: 0, max: 10 },
  },
  { _id: false }
);

const DishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: String,

    tasteVector: {
      type: TasteVectorSchema,
      required: true,
    },

    cuisine: {
      type: String,
      required: true, // Indian, Japanese, etc
    },

    diet: {
      type: String,
      enum: ["veg", "non-veg", "vegan"],
      required: true,
    },

    imageUrl: String,

    keywords: [String], // ramen, spicy, noodles

    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },

    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Dish", DishSchema);
