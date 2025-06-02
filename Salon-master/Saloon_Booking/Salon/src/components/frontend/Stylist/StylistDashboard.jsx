import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StylistDashboard.css";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaSignOutAlt, FaStar, FaUser } from 'react-icons/fa';
import StylistReviewsDisplay from './StylistReviewsDisplay';

const StylistDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [stylistData, setStylistData] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token);
    
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login/professional');
      return;
    }

    // Set up axios defaults
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Axios headers set:', axios.defaults.headers.common);

    const fetchStylistData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/me');
        if (response.data && response.data.data) {
          setStylistData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching stylist data:", err);
        if (err.response?.status === 401) {
          navigate('/login/professional');
        }
      }
    };

    fetchStylistData();
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      console.log('Fetching bookings...');

      const response = await axios.get('http://localhost:8080/saloon/get-saloon-bookings-employees', {
        params: {
          page: 1,
          limit: 100
        }
      });

      console.log('Bookings response:', response.data);

      if (response.data && response.data.data) {
        const bookingsData = response.data.data;
        setBookings(bookingsData);

        // Calculate statistics
        const total = bookingsData.length;
        const completed = bookingsData.filter(booking => booking.bookingStatus === 'completed').length;
        const pending = bookingsData.filter(booking => booking.bookingStatus === 'pending').length;

        setStats({
          totalBookings: total,
          completedBookings: completed,
          pendingBookings: pending
        });
      }

      setError("");
    } catch (err) {
      console.error("Error fetching bookings:", err);
      console.log('Error response:', err.response);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.clear();
        navigate('/login/professional');
      } else {
        setError(err.response?.data?.message || "Failed to load bookings. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      console.log('Updating booking status:', { bookingId, newStatus });
      
      const response = await axios.patch(`http://localhost:8080/saloon/update-booking-status/${bookingId}`, {
        status: newStatus
      });

      console.log('Update response:', response.data);

      if (response.data) {
        // Update the local state
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking._id === bookingId ? { ...booking, bookingStatus: newStatus } : booking
          )
        );

        // Update statistics
        setStats(prevStats => {
          const newStats = { ...prevStats };
          if (newStatus === 'completed') {
            newStats.completedBookings++;
            newStats.pendingBookings--;
          } else if (newStatus === 'rejected') {
            newStats.pendingBookings--;
          }
          return newStats;
        });
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      console.log('Error response:', err.response);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.clear();
        navigate('/login/professional');
      } else {
        setError(err.response?.data?.message || "Failed to update booking status.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login/professional');
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="stylist-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <span className="brand">CutAbout Stylist</span>
          <div className="nav-user">
            <span className="stylist-name">
              <FaUser /> {stylistData?.name || 'Loading...'}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome, {stylistData?.name || 'Stylist'}</h1>
          <p>Manage your bookings and schedule</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <div className="value">{stats.totalBookings}</div>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <div className="value">{stats.pendingBookings}</div>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <div className="value">{stats.completedBookings}</div>
          </div>
          <div className="stat-card clickable" onClick={() => setShowReviews(true)}>
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-info">
              <h3>Reviews</h3>
              <p>View Customer Feedback</p>
            </div>
          </div>
        </div>

        <div className="bookings-section">
          <h2>Recent Bookings</h2>
          <div className="bookings-list">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <div key={index} className={`booking-card ${booking.bookingStatus}`}>
                  <div className="booking-header">
                    <h3>{booking.userId?.name || booking.name}</h3>
                    <span className={`status-badge ${booking.bookingStatus}`}>
                      {booking.bookingStatus === 'completed' ? (
                        <><FaCheckCircle /> Completed</>
                      ) : (
                        <><FaTimesCircle /> Pending</>
                      )}
                    </span>
                  </div>
                  <div className="booking-details">
                    <p><FaCalendarAlt /> {new Date(booking.bookingDate).toLocaleString()}</p>
                    <p>Service: {booking.service}</p>
                    <p>Contact: {booking.phoneNumber || booking.userId?.phoneNumber}</p>
                    {booking.notes && <p className="notes">Notes: {booking.notes}</p>}
                  </div>
                  {booking.bookingStatus === 'pending' && (
                    <div className="booking-actions">
                      <button 
                        className="btn-confirm"
                        onClick={() => handleStatusUpdate(booking._id, 'completed')}
                      >
                        <FaCheckCircle /> Complete
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-bookings">
                No bookings available.
              </div>
            )}
          </div>
        </div>

        {showReviews && (
          <div className="modal-overlay" onClick={() => setShowReviews(false)}>
            <div className="modal-content reviews-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Your Reviews</h2>
                <button className="close-btn" onClick={() => setShowReviews(false)}>×</button>
              </div>
              <StylistReviewsDisplay />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StylistDashboard;
