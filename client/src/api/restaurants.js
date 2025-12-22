import api from "./axios";

export const getRestaurants = () => {
  return api.get("/restaurants");
};