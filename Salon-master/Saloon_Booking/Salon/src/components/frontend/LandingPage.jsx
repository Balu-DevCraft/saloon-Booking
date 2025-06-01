import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3 text-primary" href="/">
            ✂️CutAbout
          </a>
          <div className="d-flex">
            <button
              className="btn btn-outline-primary px-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mt-5 d-flex flex-column-reverse flex-md-row align-items-center justify-content-between">
        <div className="left-content text-center text-md-start">
          <h1 className="display-5 fw-bold mb-3 text-dark">
            Redefine Your Salon Experience
          </h1>
          <p className="lead text-secondary">
            CutAbout is your smart salon companion. Whether you're a customer
            seeking an appointment, a stylist managing your day, or an admin
            streamlining bookings — we make it seamless.
          </p>
          <p className="text-muted">
            Embrace the blend of heritage barbering and modern beauty tech.
            Effortless scheduling, expert stylists, and personalized care — all
            in one platform.
          </p>
          <button
            className="btn btn-primary px-4 py-2 mt-3"
            onClick={handleLogin}
          >
            Get Started
          </button>
        </div>

        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7 text-center mb-4 mb-md-3">
              <img
                src="https://images.unsplash.com/photo-1621607505833-616916c46a25?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Salon illustration"
                className="img-fluid w-100"
                style={{ maxWidth: "500px", borderRadius: "1rem" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mt-5 pt-5">
        <h3 className="text-center mb-4  text-dark">Why Choose CutAbout?</h3>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <div className="p-3 border rounded shadow-sm h-100">
              <h5>💇 Customer Booking</h5>
              <p className="text-muted">
                Easily book appointments and explore top-rated salons near you.
              </p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="p-3 border rounded shadow-sm h-100">
              <h5>✂️ Stylist Dashboard</h5>
              <p className="text-muted">
                Manage schedules, view bookings, and interact with clients
                smoothly.
              </p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="p-3 border rounded shadow-sm h-100">
              <h5>🛠️ Admin Control</h5>
              <p className="text-muted">
                Oversee salon operations, approve stylist accounts, and maintain
                quality service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-5 py-4 bg-light text-center text-muted">
        <small>
          © 2025 CutAbout — All rights reserved.
        </small>
      </footer>
    </div>
  );
};

export default LandingPage;
