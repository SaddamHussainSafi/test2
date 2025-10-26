import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
import api from "../api/apiClient";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting registration with:", { name, email, password: "***" });
      const response = await api.post("/auth/signup", { name, email, password });
      console.log("Registration response:", response.data);
      if (response.data.status === "success") {
        login(response.data.user, response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = (user, token) => {
    login(user, token);
    navigate("/dashboard");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>

      {error && <div style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "5px" }}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "15px"
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <span>or</span>
      </div>

      <GoogleLoginButton onLogin={handleGoogleLogin} />

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Already have an account? <Link to="/login" style={{ color: "#007bff" }}>Login</Link></p>
      </div>
    </div>
  );
}