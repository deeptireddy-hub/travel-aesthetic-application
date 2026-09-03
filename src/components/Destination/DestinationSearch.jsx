import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../../data/destinations';
import './Destination.css';

export default function DestinationSearch({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  resultCount
}) {
  return (
    <div className="destination-search-controls" role="search" aria-label="Destination search and filter">
      {/* Search Input Bar */}
      <div className="explorer-search-wrapper">
        <Search size={18} className="search-bar-icon" aria-hidden="true" />
        <input
          type="text"
          className="explorer-search-input"
          placeholder="Search by city, country, or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Filter destinations by keyword"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search input"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="category-filters-container" role="tablist" aria-label="Destination categories">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
