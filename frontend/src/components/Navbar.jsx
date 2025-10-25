import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchCurrentUser } from '../utils/fetchUser';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // don't auto-refresh on every user change - AuthProvider handles initial refresh

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: isScrolled ? '#f8f9fa' : 'rgba(248, 249, 250, 0.8)',
      backdropFilter: isScrolled ? 'none' : 'blur(10px)',
      padding: '10px',
      borderBottom: isScrolled ? '1px solid #ddd' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold', fontSize: '1.2rem' }}>
          🐾 Fur & Feathers
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Home</Link>
          <Link to="/pets" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Browse Pets</Link>
          <Link to="/about" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>About</Link>
          <Link to="/contact" style={{ marginRight: '20px', textDecoration: 'none', color: '#007bff' }}>Contact</Link>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#007bff'
              }}>
                <img src={user.picture || 'https://via.placeholder.com/32'} alt="Avatar" referrerPolicy="no-referrer" style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '10px' }} />
                <span>{user.name}</span>
              </button>
              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  zIndex: 1001
                }}>
                  <Link to="/dashboard" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#007bff' }}>Dashboard</Link>
                  <Link to="/manage-pets" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: '#007bff' }}>Manage Pets</Link>
                  <button onClick={() => { handleLogout(); setDropdownOpen(false); }} style={{ width: '100%', padding: '10px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', color: '#dc3545' }}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Login</Link>
              <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

