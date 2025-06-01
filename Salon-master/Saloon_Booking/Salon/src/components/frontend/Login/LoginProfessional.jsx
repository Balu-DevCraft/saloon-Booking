import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginProfessional.css';

const LoginProfessional = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', formData);
      
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.tokens && response.data.tokens.accessToken) {
        // Store the tokens and user info
        localStorage.setItem('token', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userId', response.data.user._id);
        
        // Verify token was stored
        const storedToken = localStorage.getItem('token');
        console.log('Stored token:', storedToken);
        
        // Redirect based on role
        console.log('User type:', response.data.user.userType);
        
        if (response.data.user.userType === 'admin') {
          navigate('/dashboard/salon');
        } else if (response.data.user.userType === 'employee') {
          navigate('/dashboard/stylist');
        } else {
          setError('Invalid role type');
        }
      } else {
        console.error('Invalid response structure:', response.data);
        setError('Invalid server response structure');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.log('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-split-page-pro d-flex min-vh-100">
      {/* Left Section */}
      <div className="left-section-pro d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4">
        <h1 className="display-5 fw-bold">CutAbout Pro</h1>
        <p className="lead text-light">Salon Admins & Stylists Login</p>
        <button className="btn btn-outline-light mt-3" onClick={() => navigate("/login")}>
          ⬅ Back to Home
        </button>
      </div>

      {/* Right Section */}
      <div className="right-section-pro d-flex align-items-center justify-content-center w-100 p-4">
        <div className="login-form-card shadow p-4 bg-white rounded" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-dark mb-3 text-center">Professional Login</h3>
          <p className="text-muted text-center mb-4">Salon Admins and Stylists login below</p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-secondary w-100 mt-3" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center small">
            <p>
              Register{' '}
              <span
                className="text-info text-decoration-underline"
                role="button"
                onClick={() => navigate('/register/salon')}
              >
                Salon here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginProfessional;
