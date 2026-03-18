import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/styles.css";

const greenIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Map({ schools }) {
  const getIconByStatus = (promises = []) => {
    if (promises.length === 0) return yellowIcon;

    const completedCount = promises.filter((p) => p.status === "Completed").length;
    const problemCount = promises.filter((p) => p.status === "Problem").length;

    if (completedCount === promises.length) return greenIcon;
    if (problemCount === promises.length) return redIcon;
    return yellowIcon;
  };

  return (
    <MapContainer
      center={[41.2995, 69.2401]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {schools
        .filter((school) => school.latitude && school.longitude)
        .map((school) => (
          <Marker
            key={school.id}
            position={[school.latitude, school.longitude]}
            icon={getIconByStatus(school.promises)}
          >
            <Popup className="popup-content">
              <strong className="popup-title">{school.name}</strong>
              <ul className="popup-list">
                {(school.promises || []).map((p) => (
                  <li
                    key={p.id}
                    className={
                      p.status === "Completed"
                        ? "status-completed"
                        : p.status === "Problem"
                        ? "status-problem"
                        : "status-pending"
                    }
                  >
                    {p.description}: {p.status === "Completed" ? "✔" : p.status === "Problem" ? "✖" : "⏳"}
                  </li>
                ))}
              </ul>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default Map;
