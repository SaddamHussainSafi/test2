import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#333', color: 'white', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px', color: '#46b5a7' }}>Fur & Feathers</h3>
          <p style={{ lineHeight: '1.6', opacity: '0.8' }}>
            Building a kinder adoption network.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: '250px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/pets" style={{ color: 'white', textDecoration: 'none' }}>Browse Pets</Link></li>
            <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link></li>
            <li><Link to="/register?shelter" style={{ color: 'white', textDecoration: 'none' }}>Join as Shelter</Link></li>
          </ul>
        </div>
        <div style={{ flex: 1, minWidth: '250px', marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Contact Us</h4>
          <p>Email: info@furandfeathers.com</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>📘</a>
            <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>🐦</a>
            <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>📷</a>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid #555', paddingTop: '20px', marginTop: '20px' }}>
        © 2025 Fur & Feathers. All rights reserved.
      </div>
    </footer>
  );
}

