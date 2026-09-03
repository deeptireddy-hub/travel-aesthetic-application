import React, { useState } from 'react';
import { generateGeminiItinerary } from '../../services/geminiService';
import { DESTINATIONS } from '../../data/destinations';
import { Sparkles, Calendar, Compass, AlertCircle, Loader2 } from 'lucide-react';
import './Itinerary.css';

export default function ItineraryGenerator({ onItineraryGenerated, initialDestination = '' }) {
  const [destination, setDestination] = useState(initialDestination || 'Kyoto');
  const [days, setDays] = useState(4);
  const [travelStyle, setTravelStyle] = useState('Culture + Food');
  const [selectedInterests, setSelectedInterests] = useState(['Temples & Heritage', 'Local Culinary']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const styleOptions = [
    'Culture + Food',
    'Relaxed Luxury',
    'Outdoor Adventure',
    'Art & Architecture',
    'Romantic Escape'
  ];

  const interestOptions = [
    'Temples & Heritage',
    'Local Culinary',
    'Scenic Vistas',
    'Hidden Gems',
    'Artisan Crafts',
    'Nature Walks',
    'Nightlife & Taverns'
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const result = await generateGeminiItinerary({
        destination,
        days: parseInt(days, 10),
        travelStyle,
        interests: selectedInterests
      });

      if (result && result.success && result.itinerary) {
        onItineraryGenerated(result.itinerary);
      } else {
        setError('Itinerary generation failed. Please try again.');
      }
    } catch (err) {
      setError('Itinerary generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="itinerary-generator-box">
      <div className="generator-header">
        <span className="eyebrow">INTELLIGENT TRIP ARCHITECT</span>
        <h2 className="generator-title">
          Curate Your <span className="italic-serif">Next Journey</span>
        </h2>
        <p className="generator-subtitle">
          Select your destination and rhythm. Wanderly synthesizes cultural landmarks, culinary recommendations, and optimal timing into a structured day-by-day plan.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="generator-form">
        {/* Destination Selection */}
        <div className="form-group">
          <label htmlFor="destination-select" className="form-label">
            <Compass size={15} className="label-icon" aria-hidden="true" />
            <span>Destination</span>
          </label>
          <select
            id="destination-select"
            className="form-select"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={loading}
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}, {d.country}
              </option>
            ))}
          </select>
        </div>

        {/* Days Count Selector */}
        <div className="form-group">
          <label className="form-label">
            <Calendar size={15} className="label-icon" aria-hidden="true" />
            <span>Length of Stay ({days} Days)</span>
          </label>
          <div className="days-pills-row" role="radiogroup" aria-label="Trip duration in days">
            {[2, 3, 4, 5, 7].map((num) => (
              <button
                key={num}
                type="button"
                role="radio"
                aria-checked={days === num}
                className={`days-pill ${days === num ? 'active' : ''}`}
                onClick={() => setDays(num)}
                disabled={loading}
              >
                {num} Days
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style Selector */}
        <div className="form-group">
          <label className="form-label">Travel Style</label>
          <div className="style-pills-row">
            {styleOptions.map((style) => (
              <button
                key={style}
                type="button"
                className={`style-pill ${travelStyle === style ? 'active' : ''}`}
                onClick={() => setTravelStyle(style)}
                disabled={loading}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Select Interests */}
        <div className="form-group">
          <label className="form-label">Core Interests (Optional)</label>
          <div className="interests-pills-row">
            {interestOptions.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  className={`interest-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleInterest(interest)}
                  disabled={loading}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="generator-error-box" role="alert">
            <AlertCircle size={18} className="error-icon" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-accent btn-lg generate-submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spinner-inline" aria-hidden="true" />
              <span>Architecting Bespoke Itinerary...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} aria-hidden="true" />
              <span>Generate itinerary ✦</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
