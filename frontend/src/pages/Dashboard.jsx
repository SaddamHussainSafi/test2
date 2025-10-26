import React, { useEffect, useState } from "react";
import api from "../api/apiClient";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  const fetchMyPets = async () => {
    const res = await api.get("/pets/my-pets");
    setPets(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      await api.delete(`/pets/${id}`);
      setPets(pets.filter((p) => p.id !== id));
    }
  };

  useEffect(() => {
    fetchMyPets();
  }, []);

  return (
    <div className="dashboard">
      <h2>My Pets</h2>
      <button onClick={() => navigate("/add-pet")}>+ Add New Pet</button>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Species</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>
                {pet.imagePath && (
                  <img
                    src={`http://localhost:8080/${pet.imagePath}`}
                    alt={pet.name}
                    width="70"
                  />
                )}
              </td>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.age}</td>
              <td>
                <button onClick={() => navigate(`/edit-pet/${pet.id}`)}>Edit</button>
                <button onClick={() => handleDelete(pet.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

