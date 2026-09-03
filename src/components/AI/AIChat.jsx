import React, { useState, useRef, useEffect } from 'react';
import { askGeminiTravelAssistant } from '../../services/geminiService';
import ChatMessage from './ChatMessage';
import { Sparkles, X, Send, RotateCcw, AlertCircle } from 'lucide-react';
import './AIChat.css';

export default function AIChat({ isOpen, onToggle, initialPrompt = '', activeDestination = null }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Greetings. I am your Wanderly Travel Concierge. Whether you need secret viewpoint recommendations, ideal days to allocate, or local culinary customs, ask me anything.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Suggested questions specified in assignment
  const suggestedQuestions = [
    'How many days should I spend in Kyoto?',
    'When is the best time to visit Kyoto?',
    'What should I eat in Kyoto?',
    'What should I see in 3 days?',
    'Is Kyoto good for solo travel?'
  ];

  // Auto scroll chat to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Handle external prompt trigger (e.g. from Hero or Destination Details page)
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    setErrorState(false);
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await askGeminiTravelAssistant(
        text,
        messages.filter((m) => m.id !== 'welcome'),
        activeDestination
      );

      if (response && response.success) {
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setErrorState(true);
      }
    } catch (err) {
      setErrorState(true);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-fresh',
        sender: 'ai',
        text: 'Conversation reset. Where shall we travel next?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorState(false);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        className={`floating-ai-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => onToggle(!isOpen)}
        aria-label={isOpen ? 'Close AI Travel Concierge' : 'Open AI Travel Concierge'}
        title="Ask Wanderly AI"
      >
        <Sparkles size={20} className="floating-sparkle" aria-hidden="true" />
        <span className="floating-ai-label">✦ Ask AI</span>
      </button>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="ai-chat-backdrop"
          onClick={() => onToggle(false)}
          aria-hidden="true"
        />
      )}

      {/* Animated Chat Panel Drawer */}
      <aside
        className={`ai-chat-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Wanderly AI Travel Assistant"
        aria-modal="true"
      >
        {/* Panel Header */}
        <header className="chat-panel-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar" aria-hidden="true">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="chat-title">Wanderly AI</h3>
              <div className="chat-status-indicator">
                <span className="online-dot" aria-hidden="true" />
                <span className="status-label">Online</span>
              </div>
            </div>
          </div>

          <div className="chat-header-actions">
            <button
              type="button"
              className="chat-action-btn"
              onClick={handleClearHistory}
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RotateCcw size={15} />
            </button>
            <button
              type="button"
              className="chat-action-btn"
              onClick={() => onToggle(false)}
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Chat Messages Body */}
        <div className="chat-panel-body" tabIndex={0} aria-label="Conversation history">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Typing indicator state */}
          {isTyping && (
            <div className="chat-message-row ai-row">
              <div className="chat-avatar ai-avatar">
                <Sparkles size={14} />
              </div>
              <div className="chat-bubble ai-bubble-content typing-bubble">
                <div className="typing-dots">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <span className="typing-text">Wanderly AI is consulting travel archives...</span>
              </div>
            </div>
          )}

          {/* AI Error State */}
          {errorState && (
            <div className="chat-error-banner" role="alert">
              <AlertCircle size={18} className="chat-error-icon" aria-hidden="true" />
              <div className="chat-error-msg">
                <strong>Your travel assistant is taking a short break.</strong>
                <p>Unable to synchronize with intelligence servers right now.</p>
              </div>
              <button
                type="button"
                className="btn btn-outline btn-sm chat-retry-btn"
                onClick={() => {
                  setErrorState(false);
                  const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
                  if (lastUserMsg) handleSendMessage(lastUserMsg.text);
                }}
              >
                Try again
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="chat-suggestions-tray" aria-label="Suggested questions">
          <span className="suggestions-label">Suggested Inquiries:</span>
          <div className="suggestions-scroll">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="suggestion-chip"
                onClick={() => handleSendMessage(q)}
                disabled={isTyping}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Footer */}
        <form className="chat-input-footer" onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chat-text-input"
            placeholder="Ask anything about destinations, dining, pacing..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            aria-label="Your travel inquiry"
          />
          <button
            type="submit"
            className="btn btn-primary chat-send-btn"
            disabled={!inputText.trim() || isTyping}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </aside>
    </>
  );
}
