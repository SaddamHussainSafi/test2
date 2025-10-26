import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/apiClient';
import PetCard from '../components/PetCard';

const MyPets = () => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const response = await api.get('/pets/my-pets');
        setPets(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setError('Failed to load your pets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyPets();
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Please log in to view your pets</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading your pets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🐾</div>
        <div>{error}</div>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#fc6203',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>
        My Pets
      </h1>
      <p>
        Manage the pets you've added
      </p>

      {pets.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '50px',
          color: '#666',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          <h3>No pets found</h3>
          <p>
            You haven't added any pets yet. Start by adding your first pet!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPets;