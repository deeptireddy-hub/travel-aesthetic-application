import React from 'react';
import DestinationCard from './DestinationCard';
import { Compass } from 'lucide-react';
import './Destination.css';

export default function DestinationGrid({ destinations, onResetFilters }) {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="empty-destinations-state" role="status">
        <div className="empty-icon-circle">
          <Compass size={32} className="empty-compass-icon" aria-hidden="true" />
        </div>
        <h3 className="empty-state-title">No places found.</h3>
        <p className="empty-state-subtitle">
          Try searching for another destination or reset filters to explore our curated collection.
        </p>
        <button
          type="button"
          className="btn btn-primary empty-reset-btn"
          onClick={onResetFilters}
        >
          Explore destinations
        </button>
      </div>
    );
  }

  return (
    <div className="destinations-grid" role="region" aria-label="Destinations List">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} destination={dest} />
      ))}
    </div>
  );
}
