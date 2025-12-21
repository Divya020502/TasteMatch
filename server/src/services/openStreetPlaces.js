import axios from "axios";

/**
 * Fetch nearby restaurants using Overpass API
 */
export const fetchNearbyRestaurants = async ({
  lat,
  lng,
  radius = 2000,
}) => {
  const query = `
    [out:json];
    (
      node["amenity"="restaurant"](around:${radius},${lat},${lng});
      way["amenity"="restaurant"](around:${radius},${lat},${lng});
      relation["amenity"="restaurant"](around:${radius},${lat},${lng});
    );
    out center tags;
  `;

  const response = await axios.post(
    "https://overpass-api.de/api/interpreter",
    query,
    { headers: { "Content-Type": "text/plain" } }
  );

  return response.data.elements.map((place) => ({
    placeId: place.id,
    name: place.tags?.name || "Unnamed Restaurant",
    cuisine: place.tags?.cuisine,
    location: {
      lat: place.lat || place.center?.lat,
      lng: place.lon || place.center?.lon,
    },
    address: place.tags?.addr?.street || "",
  }));
};
