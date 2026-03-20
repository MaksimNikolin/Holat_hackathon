import React, { useEffect, useState } from "react";
import { getDashboardStats, getProblematicSchools } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsData = await getDashboardStats();
        const schoolsData = await getProblematicSchools();
        setStats(statsData);
        setSchools(schoolsData);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading dashboard...</p>;

  if (!stats) return <p style={{ padding: "20px", color: "red" }}>Failed to load dashboard</p>;

  const problemRate = ((stats.problem_reports / stats.total_reports) * 100).toFixed(1);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Public Infrastructure Dashboard</h2>

      {}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", marginBottom: "40px" }}>
        {[
          { title: "Total Reports", value: stats.total_reports },
          { title: "Completed", value: stats.completed_reports },
          { title: "Problems", value: stats.problem_reports },
          { title: "Problem Rate", value: `${problemRate}%` },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              flex: 1,
              padding: "20px",
              borderRadius: "10px",
              background: "#f0f4f8",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", color: "#555" }}>{card.title}</h4>
            <p style={{ fontSize: "24px", margin: 0, fontWeight: "bold" }}>{card.value}</p>
          </div>
        ))}
      </div>

      {}
      <h3>Organizations with Problems</h3>
      {schools.length === 0 ? (
        <p>No problematic schools</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#ddd" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>School Name</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Problem Reports</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.school_id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{school.school_name}</td>
                <td style={{ padding: "10px", textAlign: "right" }}>{school.problem_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;