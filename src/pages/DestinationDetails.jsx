import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import WeatherCard from '../components/Weather/WeatherCard';
import FamousPlace from '../components/Places/FamousPlace';
import { ArrowLeft, Sparkles, Calendar, MapPin, Compass } from 'lucide-react';
import './DestinationDetails.css';

export default function DestinationDetails({ onOpenAIChat }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top on mount/route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const destination = DESTINATIONS.find(
    (d) => d.id.toLowerCase() === (id || '').toLowerCase()
  );

  // If destination id not found
  if (!destination) {
    return (
      <div className="destination-not-found container">
        <div className="not-found-inner">
          <Compass size={48} className="not-found-icon" aria-hidden="true" />
          <h1>Destination not found</h1>
          <p>We couldn't locate the destination you are looking for in our curated collection.</p>
          <Link to="/destinations" className="btn btn-primary">
            Explore all destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="destination-details-page">
      {/* 1. Large Immersive Hero Header */}
      <header className="details-hero">
        <div className="details-hero-bg-container">
          <img
            src={destination.heroImage}
            alt={`${destination.name}, ${destination.country}`}
            className="details-hero-image"
          />
          <div className="details-hero-overlay" />
        </div>

        <div className="container details-hero-content">
          <nav aria-label="Breadcrumbs" className="breadcrumbs-nav">
            <Link to="/destinations" className="back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Back to all destinations</span>
            </Link>
          </nav>

          <div className="details-hero-info">
            <div className="details-country-badge">
              <MapPin size={14} aria-hidden="true" />
              <span>{destination.country} · {destination.region}</span>
            </div>

            <h1 className="details-title">{destination.name.toUpperCase()}</h1>

            <p className="details-tagline italic-serif">
              "{destination.tagline || destination.description}"
            </p>

            <div className="details-hero-actions">
              <Link
                to={`/plan?dest=${destination.id}`}
                className="btn btn-accent"
              >
                <Calendar size={16} aria-hidden="true" />
                Plan a trip to {destination.name}
              </Link>

              <button
                type="button"
                className="btn btn-ghost-light"
                onClick={() =>
                  onOpenAIChat &&
                  onOpenAIChat(`What are the absolute highlights and best hidden gems in ${destination.name}?`)
                }
              >
                <Sparkles size={16} aria-hidden="true" />
                Ask AI about {destination.name}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Destination Overview & Live Weather Section */}
      <section className="section details-overview-section" aria-label="Overview and Weather">
        <div className="container details-overview-grid">
          <div className="overview-narrative">
            <span className="eyebrow">THE ESSENCE OF {destination.name.toUpperCase()}</span>
            <h2 className="overview-heading">
              A destination that leaves an <span className="italic-serif">indelible mark.</span>
            </h2>
            <p className="overview-text">{destination.description}</p>

            <div className="overview-category-list">
              <span className="category-label">Atmosphere & Style:</span>
              <div className="cat-tags">
                {destination.category?.map((c) => (
                  <span key={c} className="cat-tag-badge">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="quick-tip-box">
              <div className="tip-header">
                <Sparkles size={14} className="tip-sparkle" aria-hidden="true" />
                <span>Wanderly Insider Insight</span>
              </div>
              <p className="tip-text">
                For the most memorable experience, combine early morning explorations of sacred or outdoor sites with relaxed late afternoon café or teahouse downtime before the evening comes alive.
              </p>
            </div>
          </div>

          <div className="overview-weather-col">
            <WeatherCard
              coordinates={destination.coordinates}
              fallbackMock={destination.weatherMock}
              destinationName={destination.name}
            />
          </div>
        </div>
      </section>

      {/* 3. Famous Places Section */}
      <section className="section details-places-section" aria-label="Notable Places">
        <div className="container">
          <div className="places-section-header">
            <span className="eyebrow">WHAT TO SEE</span>
            <h2 className="places-subheading">
              See the places <span className="italic-serif">you'll remember.</span>
            </h2>
            <p className="places-header-desc">
              Carefully chosen monuments, historic enclaves, and breathtaking viewpoints that define the soul of {destination.name}.
            </p>
          </div>

          <div className="famous-places-list">
            {destination.famousPlaces?.map((place) => (
              <FamousPlace
                key={place.id}
                place={place}
                destinationName={destination.name}
                countryName={destination.country}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom Plan CTA */}
      <section className="details-cta-section">
        <div className="container details-cta-inner">
          <h2 className="details-cta-heading">
            Ready to experience {destination.name}?
          </h2>
          <p className="details-cta-desc">
            Let our AI travel assistant craft a bespoke day-by-day itinerary tailored to your rhythm, interests, and culinary palate.
          </p>
          <Link
            to={`/plan?dest=${destination.id}`}
            className="btn btn-accent btn-lg"
          >
            <Calendar size={18} aria-hidden="true" />
            Generate {destination.name} Itinerary
          </Link>
        </div>
      </section>
    </article>
  );
}
