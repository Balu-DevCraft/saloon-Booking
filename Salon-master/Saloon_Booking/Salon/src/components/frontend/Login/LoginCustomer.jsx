import React, { useState } from 'react';
import './LoginCustomer.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginCustomer = () => {
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
      console.log('Attempting login with:', { email: formData.email });
      
      const response = await axios.post('http://localhost:8080/auth/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.tokens && response.data.tokens.accessToken) {
        // Clear any existing auth data
        localStorage.clear();
        
        // Store the new tokens and user info
        localStorage.setItem('token', response.data.tokens.accessToken);
        localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userType', 'customer');
        localStorage.setItem('userId', response.data.user._id);

        // Verify token was stored
        const storedToken = localStorage.getItem('token');
        console.log('Stored token:', storedToken);
        
        if (storedToken) {
          console.log('Token stored successfully, redirecting to dashboard...');
          navigate('/dashboard/customer');
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
    <div className="login-split-page d-flex min-vh-100">
      {/* Left section */}
      <div className="left-section d-none d-md-flex flex-column justify-content-center align-items-center text-white p-4">
        <h1 className="display-4 fw-bold">Welcome to CutAbout</h1>
        <p className="lead">Your grooming, just a click away.</p>
      </div>

      {/* Right section - form */}
      <div className="right-section d-flex align-items-center justify-content-center w-100 p-4">
        <div className="login-form-card shadow p-4 bg-white rounded" style={{ width: '100%', maxWidth: '400px' }}>
          <h3 className="text-dark mb-3 text-center">Customer Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
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
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-secondary w-100 mt-4" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center small">
            <p>
              New user?{' '}
              <span
                className="text-info text-decoration-underline"
                role="button"
                onClick={() => navigate('/register/customer')}
              >
                Register here
              </span>
            </p>
            <p className="mt-2">
              <span
                className="text-secondary text-decoration-underline"
                role="button"
                onClick={() => navigate('/login')}
              >
                ⬅ Back to Role Selection
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCustomer;
