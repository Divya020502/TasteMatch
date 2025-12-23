import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: String,
  cuisines: [String],
  address: String,
  lat: Number,
  lng: Number,
  menu: [String],
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
  }],
}, { timestamps: true });

export default mongoose.model("Restaurant", RestaurantSchema);
