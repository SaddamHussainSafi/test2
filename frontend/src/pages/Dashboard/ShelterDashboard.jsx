import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getShelterDashboard } from "../../api/dashboardAPI";
import StatsCard from "../../components/StatsCard";
import ChartBox from "../../components/ChartBox";

export default function ShelterDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getShelterDashboard().then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Welcome back, {stats.shelterName}!</h2>
      <button onClick={() => navigate("/add-pet")} style={{ marginBottom: "20px", padding: "10px 20px", backgroundColor: "#00a8a8", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        + Add New Pet
      </button>

      <div className="stats-grid">
        <StatsCard title="Total Pets" value={stats.totalPets} />
        <StatsCard title="Adopted Pets" value={stats.adoptedPets} />
        <StatsCard title="Pending Requests" value={stats.pendingRequests} />
        <StatsCard title="Profile Views" value={stats.views} />
      </div>

      <ChartBox data={stats.analytics} />
    </div>
  );
}