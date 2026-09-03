import React from 'react';
import { Loader2 } from 'lucide-react';
import './UIStates.css';

export default function LoadingState({ message = 'Loading extraordinary destinations...' }) {
  return (
    <div className="ui-state-container loading-state" role="status" aria-live="polite">
      <Loader2 size={36} className="state-spinner" aria-hidden="true" />
      <h3 className="state-title">{message}</h3>
      <p className="state-description">Synchronizing satellite atmosphere and curated archives.</p>
    </div>
  );
}
