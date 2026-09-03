import React, { useState } from 'react';
import ItineraryDay from './ItineraryDay';
import { Calendar, Printer, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import './Itinerary.css';

export default function Itinerary({ itinerary, onReset }) {
  const [copied, setCopied] = useState(false);

  if (!itinerary || !itinerary.days) return null;

  const handleCopy = () => {
    let plainText = `${itinerary.title || 'Wanderly Trip Itinerary'} - ${itinerary.destination}\n\n`;
    plainText += `${itinerary.summary}\n\n`;

    itinerary.days.forEach((d) => {
      plainText += `--- DAY ${d.dayNumber}: ${d.theme} ---\n`;
      if (d.morning) plainText += `Morning: ${d.morning.title} - ${d.morning.description}\n`;
      if (d.afternoon) plainText += `Afternoon: ${d.afternoon.title} - ${d.afternoon.description}\n`;
      if (d.evening) plainText += `Evening: ${d.evening.title} - ${d.evening.description}\n`;
      if (d.foodRecommendation) plainText += `Dining: ${d.foodRecommendation}\n`;
      if (d.travelNote) plainText += `Insider Tip: ${d.travelNote}\n`;
      plainText += `\n`;
    });

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="itinerary-display-container" aria-label="Generated Travel Itinerary">
      {/* Header Banner */}
      <header className="itinerary-editorial-header">
        <div className="itinerary-badge-eyebrow">
          <Sparkles size={14} className="badge-sparkle" aria-hidden="true" />
          <span>YOUR {itinerary.daysCount || itinerary.days.length}-DAY ITINERARY</span>
        </div>

        <h2 className="itinerary-display-title">
          {itinerary.destination} <span className="italic-serif">Bespoke Experience</span>
        </h2>

        {itinerary.summary && (
          <p className="itinerary-editorial-summary">
            "{itinerary.summary}"
          </p>
        )}

        {/* Action Controls */}
        <div className="itinerary-header-actions no-print">
          <button
            type="button"
            className="btn btn-outline btn-sm action-pill"
            onClick={handleCopy}
            aria-label="Copy itinerary text"
          >
            {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to clipboard' : 'Copy Itinerary'}</span>
          </button>

          <button
            type="button"
            className="btn btn-outline btn-sm action-pill"
            onClick={handlePrint}
            aria-label="Print itinerary"
          >
            <Printer size={14} />
            <span>Print / Save PDF</span>
          </button>

          {onReset && (
            <button
              type="button"
              className="btn btn-outline btn-sm action-pill"
              onClick={onReset}
              aria-label="Create new itinerary"
            >
              <RotateCcw size={14} />
              <span>Modify Preferences</span>
            </button>
          )}
        </div>
      </header>

      {/* Structured Days List */}
      <div className="itinerary-days-wrapper">
        {itinerary.days.map((day, idx) => (
          <ItineraryDay key={day.dayNumber || idx} day={day} defaultOpen={idx < 2} />
        ))}
      </div>
    </section>
  );
}
