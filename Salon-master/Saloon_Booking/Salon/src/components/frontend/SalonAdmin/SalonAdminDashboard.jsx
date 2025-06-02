import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./SalonAdmin.css";
import { FaUserPlus, FaEdit, FaTrash, FaSignOutAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaClock, FaEnvelope, FaCut, FaCheckCircle, FaTimesCircle, FaPhone, FaStar, FaSync } from 'react-icons/fa';
import ReviewsDisplay from './ReviewsDisplay';

const availableSpecializations = ["Haircut", "Facial", "Coloring", "Spa", "Makeup"];

const SalonAdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stylists, setStylists] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalStylists: 0,
    totalRevenue: 0
  });
  const [bookings, setBookings] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [salonId, setSalonId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [salonData, setSalonData] = useState(null);
  
  const [stylistForm, setStylistForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: [],
    workHistory: "",
    image: "",
    openingTimes: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');
    
    if (!token) {
      navigate('/login/professional');
      return;
    }

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Set up axios defaults
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Load initial data
    fetchUserAndDashboardData();
  }, [navigate]);

  const fetchUserAndDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile
      const userResponse = await axios.get('http://localhost:8080/auth/me');
      if (userResponse.data?.data) {
        const user = userResponse.data.data;
        console.log('SalonAdminDashboard: User data received:', { 
          userId: user._id,
          saloonId: user.saloonId,
          name: user.name 
        });
        setUserData(user);
        localStorage.setItem('userData', JSON.stringify(user));
        setSalonId(user.saloonId);

        // Fetch salon details
        if (user.saloonId) {
          console.log('SalonAdminDashboard: Fetching salon details for ID:', user.saloonId);
          const salonResponse = await axios.get(`http://localhost:8080/saloon/get-salon/${user.saloonId}`);
          if (salonResponse.data?.data) {
            console.log('SalonAdminDashboard: Salon details received:', salonResponse.data.data);
            setSalonData(salonResponse.data.data);
          }

          // Fetch employees data - only if we have salon ID
          const employeesResponse = await axios.get('http://localhost:8080/saloon/get-saloon-employees', {
            params: {
              page: 1,
              limit: 100,
              isActive: true,
              saloonId: user.saloonId
            }
          });

          if (employeesResponse.data?.data) {
            setStylists(employeesResponse.data.data);
          }

          // Fetch bookings - only if we have salon ID
          const bookingsResponse = await axios.get('http://localhost:8080/saloon/get-saloon-bookings-employees', {
            params: {
              page: 1,
              limit: 100,
              saloonId: user.saloonId
              
              
            }
           
            
          });
          console.log("salonId",user.saloonId);

          if (bookingsResponse.data?.data) {
            const bookingsData = bookingsResponse.data.data;
            setBookings(bookingsData);

            // Calculate statistics
            setStats({
              totalBookings: bookingsData.length,
              totalStylists: employeesResponse.data.data?.length || 0,
              totalRevenue: calculateTotalRevenue(bookingsData)
            });
          }
        } else {
          setError("No salon ID found. Please contact support.");
        }
      }

      setError("");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Failed to load dashboard data");
      if (err.response?.status === 401) {
        navigate('/login/professional');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStylistChange = (e) => {
    const { name, value } = e.target;
    setStylistForm({ ...stylistForm, [name]: value });
  };

  const handleSpecializationToggle = (service) => {
    setStylistForm((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(service)
        ? prev.specialization.filter((s) => s !== service)
        : [...prev.specialization, service],
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Remove data:image/xyz;base64, prefix
        setStylistForm(prev => ({ ...prev, image: base64String }));
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setError("Failed to read image file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrEditStylist = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login/professional');
        return;
      }

      // Validate required fields
      if (!stylistForm.name || !stylistForm.email || (!editingIndex && !stylistForm.password)) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const formData = {
        name: stylistForm.name.trim(),
        email: stylistForm.email.trim(),
        specialization: stylistForm.specialization || [],
        workHistory: stylistForm.workHistory?.trim(),
        openingTimes: stylistForm.openingTimes?.trim(),
        isActive: true
      };

      // Only include password if it's provided (for new stylists or password changes)
      if (stylistForm.password) {
        formData.password = stylistForm.password;
      }

      // Add image if it exists
      if (stylistForm.image) {
        formData.image = stylistForm.image;
      }

      let response;
      if (editingIndex !== null) {
        // Edit existing stylist
        response = await axios.patch(
          `http://localhost:8080/saloon/employee/${stylists[editingIndex]._id}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data && response.data.data) {
          const updatedStylists = [...stylists];
          updatedStylists[editingIndex] = {
            ...stylists[editingIndex],
            ...response.data.data
          };
          setStylists(updatedStylists);
        }
      } else {
        // Add new stylist
        response = await axios.post(
          'http://localhost:8080/saloon/add-saloon-employee',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data && response.data.data) {
          setStylists([...stylists, response.data.data]);
        }
      }

      // Reset form
      setStylistForm({
        name: "",
        email: "",
        password: "",
        specialization: [],
        workHistory: "",
        image: "",
        openingTimes: "",
      });
      setEditingIndex(null);
      setShowForm(false);

      // Refresh the dashboard data
      await fetchUserAndDashboardData();

    } catch (err) {
      console.error("Error saving stylist:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.clear();
        navigate('/login/professional');
      } else {
        setError(err.response?.data?.message || "Failed to save stylist. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditStylist = (index) => {
    const stylist = stylists[index];
    setStylistForm({
      name: stylist.name,
      email: stylist.email,
      password: "", // Clear password field for editing
      specialization: stylist.specialization || [],
      workHistory: stylist.workHistory || "",
      image: stylist.image || "",
      openingTimes: stylist.openingTimes || "",
    });
    setEditingIndex(index);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteStylist = async (index) => {
    if (!window.confirm("Are you sure you want to delete this stylist?")) return;
    
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/saloon/employee/${stylists[index]._id}`);
      const updatedStylists = stylists.filter((_, i) => i !== index);
      setStylists(updatedStylists);
      
      // Update statistics
      setStats(prev => ({
        ...prev,
        totalStylists: prev.totalStylists - 1
      }));
    } catch (err) {
      console.error("Error deleting stylist:", err);
      setError(err.response?.data?.message || "Failed to delete stylist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login/professional');
  };

  // Update the image display in the stylist card
  const getImageUrl = (imageData) => {
    if (!imageData) return "https://via.placeholder.com/150?text=No+Image";
    
    // If the image is already a URL, return it
    if (imageData.startsWith('http')) return imageData;
    
    // If it's base64 data, add the prefix
    return `data:image/jpeg;base64,${imageData}`;
  };

  // Add this new function to format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Add this new component for the Bookings Modal
  const BookingsModal = () => {
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
    
    const filteredBookings = bookings.filter(booking => {
      if (filter === 'all') return true;
      return booking.bookingStatus === filter;
    });

    return (
      <div className="modal-overlay" onClick={() => setShowBookingsModal(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Booking Details</h2>
            <button className="close-btn" onClick={() => setShowBookingsModal(false)}>×</button>
          </div>
          
          <div className="booking-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Bookings
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              <FaTimesCircle /> Pending
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              <FaCheckCircle /> Completed
            </button>
          </div>

          <div className="bookings-list">
            {filteredBookings.length === 0 ? (
              <div className="no-bookings">
                No {filter !== 'all' ? filter : ''} bookings found
              </div>
            ) : (
              filteredBookings.map((booking, index) => (
                <div key={index} className={`booking-card ${booking.bookingStatus}`}>
                  <div className="booking-header">
                    <h3>{booking.name}</h3>
                    <span className={`status-badge ${booking.bookingStatus}`}>
                      {booking.bookingStatus === 'completed' ? (
                        <><FaCheckCircle /> Completed</>
                      ) : (
                        <><FaTimesCircle /> Pending</>
                      )}
                    </span>
                  </div>
                  
                  <div className="booking-details">
                    <p><FaCalendarAlt /> {formatDate(booking.bookingDate)}</p>
                    <p><FaCut /> Service: {booking.service}</p>
                    <p><FaPhone /> Phone: {booking.phoneNumber}</p>
                    <p><FaEnvelope /> Email: {booking.email}</p>
                    {booking.notes && <p className="booking-notes">Notes: {booking.notes}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading && !stylists.length) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="salon-admin-dashboard">
      <nav className="admin-nav">
        <div className="admin-nav-content">
          <Link to="/" className="admin-brand">CutAbout Admin</Link>
          <div className="admin-nav-links">
            <Link to="/dashboard/salon" className="admin-nav-link">
              <FaCalendarAlt /> Bookings
            </Link>
            <span onClick={handleLogout} className="admin-nav-link admin-logout">
              <FaSignOutAlt /> Logout
            </span>
          </div>
        </div>
      </nav>

      <main className="admin-main">
        <div className="admin-header">
          {userData && (
            <div className="welcome-section">
              <h1>Welcome, {userData.name}! 👋</h1>
              {/* {salonData && (
                <p className="salon-info">
                  Managing: {salonData.name} | Location: {salonData.city}, {salonData.place}
                </p>
              )} */}
              <p className="last-login">
                Last active: {new Date(userData.lastActiveAt || Date.now()).toLocaleString()}
              </p>
            </div>
          )}
          <div className="header-actions">
            <button className="refresh-btn" onClick={fetchUserAndDashboardData}>
              <FaSync /> Refresh Dashboard
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="dashboard-grid">
          <div 
            className="stat-card clickable"
            onClick={() => setShowBookingsModal(true)}
          >
            <h3>Total Bookings</h3>
            <div className="value">{stats.totalBookings}</div>
            <div className="stat-details">
              <span className="pending">
                <FaTimesCircle /> {bookings.filter(b => b.bookingStatus === 'pending').length} Pending
              </span>
              <span className="completed">
                <FaCheckCircle /> {bookings.filter(b => b.bookingStatus === 'completed').length} Completed
              </span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Active Stylists</h3>
            <div className="value">{stats.totalStylists}</div>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="value">₹{stats.totalRevenue.toLocaleString()}</div>
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

        <div className="stylist-section">
          <div className="section-header">
            <h2 className="section-title">Manage Stylists</h2>
            <button className="add-stylist-btn" onClick={() => setShowForm(!showForm)}>
              <FaUserPlus /> {showForm ? 'Cancel' : 'Add Stylist'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddOrEditStylist} className="stylist-form fade-in">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={stylistForm.name}
                  onChange={handleStylistChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={stylistForm.email}
                  onChange={handleStylistChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>{editingIndex !== null ? 'New Password (leave blank to keep current)' : 'Password'}</label>
                <input
                  type="password"
                  name="password"
                  value={stylistForm.password}
                  onChange={handleStylistChange}
                  required={!editingIndex}
                />
              </div>

              <div className="form-group">
                <label>Work History</label>
                <textarea
                  name="workHistory"
                  value={stylistForm.workHistory}
                  onChange={handleStylistChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="form-group">
                <label>Working Hours</label>
                <input
                  type="text"
                  name="openingTimes"
                  value={stylistForm.openingTimes}
                  onChange={handleStylistChange}
                  placeholder="e.g., Mon-Fri: 9AM-6PM"
                />
              </div>

              <div className="form-group">
                <label>Specializations</label>
                <div className="specializations">
                  {availableSpecializations.map((service) => (
                    <div
                      key={service}
                      className={`specialization-tag ${
                        stylistForm.specialization.includes(service) ? "selected" : ""
                      }`}
                      onClick={() => handleSpecializationToggle(service)}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="add-stylist-btn">
                {editingIndex !== null ? 'Update Stylist' : 'Add Stylist'}
              </button>
            </form>
          )}

          <div className="stylist-grid">
            {stylists.map((stylist, index) => (
              <div key={index} className="stylist-card fade-in">
                <div className="stylist-image-container">
                  <img
                    src={getImageUrl(stylist.image)}
                    alt={stylist.name}
                    className="stylist-image"
                    onError={(e) => {
                      if (!e.target.getAttribute('data-error-handled')) {
                        e.target.setAttribute('data-error-handled', 'true');
                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        console.log("Image load failed for:", stylist.name);
                      }
                    }}
                  />
                </div>
                <div className="stylist-info">
                  <h3 className="stylist-name">{stylist.name}</h3>
                  <p className="stylist-email">
                    <FaEnvelope className="icon" /> {stylist.email}
                  </p>
                  <div className="stylist-details">
                    {stylist.specialization && stylist.specialization.length > 0 && (
                      <div className="detail-item">
                        <FaCut className="icon" />
                        <div className="stylist-specializations">
                          {stylist.specialization.map((spec, i) => (
                            <span key={i} className="stylist-specialization">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {stylist.workHistory && (
                      <div className="detail-item">
                        <FaUsers className="icon" />
                        <span>{stylist.workHistory}</span>
                      </div>
                    )}
                    {stylist.openingTimes && (
                      <div className="detail-item">
                        <FaClock className="icon" />
                        <span>{stylist.openingTimes}</span>
                      </div>
                    )}
                  </div>
                  <div className="stylist-actions">
                    <button className="edit-btn" onClick={() => handleEditStylist(index)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteStylist(index)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {stylists.length === 0 && (
              <div className="no-stylists">
                No stylists available at the moment.
              </div>
            )}
          </div>
        </div>

        {showBookingsModal && <BookingsModal />}

        {showReviews && (
          <div className="modal-overlay" onClick={() => setShowReviews(false)}>
            <div className="modal-content reviews-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Customer Reviews</h2>
                <button className="close-btn" onClick={() => setShowReviews(false)}>×</button>
              </div>
              <ReviewsDisplay salonId={salonId} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SalonAdminDashboard;
