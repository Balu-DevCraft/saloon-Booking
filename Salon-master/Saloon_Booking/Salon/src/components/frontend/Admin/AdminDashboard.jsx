import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [salonRequests, setSalonRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    
    if (!token || userType !== "superadmin") {
      navigate("/admin/login");
      return;
    }

    // Set up axios defaults
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    fetchSalonRequests();
  }, [navigate]);

  const fetchSalonRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/saloon/get-pending-saloons");
      
      if (response.data?.data) {
        setSalonRequests(response.data.data);
      }
      setError("");
    } catch (err) {
      console.error("Failed to fetch salon requests", err);
      setError(err.response?.data?.message || "Failed to fetch salon requests");
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const handleApproval = async (id, isApproved) => {
    try {
      setLoading(true);
      const response = await axios.patch(`http://localhost:8080/saloon/update-salon-status/${id}`, {
        status: isApproved ? "approved" : "rejected"
      });

      if (response.data?.success) {
        // Refresh the salon requests
        fetchSalonRequests();
      }
    } catch (err) {
      console.error("Failed to update salon status", err);
      setError(err.response?.data?.message || "Failed to update salon status");
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar text-light bg-dark">
        <div className="navbar-brand">CutAbout Superadmin</div>
        <div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="admin-main">
        <h2>Salon Registration Requests</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <div className="request-grid">
          {salonRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            salonRequests.map((salon) => (
              <div key={salon._id} className="salon-card">
                <h3>{salon.name}</h3>
                <p>
                  <strong>Owner:</strong> {salon.ownerName}
                </p>
                <p>
                  <strong>Email:</strong> {salon.email}
                </p>
                <p>
                  <strong>Location:</strong> {salon.city}, {salon.place}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      salon.status === "approved"
                        ? "status-approved"
                        : salon.status === "rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }
                  >
                    {salon.status}
                  </span>
                </p>
                {salon.status === "pending" && (
                  <div className="action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() => handleApproval(salon._id, true)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleApproval(salon._id, false)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="admin-footer bg-dark text-light">
        <p>&copy; 2025 CutAbout. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
