import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookSalon.css';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import StylistSelection from './StylistSelection';

const services = [
  { id: 1, name: "Haircut", price: "₹500", duration: "45 mins", description: "Professional haircut by expert stylists" },
  { id: 2, name: "Hair Coloring", price: "₹2000", duration: "2 hrs", description: "Premium hair coloring with quality products" },
  { id: 3, name: "Facial", price: "₹1500", duration: "1 hr", description: "Rejuvenating facial treatment" },
  { id: 4, name: "Styling", price: "₹800", duration: "30 mins", description: "Hair styling for any occasion" },
  { id: 5, name: "Beard Trim", price: "₹300", duration: "20 mins", description: "Professional beard grooming" }
];

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM"
];

const BookSalon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salon, setSalon] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // 1: Stylist, 2: Service, 3: Details
  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login/customer');
          return;
        }
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`http://localhost:8080/saloon/get-salon/${id}`);
        setSalon(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch salon details:', err);
        setError('Failed to load salon details. Please try again.');
        setLoading(false);
      }
    };

    fetchSalonDetails();
  }, [id, navigate]);

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    
    if (currentStep === 1 && !selectedStylist) {
      setError('Please select a stylist to continue');
      return;
    }
    if (currentStep === 2 && !selectedService) {
      setError('Please select a service to continue');
      return;
    }
    setError('');
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setError('');
    setCurrentStep(prev => prev - 1);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedStylist || !selectedService || !selectedDate || !selectedTime) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const convert12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
          hours = '00';
        }
        
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours}:${minutes}:00`;
      };

      const time24 = convert12to24(selectedTime);
      const dateTimeString = `${selectedDate}T${time24}`;
      
      const bookingData = {
        saloonId: id,
        employeeId: selectedStylist._id,
        service: selectedService.name,
        bookingDate: new Date(dateTimeString).toISOString(),
        bookingStatus: 'pending',
        name: bookingInfo.name,
        phoneNumber: bookingInfo.phone,
        email: bookingInfo.email,
        notes: bookingInfo.notes
      };

      const response = await axios.post('http://localhost:8080/saloon/book-saloon', bookingData);
      
      if (response.data) {
        alert('Booking confirmed successfully!');
        navigate('/customer/bookings');
      }
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StylistSelection
            salonId={id}
            onStylistSelect={handleStylistSelect}
            selectedService={selectedService}
          />
        );
      case 2:
        return (
          <div className="services-section">
            <h3>Select Service</h3>
            <div className="services-list">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <h4>{service.name}</h4>
                  <p className="price">{service.price}</p>
                  <p className="duration"><FaClock /> {service.duration}</p>
                  <p className="description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="booking-form-section">
            <h3>Book Appointment</h3>
            <form onSubmit={handleBooking} className="booking-form">
              <div className="form-group">
                <label>
                  <FaCalendarAlt /> Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaClock /> Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">Choose a time slot</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <FaUser /> Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={bookingInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={bookingInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  name="notes"
                  value={bookingInfo.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requests or notes"
                  rows="3"
                />
              </div>

              <div className="booking-summary">
                <h4>Booking Summary</h4>
                <p>Stylist: {selectedStylist?.name}</p>
                <p>Service: {selectedService?.name}</p>
                <p>Price: {selectedService?.price}</p>
                <p>Duration: {selectedService?.duration}</p>
              </div>

              <button type="submit" className="confirm-booking-btn">
                Confirm Booking
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="book-salon-page">
      <nav className="salon-nav">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft /> Back
          </button>
          <h1>Book Appointment</h1>
        </div>
      </nav>

      {error && (
        <div className="alert alert-danger container mt-4">
          {error}
        </div>
      )}

      {salon && (
        <div className="container">
          <div className="salon-details">
            <div className="salon-header">
              <div className="salon-image">
                <img src={`https://source.unsplash.com/800x400/?salon,haircut&${salon._id}`} alt={salon.name} />
              </div>
              <div className="salon-info">
                <h2>{salon.name}</h2>
                <p className="location">
                  <FaMapMarkerAlt /> {salon.place}, {salon.city}
                </p>
              </div>
            </div>

            <div className="booking-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Choose Stylist</div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Select Service</div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Book Appointment</div>
            </div>

            <div className="booking-content">
              {renderStepContent()}
            </div>

            <div className="booking-navigation">
              {currentStep > 1 && (
                <button className="prev-btn" onClick={handlePrevStep}>
                  Previous
                </button>
              )}
              {currentStep < 3 && (
                <button className="next-btn" onClick={handleNextStep}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSalon; 