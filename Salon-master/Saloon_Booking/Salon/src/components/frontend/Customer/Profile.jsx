import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add request interceptor to add token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Request Headers:', config.headers);
      } else {
        console.log('No token found in localStorage');
      }
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('token');
      const userType = localStorage.getItem('userType');
      const userId = localStorage.getItem('userId');
      
      console.log('Current token:', token);
      console.log('User type:', userType);
      console.log('User ID:', userId);

      if (!token || userType !== 'customer' || !userId) {
        console.log('Invalid auth state - redirecting to login');
        navigate('/login/customer');
        return;
      }

      try {
        // Test token validity with auth/me endpoint
        const response = await api.get('/auth/me');
        console.log('Auth test response:', response);
        
        if (response.data && response.data.data) {
          setUserData({
            name: response.data.data.name || '',
            email: response.data.data.email || '',
            phone: response.data.data.phone || '',
          });
        } else {
          throw new Error('Invalid user data response');
        }
      } catch (err) {
        console.error('Auth test failed:', err);
        // Clear all auth data on error
        localStorage.clear();
        navigate('/login/customer');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
    setMessage('');
    setError('');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      console.log('Updating profile...');
      const response = await api.patch('/users/update-user', {
        name: userData.name,
        phone: userData.phone
      });

      if (response.data) {
        setMessage('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Profile update failed:', err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login/customer');
      } else {
        setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      }
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      console.log('Updating password...');
      const response = await api.post('/auth/reset-password', {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      });

      if (response.data) {
        setMessage('Password updated successfully!');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      console.error('Password update failed:', err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login/customer');
      } else {
        setError(err.response?.data?.message || 'Failed to update password. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.clear();
      navigate('/login/customer');
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold">CutAbout</span>
          <div className="d-flex gap-2">
            <button
              onClick={() => navigate('/dashboard/customer')}
              className="btn btn-outline-light"
            >
              ← Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-light text-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            {/* Profile Card */}
            <div className="card shadow border-0 mb-4">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <div className="bg-light rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-person-circle fs-1 text-primary"></i>
                  </div>
                  <h4 className="text-primary mb-1">{userData.name || 'Your Name'}</h4>
                  <p className="text-muted mb-0">{userData.email}</p>
                </div>

                <form onSubmit={handleUpdateProfile}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control bg-light"
                      value={userData.email}
                      disabled
                    />
                    <small className="text-muted">Email cannot be changed</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>

            {/* Password Change Card */}
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h5 className="card-title text-primary mb-4">Change Password</h5>
                <form onSubmit={handleUpdatePassword}>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      placeholder="Minimum 6 characters"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Update Password
                  </button>
                </form>
              </div>
            </div>

            {/* Messages */}
            {message && (
              <div className="alert alert-success mt-4 d-flex align-items-center fade show">
                <i className="bi bi-check-circle-fill me-2"></i>
                {message}
              </div>
            )}
            {error && (
              <div className="alert alert-danger mt-4 d-flex align-items-center fade show">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
