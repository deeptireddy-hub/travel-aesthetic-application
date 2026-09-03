import React, { useState, useEffect } from 'react';
import { fetchWeatherByCoordinates } from '../../services/weatherService';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, RefreshCw, AlertCircle } from 'lucide-react';
import './Weather.css';

export default function WeatherCard({ coordinates, fallbackMock, destinationName }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const loadWeather = async () => {
    if (!coordinates) return;
    setLoading(true);
    setError(null);

    const res = await fetchWeatherByCoordinates(coordinates.lat, coordinates.lon, fallbackMock);
    if (res.success && res.data) {
      setWeatherData(res.data);
      setIsLive(!res.isMock);
    } else {
      setError(res.error || 'Weather is temporarily unavailable.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, [coordinates?.lat, coordinates?.lon]);

  const getWeatherIcon = (cond) => {
    const c = (cond || '').toLowerCase();
    if (c.includes('rain')) return <CloudRain size={28} className="weather-state-icon rain" />;
    if (c.includes('clear') || c.includes('sun')) return <Sun size={28} className="weather-state-icon sun" />;
    if (c.includes('wind')) return <Wind size={28} className="weather-state-icon wind" />;
    return <Cloud size={28} className="weather-state-icon cloud" />;
  };

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="weather-card-container skeleton-card" aria-busy="true" aria-label="Loading weather details">
        <div className="weather-card-header">
          <div className="skeleton-line title skeleton-shimmer" />
          <div className="skeleton-pill skeleton-shimmer" />
        </div>
        <div className="weather-main-row">
          <div className="skeleton-temp skeleton-shimmer" />
          <div className="skeleton-desc skeleton-shimmer" />
        </div>
        <div className="weather-stats-grid">
          <div className="skeleton-stat skeleton-shimmer" />
          <div className="skeleton-stat skeleton-shimmer" />
          <div className="skeleton-stat skeleton-shimmer" />
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error && !weatherData) {
    return (
      <div className="weather-card-container error-card" role="alert">
        <div className="weather-error-content">
          <AlertCircle size={28} className="weather-error-icon" aria-hidden="true" />
          <div className="weather-error-text">
            <h4 className="error-heading">Weather is temporarily unavailable.</h4>
            <p className="error-subtext">Could not synchronize satellite atmospheric data for {destinationName}.</p>
          </div>
          <button type="button" className="btn btn-outline btn-retry" onClick={loadWeather}>
            <RefreshCw size={14} aria-hidden="true" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  // 3. Success State
  return (
    <div className="weather-card-container" role="region" aria-label={`Current weather in ${destinationName}`}>
      {/* Card Header with Live/Seasonal status indicator */}
      <div className="weather-card-header">
        <div className="weather-header-title">
          <span className="weather-eyebrow">Atmospheric Conditions</span>
          <h3 className="weather-location-name">{destinationName || 'Destination'}</h3>
        </div>
        <div className="weather-status-tag" title={isLive ? "OpenWeather Real-Time Feed" : "Seasonal Baseline"}>
          <span className={`status-dot ${isLive ? 'live' : 'demo'}`} />
          <span>{isLive ? 'Live Weather' : 'Seasonal Avg'}</span>
        </div>
      </div>

      {/* Main Temperature & Condition Row */}
      <div className="weather-main-row">
        <div className="weather-temp-group">
          {getWeatherIcon(weatherData.condition)}
          <div className="weather-temp-display">
            <span className="temp-number">{weatherData.temp}</span>
            <span className="temp-unit">°C</span>
          </div>
        </div>

        <div className="weather-condition-group">
          <span className="weather-condition-text">{weatherData.condition}</span>
          {weatherData.description && (
            <span className="weather-sub-desc">{weatherData.description}</span>
          )}
        </div>
      </div>

      {/* Atmospheric Metrics Grid */}
      <div className="weather-stats-grid">
        <div className="weather-stat-item">
          <div className="stat-label">
            <Thermometer size={14} className="stat-icon" aria-hidden="true" />
            <span>Feels like</span>
          </div>
          <span className="stat-value">{weatherData.feelsLike ?? weatherData.temp}°C</span>
        </div>

        <div className="weather-stat-item">
          <div className="stat-label">
            <Droplets size={14} className="stat-icon" aria-hidden="true" />
            <span>Humidity</span>
          </div>
          <span className="stat-value">{weatherData.humidity}%</span>
        </div>

        <div className="weather-stat-item">
          <div className="stat-label">
            <Wind size={14} className="stat-icon" aria-hidden="true" />
            <span>Wind</span>
          </div>
          <span className="stat-value">{weatherData.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
}
