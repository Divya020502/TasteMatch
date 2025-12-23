// /api/places controller
import axios from "axios";
import { GOOGLE_MAPS_BASE_URL } from "../config/googleMaps.js";

export const getNearbyRestaurants = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Latitude and longitude required" });
    }

    const response = await axios.get(GOOGLE_MAPS_BASE_URL, {
      params: {
        location: `${lat},${lng}`,
        radius,
        type: "restaurant",
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    console.error("Google Maps API error:", error);
    res.status(500).json({ error: "Failed to fetch nearby restaurants" });
  }
};