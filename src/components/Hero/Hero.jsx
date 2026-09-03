import React, { useState } from 'react';
import { Search, Sparkles, Clock, Globe, ArrowDown } from 'lucide-react';
import './Hero.css';

export default function Hero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
    // Smooth scroll down to destination explorer
    const explorerEl = document.getElementById('destinations-explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollClick = () => {
    const explorerEl = document.getElementById('destinations-explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" aria-label="Welcome Hero">
      {/* Background Video with Dark Editorial Overlay */}
      <div className="hero-video-container" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop"
        >
          <source src="/videos/travel-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero-content container">
        <span className="eyebrow hero-eyebrow animate-fade-down">
          YOUR NEXT STORY STARTS HERE
        </span>

        <h1 className="hero-heading animate-fade-up">
          Go somewhere<br />
          <span className="italic-serif hero-heading-accent">worth remembering.</span>
        </h1>

        <p className="hero-subheading animate-fade-up">
          Discover beautiful places, live weather and a smarter way to plan your next escape.
        </p>

        {/* Prominent Editorial Search Bar */}
        <form className="hero-search-form animate-fade-up" onSubmit={handleSubmit} role="search">
          <div className="hero-search-input-wrapper">
            <Search className="hero-search-icon" size={20} aria-hidden="true" />
            <input
              type="text"
              className="hero-search-input"
              placeholder="Where do you want to go? (e.g. Kyoto, Santorini, Paris)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search destination"
            />
          </div>
          <button type="submit" className="btn btn-accent hero-search-btn">
            Explore
          </button>
        </form>

        {/* Feature Badges */}
        <div className="hero-badges animate-fade-up">
          <div className="hero-badge">
            <Globe size={14} className="badge-icon" aria-hidden="true" />
            <span>Curated destinations</span>
          </div>
          <div className="hero-badge-separator" aria-hidden="true">•</div>
          <div className="hero-badge">
            <Clock size={14} className="badge-icon" aria-hidden="true" />
            <span>Live weather</span>
          </div>
          <div className="hero-badge-separator" aria-hidden="true">•</div>
          <div className="hero-badge">
            <Sparkles size={14} className="badge-icon" aria-hidden="true" />
            <span>AI trip planner</span>
          </div>
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <button
        type="button"
        className="hero-scroll-indicator"
        onClick={handleScrollClick}
        aria-label="Scroll down to destinations"
      >
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <div className="scroll-icon-wrapper">
          <ArrowDown size={14} className="scroll-arrow" aria-hidden="true" />
        </div>
      </button>
    </section>
  );
}
