import React, { useState } from "react";
import { createReport } from "../services/api";

export default function ReportForm({ school, onSuccess }) {
  const [status, setStatus] = useState("Completed");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    const urls = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
    setPhotos(urls);
  };

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
      if (onSuccess) onSuccess(report);
      setComment("");
      setStatus("Completed");
      setPhotos([]);
      alert("Report submitted successfully!");
    } catch {
      alert("Failed to submit report");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Submit a Report for {school.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="Completed">✔ Completed</option>
            <option value="Problem">✖ Problem</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Comment:</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe the issue..."
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Photos:</label>
          <input type="file" multiple onChange={handleFileChange} className="mt-1" />
        </div>

        {photos.length > 0 && (
          <ul className="list-disc pl-5 text-sm">
            {photos.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}