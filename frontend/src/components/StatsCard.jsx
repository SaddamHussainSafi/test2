export default function StatsCard({ title, value, icon }) {
  return (
    <div className="stats-card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}