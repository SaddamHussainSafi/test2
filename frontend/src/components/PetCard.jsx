import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import "../App.css";

const PetCard = ({ pet, onDeleted }) => {
  const { user } = useContext(AuthContext);

  const placeholder = "https://place-puppy.com/300x300";
  const imgSrc = pet.imageUrl || (pet.imagePath ? `http://localhost:8080/${pet.imagePath}` : (pet.image || pet.image_url || placeholder));

  const truncateWords = (text, limit) => {
    if (!text) return "";
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= limit) return words.join(' ');
    return words.slice(0, limit).join(' ') + '...';
  };

  const descriptionText = pet.description || `${pet.breed || pet.category} looking for a home.`;
  const shortDesc = truncateWords(descriptionText, 10);

  return (
    <div className="pet-card-clean">
      <div className="pet-img-box">
        <img src={imgSrc} alt={pet.name} />
      </div>

      <div className="pet-info">
        <div className="pet-meta">
          <span className="pet-category">{pet.breed || pet.category || pet.species}</span>
          <span className="pet-dot">•</span>
          <span className="pet-age">{pet.age} years old</span>
        </div>

        <h3 className="pet-name">{pet.name}</h3>
  <p className="pet-desc">{shortDesc}</p>

        <div className="pet-footer">
          <span className="pet-location">{pet.location}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link to={`/pet/${pet.id}`} className="pet-btn-link">
              View Pet →
            </Link>
            {user && user.id === pet.owner?.id && (
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <Link to={`/edit-pet/${pet.id}`} className="pet-btn-link">Edit</Link>
                <button className="pet-delete-btn" onClick={async () => {
                  const ok = window.confirm('Are you sure you want to delete this pet? This cannot be undone.');
                  if (!ok) return;
                  try {
                    await api.delete(`/pets/${pet.id}`);
                    if (onDeleted) onDeleted(pet.id);
                    else window.location.reload();
                  } catch (err) {
                    if (err.response && err.response.status === 403) {
                      alert('You are not authorized to delete this pet');
                    } else {
                      console.error(err);
                      alert('Failed to delete pet');
                    }
                  }
                }}>Delete</button>
              </div>
            )}
            {user && user.id !== pet.owner?.id && (
              <button className="pet-favorite-btn">❤️</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;