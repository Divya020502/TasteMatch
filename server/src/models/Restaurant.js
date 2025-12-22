import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  lat: Number,
  lng: Number,
  address: String
});

export default mongoose.model("Restaurant", RestaurantSchema);
