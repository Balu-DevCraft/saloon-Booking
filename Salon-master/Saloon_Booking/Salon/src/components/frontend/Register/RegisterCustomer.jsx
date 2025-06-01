import React, { useState } from 'react';
import axios from 'axios'; // Uncommented axios import
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterCustomer.css';

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data) {
        setMessage('Registered successfully! Redirecting to login...');
        setTimeout(() => navigate('/login/customer'), 2000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1>Join CutAbout</h1>
        <p>Book appointments, explore salons, and enjoy a seamless beauty experience.</p>
      </div>

      <div className="register-right">
        <div className="form-box">
          <h2>Create Your Account</h2>
          <p className="subtext">Fill in your details to sign up</p>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {message && <div className="alert-box">{message}</div>}

            <button type="submit" className="register-btn">Register</button>

            <p className="login-link" onClick={() => navigate('/login/customer')}>
              Already have an account? <span>Back to Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCustomer;
