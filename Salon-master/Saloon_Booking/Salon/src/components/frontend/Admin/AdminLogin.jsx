import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('Attempting superadmin login with:', { email: formData.email });
      
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.tokens && response.data.tokens.accessToken) {
        // Verify if the user is a superadmin
        // if (response.data.user.userType !== 'superadmin') {
        //   setError('Access denied. Only superadmins can access this area.');
        //   return;
        // }

        // Clear any existing auth data
        localStorage.clear();
        
        // Store the tokens and user info
        localStorage.setItem('token', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userType', 'superadmin');
        localStorage.setItem('userId', response.data.user._id);

        // Verify token was stored
        const storedToken = localStorage.getItem('token');
        console.log('Stored token:', storedToken);
        
        if (storedToken) {
          console.log('Token stored successfully, redirecting to admin dashboard...');
          navigate('/admin/dashboard');
        } else {
          setError('Failed to store authentication token');
        }
      } else {
        setError('Invalid response from server');
        console.error('Invalid response structure:', response.data);
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <nav className="admin-navbar">
        <div className="navbar-brand">CutAbout Admin</div>
      </nav>

      <div className="admin-login-container">
        <form onSubmit={handleLogin} className="admin-login-form">
          <h2>Superadmin Login</h2>
          {error && <div className="error">{error}</div>}
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <footer className="admin-footer">
        <p>&copy; 2025 CutAbout. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
