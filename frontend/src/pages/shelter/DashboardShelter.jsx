import React, { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../../utils/fetchUser';
import { Home, Users, MessageSquare, Settings, LogOut, Search, Bell, Moon, Sun, Plus, Eye, TrendingUp, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import "../../styles/Dashboard.css";

export default function DashboardShelter() {
  const [user, setUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock data
  const stats = {
    totalPets: 45,
    adoptedPets: 12,
    pendingRequests: 8,
    profileViews: 234
  };

  const applications = [
    { id: 1, petName: 'Bella', adopterName: 'John Doe', date: '2023-10-15', status: 'Pending' },
    { id: 2, petName: 'Max', adopterName: 'Jane Smith', date: '2023-10-14', status: 'Approved' },
    { id: 3, petName: 'Charlie', adopterName: 'Bob Johnson', date: '2023-10-13', status: 'Rejected' },
  ];

  const adoptionData = [
    { week: 'Week 1', adoptions: 2 },
    { week: 'Week 2', adoptions: 5 },
    { week: 'Week 3', adoptions: 3 },
    { week: 'Week 4', adoptions: 7 },
  ];

  const petViewsData = [
    { pet: 'Bella', views: 45 },
    { pet: 'Max', views: 32 },
    { pet: 'Charlie', views: 28 },
    { pet: 'Luna', views: 50 },
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
      display: 'grid',
      gridTemplateColumns: '3fr 1fr',
      gap: '24px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    },
    card: {
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    },
    th: {
      backgroundColor: darkMode ? '#2d2d2d' : '#f9fafb',
      padding: '12px',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #eee',
    },
    badge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    pendingBadge: { backgroundColor: '#fef3c7', color: '#d97706' },
    approvedBadge: { backgroundColor: '#d1fae5', color: '#065f46' },
    rejectedBadge: { backgroundColor: '#fee2e2', color: '#dc2626' },
    quickActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    button: {
      backgroundColor: '#00a8a8',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    chartContainer: {
      height: '300px',
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    },
  };

  return (
    <div style={styles.container} className="dashboard-container">
      <Toaster />
      {/* Sidebar */}
      <div style={styles.sidebar} className="sidebar">
        <div style={styles.sidebarHeader}>
          <span style={styles.logo}>🐾 Fur & Feathers</span>
        </div>
        <div style={styles.userCard}>
          <img src={user.picture || "https://via.placeholder.com/40"} alt={user.name} style={styles.avatar} />
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontWeight: 'bold' }}>{user.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Shelter</div>
            </div>
          )}
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItem}><Home size={20} /> {!sidebarCollapsed && 'Dashboard'}</div>
          <div style={styles.navItem}><Users size={20} /> {!sidebarCollapsed && 'Manage Pets'}</div>
          <div style={styles.navItem}><MessageSquare size={20} /> {!sidebarCollapsed && 'Messages'}</div>
          <div style={styles.navItem}><Settings size={20} /> {!sidebarCollapsed && 'Settings'}</div>
        </nav>
        <div style={styles.logout}><LogOut size={20} /> {!sidebarCollapsed && 'Logout'}</div>
      </div>

      {/* Main Content */}
      <div style={styles.main} className="main">
        {/* Navbar */}
        <div style={styles.navbar}>
          <div style={styles.searchBar}>
            <Search size={16} />
            {!sidebarCollapsed && <input type="text" placeholder="Search..." style={{ border: 'none', background: 'transparent', outline: 'none' }} />}
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
        <div style={styles.content} className="content">
          <div>
            <div style={styles.statsGrid} className="stats-grid">
              <div style={styles.card} className="card">
                <h3>🐾 Total Pets Listed</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalPets}</p>
              </div>
              <div style={styles.card} className="card">
                <h3>✅ Pets Adopted</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>{stats.adoptedPets}</p>
              </div>
              <div style={styles.card} className="card">
                <h3>📥 Pending Requests</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'orange' }}>{stats.pendingRequests}</p>
              </div>
              <div style={styles.card} className="card">
                <h3>👁️ Profile Views</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.profileViews}</p>
              </div>
            </div>

            {/* Applications Table */}
            <div style={styles.card} className="card">
              <h3>Recent Applications</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Pet Name</th>
                    <th style={styles.th}>Adopter Name</th>
                    <th style={styles.th}>Date Applied</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td style={styles.td}>{app.petName}</td>
                      <td style={styles.td}>{app.adopterName}</td>
                      <td style={styles.td}>{app.date}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, ...(app.status === 'Pending' ? styles.pendingBadge : app.status === 'Approved' ? styles.approvedBadge : styles.rejectedBadge) }}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
              <div style={styles.chartContainer}>
                <h4>Adoptions per Week</h4>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={adoptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="adoptions" stroke="#00a8a8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={styles.chartContainer}>
                <h4>Most Viewed Pets</h4>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={petViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="pet" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#00a8a8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div style={styles.quickActions}>
            <div style={styles.card}>
              <h4>Quick Actions</h4>
              <button style={styles.button} className="button"><Plus size={16} /> Add New Pet</button>
              <button style={{ ...styles.button, marginTop: '10px' }} className="button"><MessageSquare size={16} /> View Messages</button>
            </div>
            <div style={styles.card}>
              <h4>Notifications</h4>
              <p>New adoption request for Bella</p>
              <p>Profile viewed 5 times today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
