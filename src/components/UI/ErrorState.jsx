import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './UIStates.css';

export default function ErrorState({
  title = 'Something unexpected occurred',
  message = 'We could not complete your request. Please try again.',
  onRetry
}) {
  return (
    <div className="ui-state-container error-state" role="alert">
      <div className="state-icon-circle error">
        <AlertCircle size={28} className="error-icon" aria-hidden="true" />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-description">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline state-retry-btn" onClick={onRetry}>
          <RefreshCw size={14} aria-hidden="true" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
