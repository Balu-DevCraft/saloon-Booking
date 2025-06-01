import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
// import axios from "axios"; // Uncomment for backend integration

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [salonRequests, setSalonRequests] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }

    // Fetch pending salon requests
    /*
    axios.get("/api/admin/salon-requests")
      .then(res => setSalonRequests(res.data))
      .catch(err => console.error("Failed to fetch salon requests", err));
    */

    // Demo data
    setSalonRequests([
      { id: 1, name: "StyleZone", location: "Bangalore", status: "pending" },
      { id: 2, name: "Glamour Touch", location: "Chennai", status: "pending" },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  const handleApproval = (id, isApproved) => {
    const newStatus = isApproved ? "approved" : "rejected";

    // Update on backend
    /*
    axios.patch(`/api/admin/salon-requests/${id}`, { status: newStatus })
      .then(() => {
        const updatedRequests = salonRequests.map((salon) =>
          salon.id === id ? { ...salon, status: newStatus } : salon
        );
        setSalonRequests(updatedRequests);
      })
      .catch(err => console.error("Failed to update status", err));
    */

    // Demo update
    const updatedRequests = salonRequests.map((salon) =>
      salon.id === id ? { ...salon, status: newStatus } : salon
    );
    setSalonRequests(updatedRequests);
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar text-light bg-dark">
        <div className="navbar-brand">CutAbout Admin</div>
        <div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="admin-main">
        <h2>Salon Registration Requests</h2>
        <div className="request-grid">
          {salonRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            salonRequests.map((salon) => (
              <div key={salon.id} className="salon-card">
                <h3>{salon.name}</h3>
                <p><strong>Location:</strong> {salon.location}</p>
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
                    <button className="approve-btn" onClick={() => handleApproval(salon.id, true)}>Approve</button>
                    <button className="reject-btn" onClick={() => handleApproval(salon.id, false)}>Reject</button>
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
