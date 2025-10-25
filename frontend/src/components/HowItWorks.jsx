import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function HowItWorks() {
  const { user } = useContext(AuthContext);

  const getSteps = () => {
    const baseSteps = [
      {
        icon: '🔍',
        title: 'Browse Pets',
        description: 'Explore detailed profiles of pets available for adoption from verified shelters.',
        link: '/pets'
      },
      {
        icon: '❤️',
        title: 'Adopt & Stay Connected',
        description: 'Complete the adoption process and maintain a connection with your new furry friend.',
        link: user ? '/dashboard' : '/register'
      }
    ];

    // Insert the application step conditionally
    if (!user) {
      baseSteps.splice(1, 0, {
        icon: '📝',
        title: 'Apply Online',
        description: 'Submit your adoption application directly through our platform.',
        link: '/register'
      });
    } else {
      baseSteps.splice(1, 0, {
        icon: '📝',
        title: 'Submit Application',
        description: 'Apply for your chosen pet and track your application status.',
        link: '/dashboard'
      });
    }

    return baseSteps;
  };

  const steps = getSteps();

  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#46b5a7' }}>How It Works</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {steps.map((step, index) => (
            <div key={index} style={{
              backgroundColor: '#fff8ee',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{step.icon}</div>
              <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{step.title}</h3>
              <p style={{ margin: '0 0 20px 0', color: '#666', lineHeight: '1.6' }}>{step.description}</p>
              <Link to={step.link} style={{
                color: '#46b5a7',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}