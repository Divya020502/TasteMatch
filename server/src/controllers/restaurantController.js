import Restaurant from "../models/Restaurant.js";

export const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};
