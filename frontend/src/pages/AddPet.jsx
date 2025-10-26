import React, { useState, useEffect } from "react";
import api from "../api/apiClient";
import "../styles/AddPet.css";

const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Reptile", "Other"];
const breedOptions = {
  Dog: ["Labrador Retriever", "German Shepherd", "Bulldog", "Golden Retriever", "Beagle", "Mixed"],
  Cat: ["Persian", "Maine Coon", "Siamese", "Bengal", "Sphynx", "Mixed"],
  Bird: ["Parrot", "Cockatiel", "Finch", "Lovebird", "Canary", "Other"],
  Rabbit: ["Lionhead", "Holland Lop", "Mini Rex", "Flemish Giant", "Other"],
  Fish: ["Goldfish", "Betta", "Guppy", "Tetra", "Other"],
  Reptile: ["Iguana", "Bearded Dragon", "Snake", "Turtle", "Other"],
  Other: ["Mixed / Exotic"]
};
const genderOptions = ["Male", "Female"];
const locationOptions = [
  "Toronto, ON", "Mississauga, ON", "Brampton, ON", "Scarborough, ON", "Vaughan, ON",
  "London, ON", "Ottawa, ON", "Kitchener, ON", "Hamilton, ON", "Other"
];

function AddPet() {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    location: "",
    description: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files) {
      const selectedFiles = Array.from(files);
      setFormData({
        ...formData,
        images: selectedFiles,
      });

      // Create preview URLs
      const previews = selectedFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: newImages,
    });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // DEBUG: Verify token first
    const token = localStorage.getItem("token");
    console.log("=== TOKEN VERIFICATION ===");
    console.log("Token present:", !!token);
    if (token) {
      try {
        const verifyRes = await api.post("/auth/verify-token", { token });
        console.log("Token verification result:", verifyRes.data);
        if (verifyRes.data.status !== "valid") {
          alert("Token is invalid! Please log in again.");
          return;
        }
      } catch (err) {
        console.error("Token verification error:", err);
        alert("Could not verify token. Please log in again.");
        return;
      }
    }
    
    const data = new FormData();

    // Add only the required fields that the backend expects
    data.append('name', formData.name);
    data.append('breed', formData.breed);
    data.append('age', formData.age);
    data.append('description', formData.description);
    data.append('status', 'AVAILABLE');

    // Add multiple images
    formData.images.forEach((image, index) => {
      data.append('images', image);
    });

    try {
      console.log("Submitting pet form...");
      console.log("Token present:", !!token);
      console.log("Token:", token ? token.substring(0, 50) + "..." : "No token");
      
      const response = await api.post("/pets", data);
      console.log("Pet added successfully:", response.data);
      alert("Pet added successfully!");
      // Reset form
      setFormData({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        location: "",
        description: "",
        images: [],
      });
      // Clean up object URLs
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding pet:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error config:", error.config);
      alert("Failed to add pet. Please try again.");
    }
  };

  return (
    <div className="add-pet-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Add a New Pet</h1>
          <p className="hero-subtitle">Share your lovely pet to help them find a home 🐾</p>
        </div>
      </section>

      {/* Form Container */}
      <section className="form-section">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="pet-form">
            <div className="form-columns-container">
              {/* Column 1 */}
              <div className="form-column">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">🐕</span>
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Pet Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">🏷️</span>
                  Species *
                </label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Species</option>
                  {speciesOptions.map((sp) => (
                    <option key={sp} value={sp}>{sp}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">🐾</span>
                  Breed *
                </label>
                <select
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  disabled={!formData.species}
                  className="form-select"
                  required
                >
                  <option value="">Select Breed</option>
                  {formData.species &&
                    breedOptions[formData.species].map((br) => (
                      <option key={br} value={br}>{br}</option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📅</span>
                  Age (years) *
                </label>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="form-column">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">⚥</span>
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📍</span>
                  Location *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Location</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📸</span>
                  Upload Images *
                </label>
                <input
                  type="file"
                  name="images"
                  onChange={handleChange}
                  accept="image/*"
                  multiple
                  className="file-input"
                />

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="image-previews">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={preview} alt={`Preview ${index + 1}`} className="preview-image" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-image-btn"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📝</span>
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Add a short description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                />
              </div>
            </div>
            </div>

            {/* Button Section */}
            <div className="button-section">
              <button
                type="submit"
                className="submit-btn"
              >
                Add Pet
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddPet;