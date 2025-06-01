import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Reviews from './Reviews';

const BookingsAndRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login/customer');
          return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('http://localhost:8080/saloon/get-my-bookings', {
          params: {
            page: 1,
            limit: 100
          }
        });

        if (response.data && response.data.data) {
          // Transform the data to ensure we have proper IDs
          const transformedBookings = response.data.data.map(booking => ({
            ...booking,
            employeeId: booking.employeeId?._id || booking.employeeId,
            saloonId: {
              ...booking.saloonId,
              _id: booking.saloonId?._id || booking.saloonId
            }
          }));
          console.log('Transformed bookings:', transformedBookings);
          setBookings(transformedBookings);
        }
        setError('');
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.response?.data?.message || 'Failed to load bookings. Please try again.');
        if (err.response?.status === 401) {
          navigate('/login/customer');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleReviewClick = (booking) => {
    console.log('Selected booking for review:', booking);
    // Validate that we have all required IDs
    if (!booking._id || !booking.employeeId || !booking.saloonId?._id) {
      setError('Missing required booking information');
      return;
    }
    setSelectedBooking(booking);
    setShowReviewForm(true);
  };

  const renderTable = (data) => (
    <div className="table-responsive">
      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Salon</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.saloonId?.name || 'N/A'}</td>
              <td>{booking.service}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>{new Date(booking.bookingDate).toLocaleTimeString()}</td>
              <td>
                <span className={`badge bg-${getStatusColor(booking.bookingStatus)} text-white`}>
                  {booking.bookingStatus}
                </span>
              </td>
              <td>
                {booking.bookingStatus === 'completed' && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleReviewClick(booking)}
                  >
                    Leave Review
                  </button>
                )}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Bookings</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card">
        <div className="card-body">
          {renderTable(bookings)}
        </div>
      </div>

      {showReviewForm && selectedBooking && (
        <div className="review-section mt-4">
          <h3>Write a Review</h3>
          <Reviews
            bookingId={selectedBooking._id}
            stylistId={selectedBooking.employeeId}
            saloonId={selectedBooking.saloonId._id}
          />
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setShowReviewForm(false)}
          >
            Close Review Form
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingsAndRequests;
