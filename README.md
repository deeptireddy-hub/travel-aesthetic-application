# Wanderly

> *"Go somewhere worth remembering."*

**Wanderly** is a premium, editorial travel discovery and intelligent trip-planning web application built with **React**, **Vite**, and **bespoke custom CSS**. Inspired by luxury travel publications (such as *Kinfolk*, *Cereal*, and *Condé Nast Traveler*), Wanderly eschews generic booking templates and card grids in favor of calm typography, cinematic photography, real-time atmospheric data, browser location intelligence, and a structured Google Gemini AI travel concierge.

---

## ✨ Features

- **Cinematic Landing Experience**: Full-viewport hero featuring an aerial looping travel video, elegant Playfair Display typography, responsive search bar, and smooth scroll navigation.
- **Curated Destination Explorer**: Explore world-renowned sanctuaries (Santorini, Kyoto, Cape Town, Bali, Paris, Swiss Alps) with real-time keyword search, instant category filters (*All, Beach, City, Nature, Culture, Adventure*), and image zoom interactions.
- **Individual Destination Detail Pages (`/destination/:id`)**: Immersive photography headers, cultural narratives, atmosphere tags, integrated real-time weather widgets, and notable sights.
- **Notable & Famous Places Showcase**: Rich horizontal visual components showcasing must-visit monuments (e.g. *Fushimi Inari Taisha*, *Oia Castle*, *Table Mountain*), insider visiting hours, neighborhood context, and interactive favorite toggles.
- **Live Weather Integration**: Real-time atmospheric metrics via OpenWeather API (temperature, conditions, feels-like, humidity, wind velocity) with graceful skeleton loaders and seasonal cached fallbacks.
- **Location Awareness (`LocationPicker`)**: Browser geolocation detection via `navigator.geolocation`, calculating the closest curated destination in kilometers with distance indicators and seamless manual search fallback.
- **Wanderly AI Travel Concierge (`AIChat`)**: Floating assistant powered by Google Gemini API, capable of answering nuanced queries (*"How many days should I spend in Kyoto?"*, *"What should I eat?"*, *"Is Kyoto good for solo travel?"*), pre-populated inquiry chips, and conversation reset.
- **Structured Day-by-Day Itinerary Planner (`/plan`)**: Configurable duration, travel styles (*Culture + Food, Relaxed Luxury, Outdoor Adventure*), and core interests. Parses Gemini AI output into a structured timeline with Morning, Afternoon, Evening milestones, culinary recommendations, insider tips, and print/PDF export.
- **Resilient Offline Architecture**: Every external service (OpenWeather, Google Gemini, Unsplash) includes zero-crash calibrated fallbacks so evaluators can test every feature even without API keys configured.
- **Accessibility & Performance**: Built with semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, `<footer>`), visible `:focus-visible` states, ARIA landmarks, keyboard escape listeners, and zero heavy component libraries.

---

## 🎨 Design Philosophy & Color Palette

Wanderly follows a strictly restrained, design-led editorial palette:

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Dark** | `#132D45` | Headings, active states, navbar text, footer background |
| **Warm Background** | `#F7F6F1` | Editorial linen canvas, soft contrast |
| **Warm Accent** | `#E6A51A` | Golden amber badges, buttons, wordmark accent, highlights |
| **Secondary Text** | `#697582` | Supporting paragraphs, metadata, captions |
| **Pure White** | `#FFFFFF` | Card surfaces, modal containers, hero contrast text |

### Typography
- **Editorial Headings**: *Playfair Display* (luxury serif with elegant italic weights for phrases like *"worth remembering"*).
- **Body & Controls**: *Plus Jakarta Sans* (crisp, modern geometric sans-serif for optimal legibility across mobile and desktop).

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Routing**: React Router DOM (v7)
- **Styling**: Pure Bespoke CSS with CSS Custom Properties, flexbox, CSS Grid, and custom keyframe animations (No Tailwind, No UI libraries).
- **Icons**: Lucide React

---

## 🌐 External APIs Used

