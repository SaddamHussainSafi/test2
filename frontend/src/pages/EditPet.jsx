import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/apiClient";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({});

  useEffect(() => {
    api.get(`/pets/my-pets`).then((res) => {
      const found = res.data.find((p) => p.id === parseInt(id));
      if (found) setPet(found);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPet({ ...pet, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(pet).forEach(([k, v]) => formData.append(k, v));

    await api.put(`/pets/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Pet updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <h2>Edit Pet</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={pet.name || ""} onChange={handleChange} placeholder="Name" />
        <input name="species" value={pet.species || ""} onChange={handleChange} placeholder="Species" />
        <input name="breed" value={pet.breed || ""} onChange={handleChange} placeholder="Breed" />
        <input name="age" value={pet.age || ""} onChange={handleChange} placeholder="Age" />
        <input name="gender" value={pet.gender || ""} onChange={handleChange} placeholder="Gender" />
        <input name="location" value={pet.location || ""} onChange={handleChange} placeholder="Location" />
        <textarea name="description" value={pet.description || ""} onChange={handleChange} />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPet;