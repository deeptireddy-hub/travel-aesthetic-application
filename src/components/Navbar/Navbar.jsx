import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, MapPin, Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onLocationClick, isLocationLoading }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handlePlacesClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      const el = document.getElementById('famous-places');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#famous-places');
    }
  };

  return (
    <header
      className={`navbar-header ${isScrolled || !isHomePage ? 'scrolled' : 'transparent'} ${
        mobileMenuOpen ? 'menu-active' : ''
      }`}
      role="banner"
    >
      <div className="navbar-container">
        {/* Brand Wordmark */}
        <Link to="/" className="navbar-brand" aria-label="Wanderly - Home">
          <Compass className="navbar-logo-icon" aria-hidden="true" size={24} />
          <span className="brand-text">
            Wander<span className="brand-accent">ly</span>
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <Link
                to="/destinations"
                className={`nav-link ${location.pathname === '/destinations' ? 'active' : ''}`}
              >
                Explore
              </Link>
            </li>
            <li>
              <a
                href="#famous-places"
                onClick={handlePlacesClick}
                className="nav-link"
              >
                Places
              </a>
            </li>
            <li>
              <Link
                to="/plan"
                className={`nav-link plan-link ${location.pathname === '/plan' ? 'active' : ''}`}
              >
                <Sparkles size={14} className="nav-sparkle" aria-hidden="true" />
                Plan a trip
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right CTA Actions */}
        <div className="navbar-actions desktop-actions">
          <button
            type="button"
            className="btn-location"
            onClick={onLocationClick}
            aria-label="Detect my current location"
            disabled={isLocationLoading}
          >
            <MapPin size={16} className={`location-pin-icon ${isLocationLoading ? 'pulsing' : ''}`} aria-hidden="true" />
            <span>{isLocationLoading ? 'Locating...' : 'Use my location'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="navbar-toggle mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            <li>
              <Link to="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/destinations"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Destinations
              </Link>
            </li>
            <li>
              <a
                href="#famous-places"
                className="mobile-nav-link"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handlePlacesClick(e);
                }}
              >
                Notable Places
              </a>
            </li>
            <li>
              <Link
                to="/plan"
                className="mobile-nav-link mobile-plan-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={16} aria-hidden="true" />
                Plan a Trip
              </Link>
            </li>
          </ul>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="btn-location mobile-btn-location"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onLocationClick) onLocationClick();
              }}
              disabled={isLocationLoading}
            >
              <MapPin size={16} aria-hidden="true" />
              <span>{isLocationLoading ? 'Locating...' : 'Use my location'}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
