import mongoose from "mongoose";

const RestaurantMenuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
  price: Number
});

export default mongoose.model("RestaurantMenu", RestaurantMenuSchema);
