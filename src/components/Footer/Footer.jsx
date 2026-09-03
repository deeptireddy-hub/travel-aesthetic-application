import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="wanderly-footer" role="contentinfo">
      <div className="container footer-container">
        {/* Brand & Editorial Mission */}
        <div className="footer-brand-column">
          <Link to="/" className="footer-logo">
            <Compass className="footer-logo-icon" size={24} aria-hidden="true" />
            <span className="footer-brand-name">
              Wander<span className="brand-accent">ly</span>
            </span>
          </Link>
          <p className="footer-tagline">
            "Go somewhere <span className="italic-serif">worth remembering."</span>
          </p>
          <p className="footer-description">
            A premium editorial travel discovery and AI itinerary companion crafted for mindful explorers seeking authentic encounters.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-links-column">
          <h4 className="footer-col-title">Explore</h4>
          <ul className="footer-nav-list">
            <li><Link to="/destinations">All Destinations</Link></li>
            <li><Link to="/destination/kyoto">Kyoto, Japan</Link></li>
            <li><Link to="/destination/santorini">Santorini, Greece</Link></li>
            <li><Link to="/destination/cape-town">Cape Town, South Africa</Link></li>
            <li><Link to="/destination/swiss-alps">Swiss Alps, Switzerland</Link></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4 className="footer-col-title">Travel Smarter</h4>
          <ul className="footer-nav-list">
            <li><Link to="/plan">AI Trip Planner</Link></li>
            <li><a href="#famous-places">Notable Places</a></li>
            <li><a href="#ai-assistant-intro">Wanderly Assistant</a></li>
            <li><Link to="/destinations?category=Culture">Cultural Journeys</Link></li>
            <li><Link to="/destinations?category=Nature">Nature & Solitude</Link></li>
          </ul>
        </div>

        {/* Editorial Note & Tech info */}
        <div className="footer-note-column">
          <h4 className="footer-col-title">Crafted With Intent</h4>
          <p className="footer-note-text">
            Designed with restrained typography, real-time OpenWeather data, Google Gemini AI, and curated photography.
          </p>
          <div className="footer-badge">
            <Sparkles size={14} className="footer-badge-icon" aria-hidden="true" />
            <span>Intelligent Travel Discovery</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} Wanderly Travel Publication. All rights reserved.
          </p>
          <p className="footer-credit">
            Built with React, Vite & custom CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
