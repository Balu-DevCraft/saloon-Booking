import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerDashboard.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaInfoCircle, FaUser, FaEnvelope, FaPhone, FaSearch, FaLocationArrow } from 'react-icons/fa';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [saloons, setSaloons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // Setup axios default config
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/customer');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [navigate]);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          // Search saloons near the user's location
          searchSaloons("", "", position.coords.latitude.toString(), position.coords.longitude.toString());
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Could not get your location. Please try searching by city.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  // Search saloons by location
  const searchSaloons = async (city, place, latitude, longitude) => {
    try {
      setLoading(true);
      setError("");
      
      let url = 'http://localhost:8080/saloon/by-location?';
      const params = new URLSearchParams();
      
      if (city) params.append('city', city);
      if (place) params.append('place', place);
      if (latitude) params.append('latitude', latitude);
      if (longitude) params.append('longitude', longitude);
      
      const response = await axios.get(url + params.toString());
      setSaloons(response.data.data);
    } catch (err) {
      console.error("Failed to fetch saloons:", err);
      setError("Failed to load saloons. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchSaloons(searchCity, searchPlace);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login/customer');
  };

  return (
    <div className="customer-dashboard">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">CutAbout</Link>
          <div className="nav-links">
            <Link to="/customer/profile">
              <FaUser className="me-1" /> Profile
            </Link>
            <Link to="/customer/bookings">
              <FaCalendarAlt className="me-1" /> My Bookings
            </Link>
            <span onClick={handleLogout} className="logout-btn">Logout</span>
          </div>
        </div>
      </nav>

      <div className="hero">
        <h1>Find Your Perfect Salon</h1>
        <p>Discover and book the best salons near you</p>
      </div>

      <div className="search-section container">
        <div className="search-box">
          <form onSubmit={handleSearch} className="search-form">
            <div className="input-group">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                placeholder="Enter City"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="input-group">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Enter Area/Place"
                value={searchPlace}
                onChange={(e) => setSearchPlace(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="search-btn">
              Search
            </button>
            <button type="button" onClick={getUserLocation} className="location-btn">
              <FaLocationArrow /> Near Me
            </button>
          </form>
        </div>

        {error && (
          <div className="alert alert-danger mt-4">
            <FaInfoCircle className="me-2" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="saloon-cards">
            {saloons.map((saloon) => (
              <div key={saloon._id} className="saloon-card">
                <div className="saloon-image">
                  {/* <img src={`https://source.unsplash.com/400x300/?salon,haircut&${saloon._id}`} alt={saloon.name} /> */}
                </div>
                <div className="saloon-info">
                  <h3>{saloon.name}</h3>
                  <p className="location">
                    <FaMapMarkerAlt /> {saloon.place}, {saloon.city}
                  </p>
                  {saloon.distance && (
                    <p className="distance">{saloon.distance.toFixed(1)} km away</p>
                  )}
                  <button
                    onClick={() => navigate(`/book-salon/${saloon._id}`)}
                    className="book-now-btn"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
            {saloons.length === 0 && !loading && (
              <div className="no-results">
                <p>No salons found. Try a different location or search nearby.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
