import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import DestinationSearch from '../components/Destination/DestinationSearch';
import DestinationGrid from '../components/Destination/DestinationGrid';
import FamousPlace from '../components/Places/FamousPlace';
import { DESTINATIONS } from '../data/destinations';
import { Sparkles, ArrowRight, MessageSquare, Compass, Calendar } from 'lucide-react';
import './Home.css';

export default function Home({ onOpenAIChat }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter destinations based on search query and category
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

  // Featured places across destinations for the editorial section
  const featuredPlaces = useMemo(() => {
    const places = [];
    DESTINATIONS.forEach((d) => {
      if (d.famousPlaces && d.famousPlaces.length > 0) {
        places.push({
          ...d.famousPlaces[0],
          destName: d.name,
          destCountry: d.country,
          destId: d.id
        });
      }
    });
    return places.slice(0, 3); // Take top 3 editorial highlights
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <div className="home-page">
      {/* 1. Full Screen Cinematic Hero */}
      <Hero onSearch={(query) => setSearchQuery(query)} />

      {/* 2. Destination Explorer Section */}
      <section
        id="destinations-explorer"
        className="section destination-explorer-section"
        aria-label="Destination Explorer"
      >
        <div className="container">
          <div className="explorer-header">
            <div className="explorer-header-left">
              <span className="eyebrow">EXPLORE THE WORLD</span>
              <h2 className="explorer-heading">
                Places that feel <span className="italic-serif">like you.</span>
              </h2>
            </div>
            <Link to="/destinations" className="view-all-link">
              View all destinations <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Search Controls & Category Filter Pills */}
          <DestinationSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            resultCount={filteredDestinations.length}
          />

          {/* Cards Grid */}
          <DestinationGrid
            destinations={filteredDestinations}
            onResetFilters={handleResetFilters}
          />
        </div>
      </section>

      {/* 3. Editorial Notable Places Section */}
      <section id="famous-places" className="section famous-places-section" aria-label="Notable Places">
        <div className="container">
          <div className="places-section-header">
            <span className="eyebrow">WHAT TO SEE</span>
            <h2 className="places-subheading">
              See the places <span className="italic-serif">you'll remember.</span>
            </h2>
            <p className="places-header-desc">
              From morning mist through vermilion torii gates to cliffside Aegean tavernas, explore unforgettable milestones recommended by seasoned travelers.
            </p>
          </div>

          <div className="famous-places-list">
            {featuredPlaces.map((place) => (
              <FamousPlace
                key={place.id}
                place={place}
                destinationName={place.destName}
                countryName={place.destCountry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Travel Assistant Introduction Section */}
      <section
        id="ai-assistant-intro"
        className="section ai-assistant-intro-section"
        aria-label="AI Travel Assistant"
      >
        <div className="container">
          <div className="ai-intro-card">
            <div className="ai-intro-content">
              <div className="ai-intro-eyebrow">
                <Sparkles size={14} className="sparkle-icon" aria-hidden="true" />
                <span>INTELLIGENT TRAVEL CONCIERGE</span>
              </div>
              <h2 className="ai-intro-heading">
                Ask Wanderly anything.<br />
                <span className="italic-serif">Whenever inspiration strikes.</span>
              </h2>
              <p className="ai-intro-desc">
                Unsure how many days to budget for Kyoto, or wondering when to catch the Santorini sunset without the crowds? Our AI travel concierge is grounded in cultural intelligence and real-time insights.
              </p>

              <div className="ai-suggested-bubbles">
                <button
                  type="button"
                  className="ai-bubble"
                  onClick={() => onOpenAIChat && onOpenAIChat("How many days should I spend in Kyoto?")}
                >
                  "How many days should I spend in Kyoto?"
                </button>
                <button
                  type="button"
                  className="ai-bubble"
                  onClick={() => onOpenAIChat && onOpenAIChat("When is the best time to visit Santorini?")}
                >
                  "When is the best time to visit Santorini?"
                </button>
                <button
                  type="button"
                  className="ai-bubble"
                  onClick={() => onOpenAIChat && onOpenAIChat("What food should I try in Cape Town?")}
                >
                  "What food should I try in Cape Town?"
                </button>
              </div>

              <div className="ai-intro-actions">
                <button
                  type="button"
                  className="btn btn-accent ai-open-btn"
                  onClick={() => onOpenAIChat && onOpenAIChat()}
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  Chat with Wanderly AI
                </button>
                <Link to="/plan" className="btn btn-outline ai-plan-btn">
                  <Calendar size={16} aria-hidden="true" />
                  Generate Day-by-Day Itinerary
                </Link>
              </div>
            </div>

            <div className="ai-intro-visual" aria-hidden="true">
              <div className="ai-chat-preview-mockup">
                <div className="mockup-header">
                  <div className="mockup-dot red" />
                  <div className="mockup-dot yellow" />
                  <div className="mockup-dot green" />
                  <span className="mockup-title">Wanderly AI • Live</span>
                </div>
                <div className="mockup-body">
                  <div className="mockup-bubble user">
                    How many days should I spend in Kyoto?
                  </div>
                  <div className="mockup-bubble ai">
                    <span className="ai-badge-label">✦ Wanderly Concierge</span>
                    I recommend 3–4 days in Kyoto to experience the historic temples, traditional geisha neighborhoods, seasonal matcha teahouses, and bamboo groves without rushing.
                  </div>
                  <div className="mockup-bubble user">
                    What should I eat while there?
                  </div>
                  <div className="mockup-bubble ai typing">
                    <span className="dot-typing" />
                    <span className="dot-typing" />
                    <span className="dot-typing" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Complete Trip Itinerary Teaser Section */}
      <section className="section itinerary-teaser-section" aria-label="Trip Planner Teaser">
        <div className="container">
          <div className="itinerary-teaser-inner">
            <span className="eyebrow">YOUR BESPOKE JOURNEY</span>
            <h2 className="itinerary-teaser-heading">
              Turn your dream escape into a <span className="italic-serif">day-by-day reality.</span>
            </h2>
            <p className="itinerary-teaser-text">
              Select your destination, length of stay, and travel style. Wanderly crafts an editorial day-by-day schedule with morning, afternoon, and evening milestones, culinary spots, and insider tips.
            </p>
            <Link to="/plan" className="btn btn-primary itinerary-cta-btn">
              <Sparkles size={16} aria-hidden="true" />
              Build Your Itinerary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
