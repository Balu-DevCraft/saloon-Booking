import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Backend request library
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  // 🔒 Backend login request (commented)
  /*
  const handleLogin = async (role) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: 'sampleuser',
        password: 'samplepassword'
      });

      const { success, role } = response.data;

      if (success) {
        if (role === 'customer') {
          localStorage.setItem('customerUsername', 'sampleuser');
          navigate('/dashboard/customer');
        } else if (role === 'salon') {
          localStorage.setItem('salonUsername', 'sampleuser');
          navigate('/dashboard/salon');
        } else if (role === 'stylist') {
          localStorage.setItem('stylistUsername', 'sampleuser');
          navigate('/dashboard/stylist');
        } else {
          alert('Invalid role from server.');
        }
      } else {
        alert('Login failed. Check credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Try again later.');
    }
  };
  */

  return (
    <div className="login-selection-container d-flex flex-column flex-md-row">
      {/* Back Button */}
      <button
        className="btn btn position-absolute top-0 start-0 m-4 btn-sm"
        onClick={() => navigate('/')}
      >
        ⬅ Back
      </button>

      {/* Left Panel */}
      <div className="login-left d-flex flex-column justify-content-center align-items-start p-5">
        <h2 className="mb-5 fw-bold">Sign up/log in</h2>

        <div
          className="login-option w-100 mb-4 p-4 rounded border d-flex justify-content-between align-items-center"
          onClick={() => navigate('/login/customer')}
          // onClick={() => handleLogin('customer')} // Uncomment to test backend login
        >
          <div>
            <strong>CutAbout for customers</strong>
            <p className="mb-0 text-muted">Book salons and spas near you</p>
          </div>
          <span className="fs-4">→</span>
        </div>

        <div
          className="login-option w-100 p-4 rounded border d-flex justify-content-between align-items-center"
          onClick={() => navigate('/login/professional')}
          // onClick={() => handleLogin('salon')} // Uncomment to test backend login
        >
          <div>
            <strong>CutAbout for professionals</strong>
            <p className="mb-0 text-muted">Manage and grow your business</p>
          </div>
          <span className="fs-4">→</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right d-none d-md-block">
        <img
          src="https://images.unsplash.com/photo-1621607505833-616916c46a25?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login visual"
          className="img-fluid w-100 h-100 object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
