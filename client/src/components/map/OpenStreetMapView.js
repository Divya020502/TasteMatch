// Map container
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OpenStreetMapView = ({ restaurants, center }) => {
  return (
    <MapContainer center={center} zoom={14} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {restaurants.map((r) => (
        <Marker key={r.placeId} position={[r.location.lat, r.location.lng]}>
          <Popup>
            <strong>{r.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OpenStreetMapView;
