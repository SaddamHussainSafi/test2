import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    bio: '',
    // Shelter-specific fields
    shelterName: '',
    website: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const isShelter = user?.role === 'shelter';

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{isShelter ? 'Shelter Settings' : 'My Profile'}</h1>

      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Profile Information</h2>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: isEditing ? '#28a745' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {/* Basic Info */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            ) : (
              <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                {formData.name}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            ) : (
              <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                {formData.email}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone:</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            ) : (
              <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                {formData.phone || 'Not provided'}
              </p>
            )}
          </div>

          {/* Shelter-specific fields */}
          {isShelter && (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Shelter Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="shelterName"
                    value={formData.shelterName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    {formData.shelterName || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Website:</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    {formData.website || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    {formData.description || 'No description provided'}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Adopter-specific fields */}
          {!isShelter && (
            <>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address:</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    {formData.address || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Bio:</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about yourself and what kind of pet you're looking for..."
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p style={{ margin: 0, padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                    {formData.bio || 'No bio provided'}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {isEditing && (
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}