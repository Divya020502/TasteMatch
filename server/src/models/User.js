import mongoose from "mongoose";
import validator from "validator";

const TasteSchema = new mongoose.Schema(
  {
    sweet: { type: Number, min: 0, max: 10, default: 3 },
    spicy: { type: Number, min: 0, max: 10, default: 3 },
    umami: { type: Number, min: 0, max: 10, default: 3 },
    sour: { type: Number, min: 0, max: 10, default: 0 },
    bitter: { type: Number, min: 0, max: 10, default: 0 },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    passwordHash: { type: String, required: true },

    tasteProfile: { type: TasteSchema, default: () => ({}) },
    cuisines: [String],
    diet: { type: String, enum: ["veg", "non-veg", "vegan"] },

    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
