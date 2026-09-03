import React, { useState } from 'react';
import { MapPin, Clock, Heart, Sparkles } from 'lucide-react';
import './FamousPlaces.css';

export default function FamousPlace({ place, destinationName, countryName }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="famous-place-card">
      {/* Image Container */}
      <div className="place-image-wrapper">
        {!imageLoaded && <div className="place-skeleton skeleton-shimmer" aria-hidden="true" />}
        <img
          src={place.image}
          alt={place.name}
          className={`place-image ${imageLoaded ? 'loaded' : 'loading'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop';
            setImageLoaded(true);
          }}
        />
        <button
          type="button"
          className={`place-favorite-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={() => setIsFavorited(!isFavorited)}
          aria-label={isFavorited ? `Remove ${place.name} from saved` : `Save ${place.name}`}
          title={isFavorited ? "Saved to favorites" : "Save to favorites"}
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Place Details */}
      <div className="place-content">
        <div className="place-header">
          <div className="place-location-tag">
            <MapPin size={14} className="pin-icon" aria-hidden="true" />
            <span>{place.neighborhood}{destinationName ? ` · ${destinationName}` : ''}</span>
          </div>
          <h3 className="place-title">{place.name}</h3>
        </div>

        <p className="place-description">{place.description}</p>

        {/* Best Time to Visit Feature */}
        {place.bestTime && (
          <div className="place-best-time">
            <Clock size={14} className="clock-icon" aria-hidden="true" />
            <div>
              <span className="best-time-label">Insider Best Time:</span>
              <span className="best-time-text">{place.bestTime}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
