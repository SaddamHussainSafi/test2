import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    api.get(`/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(console.error);
  }, [id]);

  if (!pet) return <p>Loading pet details...</p>;

  return (
    <div className="pet-details">
      <img src={pet.imagePath ? `http://localhost:8080/${pet.imagePath}` : pet.image_url} alt={pet.name} />
      <div>
        <h2>{pet.name}</h2>
        <p><b>Breed:</b> {pet.breed}</p>
        <p><b>Age:</b> {pet.age}</p>
        <p><b>Gender:</b> {pet.gender}</p>
        <p><b>Location:</b> {pet.location}</p>
        <p>{pet.description}</p>
        <button>Apply for Adoption</button>
      </div>
    </div>
  );
}

