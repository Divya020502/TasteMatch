import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Navbar from "../../components/layout/Navbar";
import { getRestaurants } from "../../api/restaurants";
import "../../styles/mapView.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  /* 📍 Get user location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([
          pos.coords.longitude,
          pos.coords.latitude,
        ]);
      },
      () => {
        // Vijayawada fallback
        setUserLocation([80.6480, 16.5062]);
      }
    );
  }, []);

  /* 🍽 Load restaurants from DB */
  useEffect(() => {
    const load = async () => {
      const res = await getRestaurants();
      setRestaurants(res.data);
    };
    load();
  }, []);

  /* 🗺 Initialize Mapbox */
  useEffect(() => {
    if (!userLocation || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: userLocation,
      zoom: 13,
    });

    // Navigation controls
    mapRef.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    // User marker
    new mapboxgl.Marker({ color: "#2563eb" })
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(mapRef.current);

    // 🔥 Fix resize issue
    setTimeout(() => {
      mapRef.current.resize();
    }, 300);
  }, [userLocation]);

  /* 📍 Restaurant markers */
  useEffect(() => {
    if (!mapRef.current || restaurants.length === 0) return;

    restaurants.forEach((r) => {
      const popupHtml = `
        <div style="font-size:14px">
          <strong>${r.name}</strong><br/>
          ${r.address || ""}<br/>
          🍽 ${r.dishes?.join(", ") || ""}<br/><br/>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}"
            target="_blank"
            style="color:#2563eb;font-weight:bold;text-decoration:none"
          >
            🧭 Directions
          </a>
        </div>
      `;

      new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([r.lng, r.lat])
        .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
        .addTo(mapRef.current);
    });
  }, [restaurants]);

  return (
    <>
      <Navbar />

      <div className="map-page">
        <div className="map-header">
          <h2>🗺️ Best Restaurants Near You</h2>
          <p>Ranked by your taste preference and distance</p>
        </div>

        <div className="map-container" ref={mapContainerRef} />
      </div>
    </>
  );
};

export default MapView;
