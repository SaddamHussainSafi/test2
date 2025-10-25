import { useEffect, useState } from "react";
import { getAdopterDashboard } from "../../api/dashboardAPI";

export default function AdopterDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAdopterDashboard().then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Your Adoption Journey 🐶</h2>
      <section>
        <h3>Applications</h3>
        {data.applications?.map((a) => (
          <div key={a.id}>
            {a.petName} - {a.status}
          </div>
        ))}
      </section>
      <section>
        <h3>Favorites</h3>
        {data.favorites?.map((pet) => (
          <img key={pet.id} src={pet.imageUrl} alt={pet.name} />
        ))}
      </section>
    </div>
  );
}