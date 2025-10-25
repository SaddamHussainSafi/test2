import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Applications() {
  const { user } = useContext(AuthContext);

  // Mock data - replace with actual API calls
  const applications = [
    { id: 1, petName: 'Bella', status: 'Pending', appliedDate: '2025-10-15' },
    { id: 2, petName: 'Max', status: 'Approved', appliedDate: '2025-10-10' },
    { id: 3, petName: 'Luna', status: 'Adopted', appliedDate: '2025-10-05' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffc107';
      case 'Approved': return '#28a745';
      case 'Adopted': return '#6c757d';
      default: return '#6c757d';
    }
  };

  if (user?.role === 'shelter') {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Shelter Applications</h1>
        <p>View and manage adoption applications for your pets.</p>

        <div style={{ display: 'grid', gap: '15px' }}>
          {applications.map(app => (
            <div key={app.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>Application for {app.petName}</h3>
              <p><strong>Applicant:</strong> John Doe</p>
              <p><strong>Status:</strong>
                <span style={{
                  color: getStatusColor(app.status),
                  fontWeight: 'bold',
                  marginLeft: '5px'
                }}>
                  {app.status}
                </span>
              </p>
              <p><strong>Applied:</strong> {app.appliedDate}</p>
              <div style={{ marginTop: '10px' }}>
                <button style={{
                  padding: '5px 10px',
                  marginRight: '10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Approve
                </button>
                <button style={{
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>My Adoption Applications</h1>
      <p>Track the status of your pet adoption applications.</p>

      <div style={{ display: 'grid', gap: '15px' }}>
        {applications.map(app => (
          <div key={app.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>Application for {app.petName}</h3>
            <p><strong>Status:</strong>
              <span style={{
                color: getStatusColor(app.status),
                fontWeight: 'bold',
                marginLeft: '5px'
              }}>
                {app.status}
              </span>
            </p>
            <p><strong>Applied:</strong> {app.appliedDate}</p>
            {app.status === 'Approved' && (
              <p style={{ color: '#28a745', fontWeight: 'bold' }}>
                🎉 Congratulations! Your application has been approved.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}