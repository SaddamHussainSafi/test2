import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/dashboardAPI";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAdminDashboard().then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Admin Overview</h2>
      <div className="stats-grid">
        <div className="card">Total Users: {data.totalUsers}</div>
        <div className="card">Total Pets: {data.totalPets}</div>
        <div className="card">Adoptions: {data.totalAdoptions}</div>
      </div>
      <div className="logs">
        <h3>Recent Activity</h3>
        <ul>
          {data.recentActivity?.map((log, i) => (
            <li key={i}>{log.action}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}