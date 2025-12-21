import axios from "axios";

const OVERPASS_URLS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

export const fetchNearbyRestaurants = async (
  lat,
  lng,
  radiusMeters = 1500 // 🔥 reduced from 3000
) => {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="restaurant"](around:${radiusMeters},${lat},${lng});
      node["amenity"="fast_food"](around:${radiusMeters},${lat},${lng});
    );
    out body 30;
  `;

  for (const url of OVERPASS_URLS) {
    try {
      const res = await axios.post(url, query, {
        headers: { "Content-Type": "text/plain" },
        timeout: 25000,
      });

      return res.data.elements.map((el) => ({
        id: el.id,
        name: el.tags?.name || "Unnamed Restaurant",
        cuisine: el.tags?.cuisine || "Unknown",
        lat: el.lat,
        lng: el.lon,
      }));
    } catch (err) {
      console.warn(`Overpass failed on ${url}`);
    }
  }

  throw new Error("All Overpass endpoints failed");
};
