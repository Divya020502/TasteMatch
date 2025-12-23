import api from "./axios";

export const getRestaurants = () => {
  return api.get("/restaurants");
};

export const getRestaurantsByDish = (dishId) => {
  return api.get(`/restaurants/dish/${dishId}`);
};
