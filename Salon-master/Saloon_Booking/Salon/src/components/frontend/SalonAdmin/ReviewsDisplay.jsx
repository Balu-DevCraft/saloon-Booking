import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaUser, FaSpinner, FaCalendarAlt } from 'react-icons/fa';
import './SalonAdmin.css';

const ReviewsDisplay = ({ salonId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, salon, stylist
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!salonId) {
        setError('No salon ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        console.log('Fetching reviews for salon:', salonId);
        
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8080/saloon/get-salon-reviews/${salonId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data && response.data.data) {
          console.log('Reviews fetched:', response.data.data);
          setReviews(response.data.data);
        } else {
          console.log('No reviews found in response');
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
  }, [salonId]);

  const renderStars = (rating) => {
    if (!rating || rating < 0 || rating > 5) return null;
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      />
    ));
  };

  const getFilteredReviews = () => {
    if (!reviews) return [];
    switch (filter) {
      case 'salon':
        return reviews.filter(review => review && review.rating > 0);
      case 'stylist':
        return reviews.filter(review => review && review.stylistRating > 0);
      default:
        return reviews;
    }
  };

  const calculateAverageRating = (type) => {
    if (!reviews || reviews.length === 0) return 0;
    
    const relevantReviews = reviews.filter(review => 
      review && (type === 'salon' ? review.rating > 0 : review.stylistRating > 0)
    );
    
    if (relevantReviews.length === 0) return 0;
    
    const sum = relevantReviews.reduce((acc, review) => 
      acc + (type === 'salon' ? review.rating : review.stylistRating), 0
    );
    
    return (sum / relevantReviews.length).toFixed(1);
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

  const filteredReviews = getFilteredReviews();

  return (
    <div className="reviews-display">
      <div className="reviews-summary">
        <div className="rating-summary">
          <h4>Salon Rating</h4>
          <div className="stars">{renderStars(Math.round(calculateAverageRating('salon')))}</div>
          <p>{calculateAverageRating('salon')} out of 5</p>
        </div>
        <div className="rating-summary">
          <h4>Stylists Rating</h4>
          <div className="stars">{renderStars(Math.round(calculateAverageRating('stylist')))}</div>
          <p>{calculateAverageRating('stylist')} out of 5</p>
        </div>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Reviews
        </button>
        <button
          className={`filter-btn ${filter === 'salon' ? 'active' : ''}`}
          onClick={() => setFilter('salon')}
        >
          Salon Reviews
        </button>
        <button
          className={`filter-btn ${filter === 'stylist' ? 'active' : ''}`}
          onClick={() => setFilter('stylist')}
        >
          Stylist Reviews
        </button>
      </div>

      <div className="reviews-grid">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div 
              key={index} 
              className="review-card" 
              onClick={() => setSelectedReview(review)}
            >
              <div className="review-header">
                <div className="reviewer-info">
                  <FaUser className="user-icon" />
                  <span className="reviewer-name">{review?.customerName || 'Anonymous'}</span>
                </div>
                <div className="review-date">
                  <FaCalendarAlt className="calendar-icon" />
                  {review?.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              
              {review?.rating > 0 && (
                <div className="rating-section">
                  <h5>Salon Rating</h5>
                  <div className="stars">{renderStars(review.rating)}</div>
                </div>
              )}

              {review?.stylistRating > 0 && (
                <div className="rating-section">
                  <h5>Stylist Rating</h5>
                  <div className="stars">{renderStars(review.stylistRating)}</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-reviews">
            {filter === 'all' 
              ? 'No reviews available yet.' 
              : `No ${filter} reviews found.`}
          </div>
        )}
      </div>

      {selectedReview && (
        <div className="review-modal-overlay" onClick={() => setSelectedReview(null)}>
          <div className="review-modal-content" onClick={e => e.stopPropagation()}>
            <div className="review-modal-header">
              <div className="reviewer-info">
                <FaUser className="user-icon" />
                <span className="reviewer-name">{selectedReview?.customerName || 'Anonymous'}</span>
              </div>
              <button className="close-btn" onClick={() => setSelectedReview(null)}>×</button>
            </div>
            
            <div className="review-modal-body">
              {selectedReview?.rating > 0 && (
                <div className="rating-section">
                  <h5>Salon Rating</h5>
                  <div className="stars">{renderStars(selectedReview.rating)}</div>
                  <p className="review-text">{selectedReview.comment || 'No comment provided'}</p>
                </div>
              )}

              {selectedReview?.stylistRating > 0 && (
                <div className="rating-section">
                  <h5>Stylist Rating</h5>
                  <div className="stars">{renderStars(selectedReview.stylistRating)}</div>
                  <p className="review-text">{selectedReview.stylistComment || 'No comment provided'}</p>
                  <p className="stylist-name">Stylist: {selectedReview.stylistName || 'Unknown'}</p>
                </div>
              )}
              
              <div className="review-date">
                <FaCalendarAlt className="calendar-icon" />
                {selectedReview?.createdAt ? new Date(selectedReview.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsDisplay; 