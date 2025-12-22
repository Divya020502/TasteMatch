import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Navbar from "../../components/layout/Navbar";
import { getRestaurants } from "../../api/restaurants";
import "../../styles/mapView.css";

/* 🔧 Fix Leaflet default icon issue */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* 🔥 IMPORTANT: Force Leaflet to recalc size */
const FixMapResize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
};

const MapView = () => {
  const [position, setPosition] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  /* 📍 Get user location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      () => {
        // Vijayawada fallback
        setPosition([16.5062, 80.6480]);
      }
    );
  }, []);

  /* 🍽️ Load restaurants from MongoDB */
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const res = await getRestaurants();
        setRestaurants(res.data);
      } catch (err) {
        console.error("Failed to load restaurants", err);
      }
    };
    loadRestaurants();
  }, []);

  if (!position) {
    return <p>Loading map...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="map-page">
        <div className="map-title">
          <h2>🗺️ Best Restaurants Near You</h2>
          <p>Ranked by your taste preference and distance</p>
        </div>

        <div className="map-container">
          <MapContainer
            center={position}
            zoom={14}
            style={{ width: "100%", height: "100%" }}
          >
            <FixMapResize />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* 👤 User marker */}
            <Marker position={position}>
              <Popup>You are here</Popup>
            </Marker>

            {/* 🍴 Restaurant markers */}
            {restaurants.map((r) => (
              <Marker key={r._id} position={[r.lat, r.lng]}>
                <Popup>
                  <strong>{r.name}</strong>
                  <br />
                  {r.address}
                  <br />
                  🍽 {r.dishes?.join(", ")}
                  <br />
                  <br />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "6px 10px",
                      background: "#2563eb",
                      color: "#fff",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    🧭 Directions
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default MapView;
