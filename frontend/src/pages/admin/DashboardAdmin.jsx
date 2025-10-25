import React, { useState } from 'react';
import { Home, Users, Shield, Settings, LogOut, Search, Bell, Moon, Sun, Check, X, AlertTriangle, Database, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import "../../styles/Dashboard.css";

export default function DashboardAdmin() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock data
  const stats = {
    totalUsers: 1250,
    sheltersVerified: 45,
    activePets: 320,
    totalAdoptions: 180
  };

  const moderationQueue = [
    { id: 1, name: 'Fluffy Shelter', type: 'Shelter', reportedBy: 'User123', action: 'Verify' },
    { id: 2, name: 'Golden Retriever - Max', type: 'Pet', reportedBy: 'User456', action: 'Review' },
    { id: 3, name: 'Paws Rescue', type: 'Shelter', reportedBy: 'User789', action: 'Suspend' },
  ];

  const activityLogs = [
    'User John Doe logged in',
    'New pet added by Shelter ABC',
    'Adoption completed for Bella',
    'Shelter XYZ verified',
    'User report submitted',
  ];

  const growthData = [
    { month: 'Jan', users: 100, adoptions: 20 },
    { month: 'Feb', users: 150, adoptions: 25 },
    { month: 'Mar', users: 200, adoptions: 30 },
    { month: 'Apr', users: 280, adoptions: 40 },
    { month: 'May', users: 350, adoptions: 55 },
  ];

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
      backgroundColor: '#00a8a8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontWeight: 'bold',
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
    button: {
      backgroundColor: '#00a8a8',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '6px 12px',
      cursor: 'pointer',
      marginRight: '8px',
      transition: 'background 0.2s',
    },
    rejectButton: {
      backgroundColor: '#dc2626',
    },
    activityPanel: {
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      height: 'fit-content',
    },
    activityItem: {
      padding: '8px 0',
      borderBottom: '1px solid #eee',
      fontSize: '14px',
    },
    chartContainer: {
      height: '300px',
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      marginBottom: '24px',
    },
    toolsPanel: {
      backgroundColor: darkMode ? '#3d3d3d' : '#ffffff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    },
    toolButton: {
      width: '100%',
      backgroundColor: '#00a8a8',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '10px',
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
          <div style={styles.avatar}>A</div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontWeight: 'bold' }}>Admin</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Administrator</div>
            </div>
          )}
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItem}><Home size={20} /> {!sidebarCollapsed && 'Dashboard'}</div>
          <div style={styles.navItem}><Users size={20} /> {!sidebarCollapsed && 'Users'}</div>
          <div style={styles.navItem}><Shield size={20} /> {!sidebarCollapsed && 'Moderation'}</div>
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
            {!sidebarCollapsed && <input type="text" placeholder="Search users, pets..." style={{ border: 'none', background: 'transparent', outline: 'none' }} />}
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
          <div>
            <div style={styles.statsGrid} className="stats-grid">
              <div style={styles.card} className="card">
                <h3>👤 Total Users</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalUsers}</p>
              </div>
              <div style={styles.card} className="card">
                <h3>🏠 Shelters Verified</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>{stats.sheltersVerified}</p>
              </div>
              <div style={styles.card} className="card">
                <h3>🐕 Active Pets</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.activePets}</p>
              </div>
              <div style={styles.card} className="card">
                <h3>❤️ Total Adoptions</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00a8a8' }}>{stats.totalAdoptions}</p>
              </div>
            </div>

            {/* Moderation Queue */}
            <div style={styles.card}>
              <h3>Moderation Queue</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Reported By</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {moderationQueue.map(item => (
                    <tr key={item.id}>
                      <td style={styles.td}>{item.name}</td>
                      <td style={styles.td}>{item.type}</td>
                      <td style={styles.td}>{item.reportedBy}</td>
                      <td style={styles.td}>
                        <button style={styles.button} className="button"><Check size={14} /> Approve</button>
                        <button style={{ ...styles.button, ...styles.rejectButton }} className="button"><X size={14} /> Reject</button>
                        <button style={{ ...styles.button, backgroundColor: '#f59e0b' }} className="button"><AlertTriangle size={14} /> Suspend</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Analytics */}
            <div style={styles.chartContainer}>
              <h4>Growth Trends</h4>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#00a8a8" name="Users" />
                  <Line type="monotone" dataKey="adoptions" stroke="#f59e0b" name="Adoptions" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* System Tools */}
            <div style={styles.toolsPanel}>
              <h4>System Tools</h4>
              <button style={styles.toolButton} className="button"><Database size={16} /> Backup Database</button>
              <button style={styles.toolButton} className="button"><Shield size={16} /> Manage Roles</button>
              <button style={styles.toolButton} className="button"><Send size={16} /> Send Announcement</button>
            </div>
          </div>

          {/* Right Panel */}
          <div>
            <div style={styles.activityPanel}>
              <h4>Activity Logs</h4>
              {activityLogs.map((log, index) => (
                <div key={index} style={styles.activityItem}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
