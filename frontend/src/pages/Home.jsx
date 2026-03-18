import React, { useEffect, useState } from "react";
import { getSchools } from "../services/api";
import SchoolCard from "../components/SchoolCard";
import Map from "../components/Map";
import "../styles/styles.css";

function Home() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getSchools().then((data) => setSchools(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px" }}>Real Holat — CivicLens</h1>
      </div>

      {/* Карта */}
      <div className="map-container" style={{ height: "400px", marginBottom: "40px" }}>
        <Map schools={schools} />
      </div>

      {/* Список школ */}
      <div>
        <h2>Organizations List</h2>
        {schools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </div>
  );
}

export default Home;
