import React from 'react';
import { Sparkles, User } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  // Format simple markdown bold and bullet points cleanly
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      // Bullet items
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        const cleanBullet = line.replace(/^[•\-\*]\s*/, '');
        return (
          <div key={idx} className="chat-bullet-line">
            <span className="bullet-bullet" aria-hidden="true">•</span>
            <span>{renderInlineBold(cleanBullet)}</span>
          </div>
        );
      }
      return (
        <p key={idx} className="chat-text-paragraph">
          {renderInlineBold(line)}
        </p>
      );
    });
  };

  const renderInlineBold = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`chat-message-row ${isUser ? 'user-row' : 'ai-row'}`}>
      {!isUser && (
        <div className="chat-avatar ai-avatar" aria-hidden="true">
          <Sparkles size={14} />
        </div>
      )}

      <div className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble-content'}`}>
        {!isUser && <span className="ai-bubble-tag">Wanderly Concierge</span>}
        <div className="chat-message-body">{renderFormattedText(message.text)}</div>
        <span className="chat-timestamp">
          {message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <div className="chat-avatar user-avatar" aria-hidden="true">
          <User size={14} />
        </div>
      )}
    </div>
  );
}
