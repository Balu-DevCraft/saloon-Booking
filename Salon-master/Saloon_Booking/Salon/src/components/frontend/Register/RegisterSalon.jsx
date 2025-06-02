import "./RegisterSalon.css"; // New CSS for salon registration
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import axios from "axios"; // Uncommented axios import

const cityCoordinates = {
  Bangalore: [12.9716, 77.5946],
  Chennai: [13.0827, 80.2707],
  Kochi: [9.9312, 76.2673],
  Kannur: [11.8745, 75.3704],
};

const LocationPicker = ({ setLatLng }) => {
  useMapEvents({
    click(e) {
      setLatLng([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const RegisterSalon = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    location: "Bangalore",
    place: "",
    lat: "",
    lng: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const setLatLng = ([lat, lng]) => {
    setFormData({ 
      ...formData, 
      lat: lat.toString(), 
      lng: lng.toString() 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/saloon/create", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        city: formData.city,
        place: formData.place,
        latitude: formData.lat,
        longitude: formData.lng
      });

      if (response.data) {
        setMessage("Salon registered successfully! Redirecting...");
        setTimeout(() => navigate("/login/professional"), 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Registration failed. Please try again later.");
      }
    }
  };

  const position = cityCoordinates[formData.location];

  return (
    <div className="register-salon-container d-flex">
      {/* Left section */}
      <div className="left-section text-white pt-1 d-flex flex-column justify-content-center align-items-center p-5">
        <h1 className="mb-3">Join CutAbout</h1>
        <p className="text-center">
          Register your salon to receive bookings and manage stylists online.
        </p>
        <button
          className="btn btn-outline-light mt-3"
          onClick={() => navigate("/login/professional")}
        >
          ⬅ Back to Login
        </button>
      </div>

      {/* Right section */}
      <div className="right-section p-5 d-flex align-items-center justify-content-center w-100">
        <div
          className="register-form bg-white p-4 shadow rounded"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h3 className="text-center mb-3">Register as Salon</h3>
          <p className="text-center text-muted small">
            Fill in the form to create your salon account
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Salon Name"
              className="form-control mb-3 rounded-pill px-3"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control mb-3 rounded-pill px-3"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-3 rounded-pill px-3"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control mb-3 rounded-pill px-3"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <select
              name="city"
              className="form-select mb-3 rounded-pill px-3"
              value={formData.city}
              onChange={handleChange}
              
            >
               <option value="">Select a city</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kochi">Kochi</option>
                <option value="Kannur">Kannur</option>
            </select>

            <input
              type="text"
              name="place"
              placeholder="Place Name"
              className="form-control mb-3 rounded-pill px-3"
              value={formData.place}
              onChange={handleChange}
              required
            />

            <div className="mb-3" style={{ height: "250px" }}>
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationPicker setLatLng={setLatLng} />
                {formData.lat && formData.lng && (
                  <Marker position={[formData.lat, formData.lng]} />
                )}
              </MapContainer>
            </div>

            <input
              type="text"
              name="lat"
              className="form-control mb-2 rounded-pill px-3"
              placeholder="Latitude"
              value={formData.lat}
              readOnly
            />
            <input
              type="text"
              name="lng"
              className="form-control mb-3 rounded-pill px-3"
              placeholder="Longitude"
              value={formData.lng}
              readOnly
            />

            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <button
              type="submit"
              className="btn btn-secondary w-100 rounded-pill mt-3"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <span
              className="text-primary text-decoration-underline"
              role="button"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSalon;
