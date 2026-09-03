import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItineraryGenerator from '../components/Itinerary/ItineraryGenerator';
import Itinerary from '../components/Itinerary/Itinerary';
import { DESTINATIONS } from '../data/destinations';
import { Sparkles } from 'lucide-react';
import './PlanTrip.css';

export default function PlanTrip() {
  const [searchParams] = useSearchParams();
  const destParam = searchParams.get('dest');

  // Match initial destination from URL query if available
  const initialDestName = () => {
    if (!destParam) return 'Kyoto';
    const match = DESTINATIONS.find((d) => d.id.toLowerCase() === destParam.toLowerCase());
    return match ? match.name : 'Kyoto';
  };

  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [generatedItinerary]);

  return (
    <div className="plan-trip-page">
      {/* Top Banner */}
      <header className="plan-page-hero">
        <div className="container">
          <div className="plan-eyebrow">
            <Sparkles size={14} className="eyebrow-icon" aria-hidden="true" />
            <span>AI TRIP ARCHITECT</span>
          </div>
          <h1 className="plan-page-title">
            Your Journey, <span className="italic-serif">Intelligently Conceived.</span>
          </h1>
          <p className="plan-page-subtitle">
            Generate an immersive day-by-day travel narrative structured into morning, afternoon, and evening milestones, accompanied by authentic culinary reservations and insider tips.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container plan-page-main">
        {!generatedItinerary ? (
          <ItineraryGenerator
            initialDestination={initialDestName()}
            onItineraryGenerated={(itin) => setGeneratedItinerary(itin)}
          />
        ) : (
          <Itinerary
            itinerary={generatedItinerary}
            onReset={() => setGeneratedItinerary(null)}
          />
        )}
      </main>
    </div>
  );
}
