import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaCut, FaClock, FaStar } from 'react-icons/fa';
import './StylistSelection.css';

const StylistSelection = ({ salonId, onStylistSelect, selectedService }) => {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [filteredStylists, setFilteredStylists] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`http://localhost:8080/saloon/get-saloon-employees`, {
          params: {
            saloonId: salonId,
            isActive: true
          }
        });

        if (response.data && response.data.data) {
          const stylistsData = response.data.data;
          setStylists(stylistsData);
          filterStylistsByService(stylistsData, selectedService);
        }
        setError('');
      } catch (err) {
        console.error('Error fetching stylists:', err);
        setError(err.response?.data?.message || 'Failed to load stylists. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStylists();
  }, [salonId, selectedService]);

  useEffect(() => {
    filterStylistsByService(stylists, selectedService);
  }, [selectedService, stylists]);

  const filterStylistsByService = (stylistsData, service) => {
    if (!service) {
      setFilteredStylists(stylistsData);
      return;
    }

    const filtered = stylistsData.filter(stylist => 
      !stylist.specialization || // If no specialization, assume they can do all services
      stylist.specialization.length === 0 || 
      stylist.specialization.includes(service.name)
    );
    setFilteredStylists(filtered);
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
    onStylistSelect(stylist);
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

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="stylist-selection">
      <h3 className="section-title">
        {selectedService 
          ? `Choose Your Stylist for ${selectedService.name}`
          : 'Choose Your Stylist'}
      </h3>
      {selectedService && filteredStylists.length === 0 && (
        <div className="alert alert-info">
          No stylists available for {selectedService.name} at the moment.
          Please select a different service or try again later.
        </div>
      )}
      <div className="stylists-grid">
        {(filteredStylists.length > 0 ? filteredStylists : stylists).map((stylist) => (
          <div
            key={stylist._id}
            className={`stylist-card ${selectedStylist?._id === stylist._id ? 'selected' : ''}`}
            onClick={() => handleStylistSelect(stylist)}
          >
            <div className="stylist-image">
              {stylist.image ? (
                <img src={stylist.image} alt={stylist.name} />
              ) : (
                <FaUser className="default-avatar" />
              )}
            </div>
            <div className="stylist-info">
              <h4>{stylist.name}</h4>
              <div className="specializations">
                <FaCut className="icon" />
                {stylist.specialization?.length > 0 
                  ? stylist.specialization.join(', ')
                  : 'All Services'}
              </div>
              {stylist.workHistory && (
                <div className="work-history">
                  <FaClock className="icon" />
                  {stylist.workHistory}
                </div>
              )}
              {stylist.openingTimes && (
                <div className="availability">
                  <FaClock className="icon" />
                  Available: {stylist.openingTimes}
                </div>
              )}
              <div className="experience-rating">
                <FaStar className="icon" />
                Expert Stylist
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
  );
};

export default StylistSelection; 