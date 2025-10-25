import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Favorites() {
  const { user } = useContext(AuthContext);

  // Mock data - replace with actual API calls
  const favoritePets = [
    {
      id: 1,
      name: 'Bella',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '2 years',
      location: 'Happy Tails Shelter',
      image: 'https://via.placeholder.com/200x150?text=Bella',
      description: 'Friendly and energetic golden retriever looking for a loving home.'
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Cat',
      breed: 'Siamese',
      age: '1 year',
      location: 'City Animal Shelter',
      image: 'https://via.placeholder.com/200x150?text=Luna',
      description: 'Playful Siamese cat with beautiful blue eyes.'
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>My Favorite Pets</h1>
      <p>Pets you've saved for later. Keep track of the ones you love!</p>

      {favoritePets.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '50px',
          color: '#666',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <h3>No favorite pets yet</h3>
          <p>Start browsing pets and add them to your favorites!</p>
          <Link
            to="/pets"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              marginTop: '15px'
            }}
          >
            Browse Pets
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {favoritePets.map(pet => (
            <div key={pet.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <img
                src={pet.image}
                alt={pet.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{pet.name}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Species:</strong> {pet.species}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Breed:</strong> {pet.breed}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Age:</strong> {pet.age}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Location:</strong> {pet.location}
                </p>
                <p style={{ margin: '10px 0', color: '#555' }}>{pet.description}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <Link
                    to={`/pet/${pet.id}`}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '8px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    View Details
                  </Link>
                  <button
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      // Remove from favorites
                      console.log('Remove from favorites:', pet.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}