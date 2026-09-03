import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../../data/destinations';
import { fetchWeatherByCoordinates, fetchWeatherByCity } from '../../services/weatherService';
import { MapPin, Navigation, Search, X, AlertTriangle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import './LocationPicker.css';

export default function LocationPicker({ isOpen, onClose }) {
  const [status, setStatus] = useState('idle'); // idle | requesting | success | denied | error
  const [errorMessage, setErrorMessage] = useState('');
  const [manualQuery, setManualQuery] = useState('');
  const [detectedData, setDetectedData] = useState(null);
  const navigate = useNavigate();

  // Helper to calculate distance between two coordinates in km (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  // Find the closest destination from our curated list
  const findClosestDestination = (userLat, userLon) => {
    let closest = null;
    let minDistance = Infinity;

    DESTINATIONS.forEach((dest) => {
      const dist = calculateDistance(
        userLat,
        userLon,
        dest.coordinates.lat,
        dest.coordinates.lon
      );
      if (dist < minDistance) {
        minDistance = dist;
        closest = { ...dest, distanceKm: dist };
      }
    });

    return closest;
  };

  // Request browser geolocation
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setStatus('requesting');
    setErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const closestDest = findClosestDestination(latitude, longitude);

        // Fetch live local weather for the user coordinates
        const weatherRes = await fetchWeatherByCoordinates(latitude, longitude);

        setDetectedData({
          lat: latitude,
          lon: longitude,
          closestDestination: closestDest,
          weather: weatherRes.data
        });

        setStatus('success');
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus('denied');
          setErrorMessage('Location access is off.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setStatus('error');
          setErrorMessage('Location information is currently unavailable.');
        } else if (error.code === error.TIMEOUT) {
          setStatus('error');
          setErrorMessage('The request to get your location timed out.');
        } else {
          setStatus('error');
          setErrorMessage('Failed to detect your location.');
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Execute geolocation request when modal opens in idle status
  useEffect(() => {
    if (isOpen && status === 'idle') {
      handleRequestLocation();
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle manual destination search inside modal
  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;

    // Search against curated destinations first
    const matched = DESTINATIONS.find(
      (d) =>
        d.name.toLowerCase().includes(manualQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(manualQuery.toLowerCase())
    );

    if (matched) {
      onClose();
      navigate(`/destination/${matched.id}`);
    } else {
      // Navigate to general destinations page with query
      onClose();
      navigate(`/destinations`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="location-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="location-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="location-modal-header">
          <div className="location-icon-badge">
            <Navigation size={20} className="modal-nav-icon" aria-hidden="true" />
          </div>
          <h3 className="location-modal-title">Location Discovery</h3>
          <button
            type="button"
            className="location-modal-close"
            onClick={onClose}
            aria-label="Close location modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="location-modal-body">
          {/* 1. Requesting State */}
          {status === 'requesting' && (
            <div className="location-state-container requesting">
              <Loader2 size={36} className="spinner-icon" aria-hidden="true" />
              <h4>Finding your location...</h4>
              <p>Requesting permission from your browser to synchronize nearby journeys.</p>
            </div>
          )}

          {/* 2. Success State */}
          {status === 'success' && detectedData && (
            <div className="location-state-container success">
              <div className="success-badge">
                <CheckCircle size={20} className="success-icon" aria-hidden="true" />
                <span>Location synchronized</span>
              </div>

              {detectedData.closestDestination && (
                <div className="closest-destination-card">
                  <span className="closest-eyebrow">NEAREST CURATED ESCAPE</span>
                  <div className="closest-info">
                    <img
                      src={detectedData.closestDestination.cardImage}
                      alt={detectedData.closestDestination.name}
                      className="closest-thumb"
                    />
                    <div className="closest-text">
                      <h4 className="closest-name">{detectedData.closestDestination.name}</h4>
                      <p className="closest-country">{detectedData.closestDestination.country}</p>
                      <span className="closest-dist">
                        ~{detectedData.closestDestination.distanceKm.toLocaleString()} km away
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-accent btn-sm view-closest-btn"
                    onClick={() => {
                      onClose();
                      navigate(`/destination/${detectedData.closestDestination.id}`);
                    }}
                  >
                    <span>Explore {detectedData.closestDestination.name}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {detectedData.weather && (
                <div className="detected-local-weather">
                  <span className="local-weather-label">Your Current Atmosphere:</span>
                  <span className="local-weather-val">
                    {detectedData.weather.temp}°C, {detectedData.weather.condition}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 3. Denied State */}
          {status === 'denied' && (
            <div className="location-state-container denied">
              <AlertTriangle size={32} className="warning-icon" aria-hidden="true" />
              <h4>Location access is off.</h4>
              <p className="denied-desc">
                Your browser or device has blocked location permissions. Search for a destination instead:
              </p>

              <form onSubmit={handleManualSearch} className="modal-search-form">
                <div className="modal-input-wrap">
                  <Search size={16} className="modal-search-icon" aria-hidden="true" />
                  <input
                    type="text"
                    className="modal-search-input"
                    placeholder="Search for Kyoto, Santorini, Paris..."
                    value={manualQuery}
                    onChange={(e) => setManualQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn btn-primary modal-submit-btn">
                  Search
                </button>
              </form>
            </div>
          )}

          {/* 4. Error State */}
          {status === 'error' && (
            <div className="location-state-container error">
              <AlertTriangle size={32} className="warning-icon" aria-hidden="true" />
              <h4>We couldn't access your location.</h4>
              <p className="error-desc">{errorMessage || 'Unable to retrieve your current coordinates.'}</p>

              <div className="error-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleRequestLocation}
                >
                  Try again
                </button>
              </div>

              <div className="manual-divider">
                <span>or explore manually</span>
              </div>

              <form onSubmit={handleManualSearch} className="modal-search-form">
                <div className="modal-input-wrap">
                  <Search size={16} className="modal-search-icon" aria-hidden="true" />
                  <input
                    type="text"
                    className="modal-search-input"
                    placeholder="Search destination..."
                    value={manualQuery}
                    onChange={(e) => setManualQuery(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary modal-submit-btn">
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
