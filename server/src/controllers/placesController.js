import { fetchNearbyRestaurants } from "../services/openStreetPlaces.js";

export const getNearbyRestaurants = async (req, res, next) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude required" });
    }

    const restaurants = await fetchNearbyRestaurants({
      lat,
      lng,
      radius,
    });

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};
