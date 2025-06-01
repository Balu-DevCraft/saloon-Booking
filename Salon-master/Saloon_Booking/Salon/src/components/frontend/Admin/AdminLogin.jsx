import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
// import axios from "axios"; // Uncomment for API integration

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Demo logic
    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }

    // Real API logic
    /*
    try {
      const res = await axios.post("/api/admin/login", { username, password });
      if (res.data.success) {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
    */
  };

  return (
    <div className="admin-login-page">
      <nav className="admin-navbar">
        <div className="navbar-brand">CutAbout Admin</div>
      </nav>

      <div className="admin-login-container">
        <form onSubmit={handleLogin} className="admin-login-form">
          <h2>Admin Login</h2>
          {error && <div className="error">{error}</div>}
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <footer className="admin-footer">
        <p>&copy; 2025 CutAbout. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
