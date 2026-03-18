const API_URL = "http://127.0.0.1:8000";

export const getSchools = async () => {
  const res = await fetch(`${API_URL}/schools/`);
  if (!res.ok) throw new Error("Failed to fetch schools");
  return res.json();
};

export const getSchoolDetail = async (schoolId) => {
  const res = await fetch(`${API_URL}/schools/${schoolId}`);
  if (!res.ok) throw new Error("Failed to fetch school");
  return res.json();
};

export const getReports = async () => {
  const res = await fetch(`${API_URL}/reports/`);
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
};

export const createReport = async (reportData) => {
  const res = await fetch(`${API_URL}/reports/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reportData)
  });

  if (!res.ok) throw new Error("Failed to create report");
  return res.json();
};

export const getReportPhotos = async (reportId) => {
  const res = await fetch(`${API_URL}/reports/photos/${reportId}`);
  if (!res.ok) throw new Error("Failed to fetch report photos");
  return res.json();
};

export const getDashboardStats = async () => {
  const res = await fetch(`${API_URL}/dashboard/stats`);
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return res.json();
};

export const getProblematicSchools = async () => {
  const res = await fetch(`${API_URL}/dashboard/problematic_schools`);
  if (!res.ok) throw new Error("Failed to fetch problematic schools");
  return res.json();
};

export default {
  getSchools,
  getSchoolDetail,
  getReports,
  createReport,
  getReportPhotos,
  getDashboardStats,
  getProblematicSchools
};