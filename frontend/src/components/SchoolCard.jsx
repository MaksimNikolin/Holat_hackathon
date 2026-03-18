import React, { useState } from "react";
import { createReport } from "../services/api";

export default function SchoolCard({ school, onReportSuccess }) {
  const [status, setStatus] = useState("Completed");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => setPhotos(Array.from(e.target.files).map(f => URL.createObjectURL(f)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const report = await createReport({ school_id: school.id, status, comment });
      for (const url of photos) {
        await fetch(`http://localhost:8000/reports/photos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ report_id: report.id, photo_url: url }),
        });
      }
      if (onReportSuccess) onReportSuccess(report);
      setStatus("Completed"); setComment(""); setPhotos([]);
      alert("Report submitted successfully!");
    } catch { alert("Failed to submit report"); }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-md mb-4">
      <h3 className="text-blue-600 font-semibold mb-2">{school.name}</h3>
      <ul className="mb-3 space-y-1">
        {(school.promises || []).map((p) => (
          <li
            key={p.id}
            className={`text-sm font-medium ${
              p.status === "Completed" ? "text-green-600" : p.status === "Problem" ? "text-red-600" : "text-yellow-600"
            }`}
          >
            {p.description} {p.status === "Completed" ? "✔" : p.status === "Problem" ? "✖" : "⏳"}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded-md">
          <option value="Completed">✔ Completed</option>
          <option value="Problem">✖ Problem</option>
        </select>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Describe the issue..."
          className="w-full p-2 border rounded-md"
        />
        <input type="file" multiple onChange={handleFileChange} className="w-full" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Submit Review
        </button>
      </form>
    </div>
  );
}