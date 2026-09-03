import React from 'react';
import { Compass } from 'lucide-react';
import './UIStates.css';

export default function EmptyState({
  title = 'No places found.',
  message = 'Try another destination or explore our curated collection.',
  actionLabel = 'Explore destinations',
  onAction
}) {
  return (
    <div className="ui-state-container empty-state" role="status">
      <div className="state-icon-circle empty">
        <Compass size={32} className="empty-icon" aria-hidden="true" />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{message}</p>
      {onAction && (
        <button type="button" className="btn btn-primary state-action-btn" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
