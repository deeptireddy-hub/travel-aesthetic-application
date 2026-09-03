import React, { useState } from 'react';
import { Sun, CloudSun, Moon, Utensils, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function ItineraryDay({ day, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`itinerary-day-card ${isOpen ? 'expanded' : 'collapsed'}`}>
      {/* Day Header Trigger */}
      <button
        type="button"
        className="day-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`day-content-${day.dayNumber}`}
      >
        <div className="day-number-badge">
          <span className="day-label">DAY</span>
          <span className="day-digit">
            {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
          </span>
        </div>

        <div className="day-header-meta">
          <h3 className="day-theme-title">{day.theme}</h3>
          <span className="day-time-summary">Morning · Afternoon · Evening Milestones</span>
        </div>

        <div className="day-toggle-icon" aria-hidden="true">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {/* Day Content Timeline */}
      {isOpen && (
        <div id={`day-content-${day.dayNumber}`} className="day-content-timeline">
          {/* Morning Milestone */}
          {day.morning && (
            <div className="timeline-milestone morning">
              <div className="milestone-icon-col">
                <div className="milestone-icon-wrap morning">
                  <Sun size={16} aria-hidden="true" />
                </div>
                <div className="timeline-connector" aria-hidden="true" />
              </div>
              <div className="milestone-details">
                <span className="milestone-period">Morning</span>
                <h4 className="milestone-title">{day.morning.title}</h4>
                <p className="milestone-desc">{day.morning.description}</p>
              </div>
            </div>
          )}

          {/* Afternoon Milestone */}
          {day.afternoon && (
            <div className="timeline-milestone afternoon">
              <div className="milestone-icon-col">
                <div className="milestone-icon-wrap afternoon">
                  <CloudSun size={16} aria-hidden="true" />
                </div>
                <div className="timeline-connector" aria-hidden="true" />
              </div>
              <div className="milestone-details">
                <span className="milestone-period">Afternoon</span>
                <h4 className="milestone-title">{day.afternoon.title}</h4>
                <p className="milestone-desc">{day.afternoon.description}</p>
              </div>
            </div>
          )}

          {/* Evening Milestone */}
          {day.evening && (
            <div className="timeline-milestone evening">
              <div className="milestone-icon-col">
                <div className="milestone-icon-wrap evening">
                  <Moon size={16} aria-hidden="true" />
                </div>
              </div>
              <div className="milestone-details">
                <span className="milestone-period">Evening</span>
                <h4 className="milestone-title">{day.evening.title}</h4>
                <p className="milestone-desc">{day.evening.description}</p>
              </div>
            </div>
          )}

          {/* Optional Highlights (Food & Travel Notes) */}
          <div className="day-notes-grid">
            {day.foodRecommendation && (
              <div className="day-note-box food">
                <div className="note-box-header">
                  <Utensils size={14} className="note-icon food" aria-hidden="true" />
                  <span>Curated Dining</span>
                </div>
                <p className="note-box-text">{day.foodRecommendation}</p>
              </div>
            )}

            {day.travelNote && (
              <div className="day-note-box insight">
                <div className="note-box-header">
                  <Info size={14} className="note-icon insight" aria-hidden="true" />
                  <span>Editorial Tip</span>
                </div>
                <p className="note-box-text">{day.travelNote}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
