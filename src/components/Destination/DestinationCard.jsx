import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Cloud, CloudRain, Wind, Sparkles, ArrowUpRight } from 'lucide-react';
import './Destination.css';

export default function DestinationCard({ destination }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Weather condition icon helper
  const getWeatherIcon = (condition) => {
    const cond = (condition || '').toLowerCase();
    if (cond.includes('sun') || cond.includes('clear')) return <Sun size={14} className="weather-icon-inline" />;
    if (cond.includes('rain')) return <CloudRain size={14} className="weather-icon-inline" />;
    if (cond.includes('wind') || cond.includes('breez')) return <Wind size={14} className="weather-icon-inline" />;
    return <Cloud size={14} className="weather-icon-inline" />;
  };

  const displayImage = imageError
    ? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop'
    : destination.cardImage || destination.heroImage;

  return (
    <article className="destination-card">
      <Link
        to={`/destination/${destination.id}`}
        className="destination-card-link"
        aria-label={`View ${destination.name}, ${destination.country}`}
      >
        {/* Card Media Container */}
        <div className="card-media-wrapper">
          {/* Skeleton placeholder until image loads */}
          {!imageLoaded && <div className="card-image-skeleton skeleton-shimmer" aria-hidden="true" />}

          <img
            src={displayImage}
            alt={`${destination.name}, ${destination.country} scenic view`}
            className={`destination-card-img ${imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />

          {/* Editorial Dark Overlay */}
          <div className="card-image-overlay" />

          {/* Top Floating Badges */}
          <div className="card-top-badges">
            <div className="card-category-badges">
              {destination.category?.slice(0, 2).map((cat) => (
                <span key={cat} className="card-cat-pill">
                  {cat}
                </span>
              ))}
            </div>

            {/* Live/Mock Weather Badge */}
            <div className="card-weather-badge" title="Live / Seasonal Weather">
              {getWeatherIcon(destination.weatherCondition)}
              <span className="weather-temp">{destination.temperature}°C</span>
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="card-bottom-content">
            <span className="card-country">{destination.country}</span>
            <div className="card-title-row">
              <h3 className="card-title">{destination.name}</h3>
              <div className="card-arrow-circle" aria-hidden="true">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <p className="card-description">{destination.description}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
