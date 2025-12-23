import Restaurant from "../models/Restaurant.js";

export const getAllRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
};

export const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};

export const createRestaurant = async (req, res) => {
  const { name, location, dishes } = req.body;
  const newRestaurant = new Restaurant({ name, location, dishes });
  const savedRestaurant = await newRestaurant.save();
  res.status(201).json(savedRestaurant);
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, location, dishes } = req.body;
  const updatedRestaurant = await Restaurant.findByIdAndUpdate(
    id,
    { name, location, dishes },
    { new: true }
  );
  if (updatedRestaurant) {
    res.json(updatedRestaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
  if (deletedRestaurant) {
    res.json({ message: "Restaurant deleted successfully" });
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};  

export const getRestaurantsByDish = async (req, res) => {
  const { dishId } = req.params;
  const restaurants = await Restaurant.find({ dishes: dishId });
  res.json(restaurants);
};