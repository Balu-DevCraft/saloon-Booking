import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaUser, FaClock } from 'react-icons/fa';
import './Reviews.css';

const Reviews = ({ bookingId, stylistId, saloonId }) => {
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
    stylistRating: 0,
    stylistComment: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Log the received props
    console.log('Review props:', { bookingId, stylistId, saloonId });
    
    // Check if user has already reviewed this booking
    const checkExistingReview = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/saloon/get-review/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && response.data.data) {
          setReview(response.data.data);
          setSubmitted(true);
        }
      } catch (err) {
        console.error('Error checking review:', err);
      }
    };

    if (bookingId) {
      checkExistingReview();
    }
  }, [bookingId, stylistId, saloonId]);

  const handleRatingChange = (value, type) => {
    setReview(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const isValidObjectId = (id) => {
    return id && /^[0-9a-fA-F]{24}$/.test(id.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (review.rating === 0 || review.stylistRating === 0) {
      setError('Please provide both salon and stylist ratings');
      return;
    }

    // Validate ObjectIds
    if (!isValidObjectId(bookingId)) {
      setError('Invalid booking ID');
      return;
    }
    if (!isValidObjectId(stylistId)) {
      setError('Invalid stylist ID');
      return;
    }
    if (!isValidObjectId(saloonId)) {
      setError('Invalid salon ID');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const reviewData = {
        bookingId: bookingId.toString(),
        stylistId: stylistId.toString(),
        saloonId: saloonId.toString(),
        rating: Number(review.rating),
        stylistRating: Number(review.stylistRating),
        comment: review.comment.trim(),
        stylistComment: review.stylistComment.trim()
      };

      console.log('Submitting review data:', reviewData);

      const response = await axios.post('http://localhost:8080/saloon/add-review', reviewData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data) {
        setSubmitted(true);
        alert('Thank you for your review!');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      const errorMessage = err.response?.data?.message || 'Failed to submit review. Please try again.';
      console.error('Error details:', errorMessage);
      setError(errorMessage);
    }
  };

  const renderStars = (count, type) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`star ${index < count ? 'filled' : ''}`}
        onClick={() => !submitted && handleRatingChange(index + 1, type)}
      />
    ));
  };

  if (submitted) {
    return (
      <div className="review-submitted">
        <h4>Your Review</h4>
        <div className="ratings">
          <div className="rating-group">
            <label>Salon Rating:</label>
            <div className="stars">{renderStars(review.rating, 'rating')}</div>
          </div>
          <div className="rating-group">
            <label>Stylist Rating:</label>
            <div className="stars">{renderStars(review.stylistRating, 'stylistRating')}</div>
          </div>
        </div>
        <div className="comments">
          <p><strong>Salon Review:</strong> {review.comment}</p>
          <p><strong>Stylist Review:</strong> {review.stylistComment}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="review-form">
      <h4>Rate Your Experience</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="rating-group">
          <label>Rate the Salon:</label>
          <div className="stars">
            {renderStars(review.rating, 'rating')}
          </div>
        </div>

        <div className="form-group">
          <label>Salon Review:</label>
          <textarea
            value={review.comment}
            onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Share your experience with the salon..."
            required
          />
        </div>

        <div className="rating-group">
          <label>Rate the Stylist:</label>
          <div className="stars">
            {renderStars(review.stylistRating, 'stylistRating')}
          </div>
        </div>

        <div className="form-group">
          <label>Stylist Review:</label>
          <textarea
            value={review.stylistComment}
            onChange={(e) => setReview(prev => ({ ...prev, stylistComment: e.target.value }))}
            placeholder="Share your experience with the stylist..."
            required
          />
        </div>

        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Reviews; 