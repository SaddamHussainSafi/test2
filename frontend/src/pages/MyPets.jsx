import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import PetCard from '../components/PetCard';

const MyPets = () => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        let endpoint = '/pets/my-pets';

        // For shelters, get their owned pets
        if (user?.role === 'shelter') {
          endpoint = '/pets/my-pets';
        } else {
          // For adopters, get pets they've applied for or adopted
          endpoint = '/applications/my-applications';
        }

        const response = await api.get(endpoint);
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
        {user.role === 'shelter' ? 'My Shelter Pets' : 'My Pet Applications'}
      </h1>
      <p>
        {user.role === 'shelter'
          ? 'Manage the pets at your shelter'
          : 'Track your pet adoption applications and adopted pets'
        }
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
            {user.role === 'shelter'
              ? 'You haven\'t added any pets yet. Start by adding your first pet!'
              : 'You haven\'t applied for any pets yet. Browse available pets to get started!'
            }
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