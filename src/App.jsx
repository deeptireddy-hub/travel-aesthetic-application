import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LocationPicker from './components/Location/LocationPicker';
import AIChat from './components/AI/AIChat';

// Pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import PlanTrip from './pages/PlanTrip';

export default function App() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');

  // Handler to open AI Chat with an optional inquiry prompt
  const handleOpenAIChat = (prompt = '') => {
    if (prompt) {
      setAiInitialPrompt(prompt);
    }
    setIsAIChatOpen(true);
  };

  return (
    <div className="app-root">
      {/* Top Global Navigation Bar */}
      <Navbar
        onLocationClick={() => setIsLocationModalOpen(true)}
      />

      {/* Main Routed Content */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home onOpenAIChat={handleOpenAIChat} />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route
            path="/destination/:id"
            element={<DestinationDetails onOpenAIChat={handleOpenAIChat} />}
          />
          <Route path="/plan" element={<PlanTrip />} />
        </Routes>
      </main>

      {/* Location Detection & Manual Search Modal */}
      <LocationPicker
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* Global AI Travel Concierge Assistant */}
      <AIChat
        isOpen={isAIChatOpen}
        onToggle={setIsAIChatOpen}
        initialPrompt={aiInitialPrompt}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
