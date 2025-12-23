import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import Navbar from "../../components/layout/Navbar";
import { getRestaurants } from "../../api/restaurants";
import { getDishById } from "../../api/dish";
import "../../styles/mapView.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [searchParams] = useSearchParams();

  const [userLocation, setUserLocation] = useState(null);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [dishName, setDishName] = useState(null);

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
      try {
        const res = await getRestaurants();
        setAllRestaurants(res.data);
      } catch (err) {
        console.error("Failed to load restaurants:", err);
      }
    };
    load();
  }, []);

  /* 🍽 Filter restaurants by dish */
  useEffect(() => {
    const dishParam = searchParams.get('dish');
    
    if (dishParam && allRestaurants.length > 0) {
      // Fetch dish details to get the name
      const fetchDishAndFilter = async () => {
        try {
          const dishRes = await getDishById(dishParam);
          const dish = dishRes.data;
          setDishName(dish.name);
          
          // Filter restaurants that have this dish in their menu
          const filtered = allRestaurants.filter(restaurant => 
            restaurant.menu && restaurant.menu.some(menuItem => 
              menuItem.toLowerCase() === dish.name.toLowerCase()
            )
          );
          setFilteredRestaurants(filtered);
        } catch (err) {
          console.error("Failed to fetch dish:", err);
          setFilteredRestaurants(allRestaurants);
        }
      };
      fetchDishAndFilter();
    } else {
      setDishName(null);
      setFilteredRestaurants(allRestaurants);
    }
  }, [searchParams, allRestaurants]);

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
    if (!mapRef.current || filteredRestaurants.length === 0) return;

    filteredRestaurants.forEach((r) => {
      const popupHtml = `
        <div style="font-size:14px">
          <strong>${r.name}</strong><br/>
          ${r.address || ""}<br/>
          🍽 ${r.menu?.join(", ") || ""}<br/><br/>
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
  }, [filteredRestaurants]);

  return (
    <>
      <Navbar />

      <div className="map-page">
        <div className="map-header">
          <h2>🗺️ {dishName ? `Restaurants Serving ${dishName}` : 'Best Restaurants Near You'}</h2>
          <p>{dishName ? 'Find restaurants that serve this specific dish' : 'Ranked by your taste preference and distance'}</p>
        </div>

        <div className="map-container" ref={mapContainerRef} />
      </div>
    </>
  );
};

export default MapView;
