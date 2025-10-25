import React, { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../../utils/fetchUser';
import { Home, Heart, MessageSquare, Settings, LogOut, Search, Bell, Moon, Sun, Eye } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import "../../styles/Dashboard.css";

export default function DashboardAdopter() {
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock data
  const applications = [
    { id: 1, petName: 'Bella', shelterName: 'Happy Tails Shelter', status: 'Applied', progress: 33 },
    { id: 2, petName: 'Max', shelterName: 'Paws & Claws', status: 'Approved', progress: 66 },
    { id: 3, petName: 'Luna', shelterName: 'Furry Friends', status: 'Adopted', progress: 100 },
  ];

  const favorites = [
    { id: 1, name: 'Charlie', breed: 'Golden Retriever', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Daisy', breed: 'Beagle', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Buddy', breed: 'Labrador', image: 'https://via.placeholder.com/150' },
  ];

  const messages = [
    { id: 1, from: 'Happy Tails Shelter', message: 'Your application for Bella has been received!', unread: true },
    { id: 2, from: 'Paws & Claws', message: 'Congratulations! Max is ready for adoption.', unread: false },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchCurrentUser().then((latest) => latest && setUser(latest));
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleTheme = () => setDarkMode(!darkMode);

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: darkMode ? '#1a1a1a' : '#f9fafb',
      color: darkMode ? '#ffffff' : '#000000',
    },
    sidebar: {
      width: sidebarCollapsed ? '60px' : '250px',
      backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      zIndex: 1000,
    },
    sidebarHeader: {
      padding: '20px',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#00a8a8',
    },
    userCard: {
      padding: '20px',
      borderBottom: '1px solid #eee',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    nav: {
      flex: 1,
      padding: '20px 0',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px 20px',
      cursor: 'pointer',
      transition: 'background 0.2s',
      gap: '10px',
    },
    logout: {
      padding: '20px',
      borderTop: '1px solid #eee',
      cursor: 'pointer',
    },
    main: {
      flex: 1,
      marginLeft: sidebarCollapsed ? '60px' : '250px',
      display: 'flex',
      flexDirection: 'column',
    },
    navbar: {
      backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    searchBar: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: darkMode ? '#3d3d3d' : '#f0f0f0',
      borderRadius: '20px',
      padding: '5px 15px',
      gap: '10px',
    },
    navbarRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    content: {
      padding: '24px',
    },
    hero: {
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    },
    progressSection: {
      marginBottom: '24px',
    },
    applicationCard: {
      backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progressBar: {
      width: '200px',
      height: '8px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    progressFill: (progress) => ({
      width: `${progress}%`,
      height: '100%',
      backgroundColor: '#00a8a8',
      transition: 'width 0.3s ease',
    }),
    favoritesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    petCard: {
      backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      textAlign: 'center',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    petImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '8px',
    },
    messagesPanel: {
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    },
    messageItem: {
      padding: '12px 0',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    unreadDot: {
      width: '8px',
      height: '8px',
      backgroundColor: '#00a8a8',
      borderRadius: '50%',
    },
    button: {
      backgroundColor: '#00a8a8',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
  };

  return (
    <div style={styles.container} className="dashboard-container">
      <Toaster />
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={styles.logo}>🐾 Fur & Feathers</span>
        </div>
        <div style={styles.userCard}>
          <img src={user.picture || "https://via.placeholder.com/40"} alt={user.name} style={styles.avatar} />
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontWeight: 'bold' }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Adopter</div>
            </div>
          )}
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItem}><Home size={20} /> {!sidebarCollapsed && 'Dashboard'}</div>
          <div style={styles.navItem}><Heart size={20} /> {!sidebarCollapsed && 'Favorites'}</div>
          <div style={styles.navItem}><MessageSquare size={20} /> {!sidebarCollapsed && 'Messages'}</div>
          <div style={styles.navItem}><Settings size={20} /> {!sidebarCollapsed && 'Settings'}</div>
        </nav>
        <div style={styles.logout}><LogOut size={20} /> {!sidebarCollapsed && 'Logout'}</div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Navbar */}
        <div style={styles.navbar}>
          <div style={styles.searchBar}>
            <Search size={16} />
            {!sidebarCollapsed && <input type="text" placeholder="Search pets..." style={{ border: 'none', background: 'transparent', outline: 'none' }} />}
          </div>
          <div style={styles.navbarRight}>
            <Bell size={20} />
            <div onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <div>Profile ▼</div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Hero Section */}
          <div style={styles.hero}>
            <h2>Welcome back, {user.name}! 🐶</h2>
            <p>Here's your adoption journey. Keep applying and find your perfect furry friend!</p>
          </div>

          {/* Applications Progress */}
          <div style={styles.progressSection}>
            <h3>Your Applications</h3>
            {applications.map(app => (
              <div key={app.id} style={styles.applicationCard}>
                <div>
                  <h4>{app.petName}</h4>
                  <p>{app.shelterName}</p>
                  <p>Status: {app.status}</p>
                </div>
                <div style={styles.progressBar}>
                  <div style={styles.progressFill(app.progress)}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Favorites Grid */}
          <div style={styles.favoritesGrid} className="favorites-grid">
            <h3>Your Favorites</h3>
            {favorites.map(pet => (
              <div key={pet.id} style={styles.petCard} className="pet-card" onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                <img src={pet.image} alt={pet.name} style={styles.petImage} />
                <h4>{pet.name}</h4>
                <p>{pet.breed}</p>
                <button style={styles.button} className="button"><Eye size={14} /> View Details</button>
              </div>
            ))}
          </div>

          {/* Messages & Updates */}
          <div style={styles.messagesPanel}>
            <h3>Messages & Updates</h3>
            {messages.map(msg => (
              <div key={msg.id} style={styles.messageItem}>
                <div>
                  <strong>{msg.from}</strong>
                  <p>{msg.message}</p>
                </div>
                {msg.unread && <div style={styles.unreadDot}></div>}
              </div>
            ))}
            <p style={{ marginTop: '16px', fontStyle: 'italic' }}>Your request for Bella is approved! 🎉</p>
          </div>
        </div>
      </div>
    </div>
  );
}