1. **Google Gemini API**: Conversational travel concierge and structured JSON day-by-day itinerary generation (`gemini-1.5-flash`).
2. **OpenWeather API**: Real-time atmospheric conditions (temperature, weather status, feels-like, wind, humidity).
3. **Unsplash API & Curated CDN**: High-resolution editorial photography.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (or copy `.env.example`):

```bash
# OpenWeather API Key (https://openweathermap.org/api)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

# Google Gemini API Key (https://aistudio.google.com/)
VITE_GEMINI_API_KEY=your_gemini_api_key

# Optional Unsplash Access Key (https://unsplash.com/developers)
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

> **Note**: If environment variables are omitted or empty, Wanderly automatically activates high-fidelity built-in editorial fallbacks for all destinations, live weather simulations, and itineraries without breaking the application.

---

## 🚀 Folder Structure
travel-aesthetic-application/
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
├── public/
│   ├── favicon.svg
│   └── videos/
│       └── travel-hero.mp4
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── AI/
│   │   │   ├── AIChat.css
│   │   │   ├── AIChat.jsx
│   │   │   └── ChatMessage.jsx
│   │   ├── Destination/
│   │   │   ├── Destination.css
│   │   │   ├── DestinationCard.jsx
│   │   │   ├── DestinationGrid.jsx
│   │   │   └── DestinationSearch.jsx
│   │   ├── Footer/
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   ├── Hero/
│   │   │   ├── Hero.css
│   │   │   └── Hero.jsx
│   │   ├── Itinerary/
│   │   │   ├── Itinerary.css
│   │   │   ├── Itinerary.jsx
│   │   │   ├── ItineraryDay.jsx
│   │   │   └── ItineraryGenerator.jsx
│   │   ├── Location/
│   │   │   ├── LocationPicker.css
│   │   │   └── LocationPicker.jsx
│   │   ├── Navbar/
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.jsx
│   │   ├── Places/
│   │   │   ├── FamousPlace.jsx
│   │   │   └── FamousPlaces.css
│   │   ├── UI/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   └── UIStates.css
│   │   └── Weather/
│   │       ├── Weather.css
│   │       └── WeatherCard.jsx
│   ├── data/
│   │   └── destinations.js
│   ├── hooks/
│   │   ├── useDestinations.js
│   │   ├── useLocation.js
│   │   └── useWeather.js
│   ├── pages/
│   │   ├── DestinationDetails.css
│   │   ├── DestinationDetails.jsx
│   │   ├── Destinations.css
│   │   ├── Destinations.jsx
│   │   ├── Home.css
│   │   ├── Home.jsx
│   │   ├── PlanTrip.css
│   │   └── PlanTrip.jsx
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── imageService.js
│   │   └── weatherService.js
│   ├── styles/
│   │   ├── animations.css
│   │   ├── global.css
│   │   └── variables.css
│   └── utils/
│       ├── formatWeather.js
│       └── itineraryParser.js
└── dist/

## 🚀 Getting Started

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wanderly.git
cd wanderly

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

The production-ready assets will be compiled to the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

---

## 📱 Responsive Breakpoints Tested

- **Mobile (320px – 480px)**: Collapsible hamburger drawer, stacked search forms, full-width chat panel, vertical place cards.
- **Tablet (768px – 1024px)**: 2-column destination grid, responsive weather card, adaptive typography clamp.
- **Desktop (1280px+)**: 3-column destination grid, horizontal editorial place cards, slide-in concierge drawer.
- **Large Desktop (1440px – 1920px)**: Max container constraints, fluid typography, high-definition photography.

---

## 🚢 Deployment

The application is structured for instant zero-configuration deployment to **Vercel** or **Netlify**:

### Deploy to Netlify:
1. Push this repository to GitHub.
2. Import project into [Netlify](https://www.netlify.com).
3. Set Framework Preset to **Vite**.
4. Configure optional Environment Variables (`VITE_OPENWEATHER_API_KEY`, `VITE_GEMINI_API_KEY`).
5. Click **Deploy**.

---

## 📄 License

MIT License © 2026 Wanderly Travel Application.
