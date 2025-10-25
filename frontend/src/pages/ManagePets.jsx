import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

export default function ManagePets() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Use a dedicated endpoint for user's pets (recommended)
        const response = await api.get('/pets/my-pets');
        const userPets = response.data.map(pet => ({
          ...pet,
          status: pet.status || 'available',
          applications: pet.applications || 0,
          addedDate: pet.addedDate || new Date().toISOString().split('T')[0]
        }));
        setPets(userPets);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchPets();
  }, [user]);

  const filteredPets = filter === 'all' ? pets : pets.filter(pet => pet.status === filter);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading pets...</div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#28a745';
      case 'adopted': return '#6c757d';
      case 'pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const handleStatusChange = async (petId, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('status', newStatus);
      await api.put(`/pets/${petId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setPets(pets.map(pet => pet.id === petId ? { ...pet, status: newStatus } : pet));
    } catch (error) {
      console.error('Error updating pet status:', error);
      alert('Failed to update pet status');
    }
  };

  const handleDelete = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await api.delete(`/pets/${petId}`);
        setPets(pets.filter(pet => pet.id !== petId));
      } catch (error) {
        console.error('Error deleting pet:', error);
        alert('Failed to delete pet');
      }
    }
  };

  if (user?.role !== 'shelter') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>Only shelter accounts can manage pets.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Manage Pets</h1>
        <Link
          to="/add-pet"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Add New Pet
        </Link>
      </div>

      {/* Filter Controls */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h3>Filter Pets</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <label>
            <input
              type="radio"
              name="filter"
              value="all"
              checked={filter === 'all'}
              onChange={(e) => setFilter(e.target.value)}
            />
            All Pets ({pets.length})
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="available"
              checked={filter === 'available'}
              onChange={(e) => setFilter(e.target.value)}
            />
            Available ({pets.filter(p => p.status === 'available').length})
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="pending"
              checked={filter === 'pending'}
              onChange={(e) => setFilter(e.target.value)}
            />
            Pending ({pets.filter(p => p.status === 'pending').length})
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="adopted"
              checked={filter === 'adopted'}
              onChange={(e) => setFilter(e.target.value)}
            />
            Adopted ({pets.filter(p => p.status === 'adopted').length})
          </label>
        </div>
      </div>

      {/* Pets Table */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Pet</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Species</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Applications</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Added</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map(pet => (
              <tr key={pet.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={pet.imagePath ? `http://localhost:8080/${pet.imagePath}` : pet.image}
                      alt={pet.name}
                      style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>{pet.name}</span>
                  </div>
                </td>
                <td style={{ padding: '15px' }}>{pet.type}</td>
                <td style={{ padding: '15px' }}>
                  <select
                    value={pet.status}
                    onChange={(e) => handleStatusChange(pet.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      backgroundColor: getStatusColor(pet.status),
                      color: 'white'
                    }}
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="adopted">Adopted</option>
                  </select>
                </td>
                <td style={{ padding: '15px' }}>{pet.applications}</td>
                <td style={{ padding: '15px' }}>{pet.addedDate}</td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button
                      onClick={() => navigate(`/edit-pet/${pet.id}`)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pet.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPets.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '50px',
            color: '#666'
          }}>
            <h3>No pets found</h3>
            <p>No pets match the selected filter.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginTop: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>
            {pets.filter(p => p.status === 'available').length}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Available Pets</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ffc107' }}>
            {pets.filter(p => p.status === 'pending').length}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Pending Adoption</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#6c757d' }}>
            {pets.filter(p => p.status === 'adopted').length}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Successfully Adopted</p>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
            {pets.reduce((sum, pet) => sum + pet.applications, 0)}
          </h3>
          <p style={{ margin: 0, color: '#666' }}>Total Applications</p>
        </div>
      </div>
    </div>
  );
}