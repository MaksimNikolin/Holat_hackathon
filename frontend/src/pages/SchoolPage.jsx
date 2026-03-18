import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSchoolDetail } from "../services/api";

function SchoolPage() {
  const { id } = useParams();
  const [school, setSchool] = useState(null);

  useEffect(() => {
    getSchoolDetail(id).then(setSchool);
  }, [id]);

  if (!school) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{school.name}</h1>

      <p>
        Coordinates: {school.latitude}, {school.longitude}
      </p>

      <h2>Promises</h2>

      <ul>
        {(school.promises || []).map((p) => (
          <li key={p.id}>
            {p.description} —{" "}
            {p.status === "Completed" ? "✔ Completed" : "❌ Not completed"}
          </li>
        ))}
      </ul>

      <button style={{ marginTop: "20px" }}>
        Submit Verification Report
      </button>
    </div>
  );
}

export default SchoolPage;