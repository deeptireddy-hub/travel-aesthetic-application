import React, { useState, useMemo } from 'react';
import DestinationSearch from '../components/Destination/DestinationSearch';
import DestinationGrid from '../components/Destination/DestinationGrid';
import { DESTINATIONS } from '../data/destinations';
import './Destinations.css';

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.category.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategory === 'All' || dest.category.includes(activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="destinations-page">
      {/* Header Banner */}
      <header className="destinations-page-hero">
        <div className="container">
          <span className="eyebrow">CURATED DISCOVERY</span>
          <h1 className="destinations-page-title">
            Journeys Crafted for <span className="italic-serif">the Curious.</span>
          </h1>
          <p className="destinations-page-lead">
            Explore world-renowned sanctuaries, timeless cultural epicenters, and pristine natural wonders. Each location features live climate data, notable sights, and bespoke itineraries.
          </p>
        </div>
      </header>

      {/* Main Grid Area */}
      <main className="container destinations-main-content">
        <DestinationSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          resultCount={filteredDestinations.length}
        />

        <div className="results-status-bar">
          <span className="results-count-text">
            Showing <strong>{filteredDestinations.length}</strong> of {DESTINATIONS.length} curated destinations
          </span>
        </div>

        <DestinationGrid
          destinations={filteredDestinations}
          onResetFilters={handleResetFilters}
        />
      </main>
    </div>
  );
}
