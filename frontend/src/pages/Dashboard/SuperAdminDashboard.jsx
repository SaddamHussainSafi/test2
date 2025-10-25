import { useEffect, useState } from "react";
import { getSuperAdminDashboard } from "../../api/dashboardAPI";

export default function SuperAdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getSuperAdminDashboard().then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard superadmin">
      <h2>Super Admin Panel 🛠️</h2>
      <div className="stats-grid">
        <div className="card">Users: {data.totalUsers}</div>
        <div className="card">Shelters: {data.shelters}</div>
        <div className="card">Adopters: {data.adopters}</div>
        <div className="card">Pets: {data.totalPets}</div>
      </div>
      <button onClick={() => alert("Manage Users")}>Manage All Users</button>
      <button onClick={() => alert("Manage Pets")}>Manage All Pets</button>
      <button onClick={() => alert("View Logs")}>View System Logs</button>
    </div>
  );
}