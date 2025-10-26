// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchCurrentUser } from "../utils/fetchUser";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, try to revalidate token and refresh user data from backend
    const init = async () => {
      const data = await fetchCurrentUser();
      if (data) {
        // make role lowercase for frontend convenience
        const normalized = { ...data };
        localStorage.setItem('user', JSON.stringify(normalized));
        setUser(normalized);
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = (userData, token) => {
    const normalizedUser = { ...userData };
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
    setUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

