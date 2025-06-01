import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaUser, FaSpinner, FaCalendarAlt } from 'react-icons/fa';
import '../SalonAdmin/SalonAdmin.css';

const StylistReviewsDisplay = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        // Get stylist profile
        const userResponse = await axios.get('http://localhost:8080/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Stylist profile response:', userResponse.data);

        if (!userResponse.data?.data?._id) {
          throw new Error('Could not get stylist ID');
        }

        const stylistId = userResponse.data.data._id;
        console.log('Stylist ID:', stylistId);

        // Get stylist's reviews
        const reviewsResponse = await axios.get(`http://localhost:8080/saloon/get-stylist-reviews/${stylistId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Reviews response:', reviewsResponse.data);

        if (reviewsResponse.data && Array.isArray(reviewsResponse.data.data)) {
          const stylistReviews = reviewsResponse.data.data.map(review => ({
            customerName: review.userId?.name || 'Anonymous',
            rating: review.stylistRating || 0,
            comment: review.stylistComment || '',
            createdAt: review.createdAt,
            service: review.service,
            bookingDate: review.bookingDate,
            email: review.userId?.email,
            phoneNumber: review.userId?.phoneNumber
          }));

          console.log('Processed reviews:', stylistReviews);
          setReviews(stylistReviews);
        } else {
          console.log('Invalid reviews response format:', reviewsResponse.data);
          setReviews([]);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.response?.data?.message || 'Failed to load reviews. Please try again.');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`star ${index < Math.round(rating) ? 'filled' : ''}`}
      />
    ));
  };

  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="reviews-display">
        <div className="loading-state">
          <FaSpinner className="spinner" />
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-display error">
        <div className="alert alert-danger">
          <strong>Error loading reviews:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-display">
      <div className="reviews-summary">
        <div className="rating-summary">
          <h4>Your Rating</h4>
          <div className="stars">{renderStars(calculateAverageRating())}</div>
          <p>{calculateAverageRating()} out of 5</p>
          <p className="review-count">Based on {reviews.length} reviews</p>
        </div>
      </div>

      <div className="reviews-grid">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div 
              key={index} 
              className="review-card" 
              onClick={() => setSelectedReview(review)}
            >
              <div className="review-header">
                <div className="reviewer-info">
                  <FaUser className="user-icon" />
                  <span className="reviewer-name">{review.customerName}</span>
                </div>
                <div className="review-date">
                  <FaCalendarAlt className="calendar-icon" />
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="rating-section">
                <h5>Service</h5>
                <p className="service-name">{review.service}</p>
                <h5>Rating</h5>
                <div className="stars">{renderStars(review.rating)}</div>
                {review.comment && (
                  <p className="review-comment">{review.comment}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-reviews">
            <p>No reviews available yet.</p>
          </div>
        )}
      </div>

      {selectedReview && (
        <div className="review-modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="review-modal-content" onClick={e => e.stopPropagation()}>
            <div className="review-modal-header">
              <div className="reviewer-info">
                <FaUser className="user-icon" />
                <span className="reviewer-name">{selectedReview.customerName}</span>
              </div>
              <button className="close-btn" onClick={() => setSelectedReview(null)}>×</button>
            </div>
            
            <div className="review-modal-body">
              <div className="service-section">
                <h5>Service</h5>
                <p>{selectedReview.service}</p>
              </div>
              <div className="rating-section">
                <h5>Rating</h5>
                <div className="stars">{renderStars(selectedReview.rating)}</div>
                <p className="review-text">{selectedReview.comment || 'No comment provided'}</p>
              </div>
              
              <div className="review-details">
                <div className="review-date">
                  <FaCalendarAlt className="calendar-icon" />
                  <p>Review Date: {new Date(selectedReview.createdAt).toLocaleDateString()}</p>
                </div>
                {selectedReview.email && (
                  <p>Email: {selectedReview.email}</p>
                )}
                {selectedReview.phoneNumber && (
                  <p>Contact: {selectedReview.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylistReviewsDisplay; 