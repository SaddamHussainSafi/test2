import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Show loading while checking authentication
  if (loading) return <div className="loading-screen">Loading...</div>;

  // If user is null after loading is complete, redirect to login
  if (user === null) return <Navigate to="/login" />;

  return children;
}