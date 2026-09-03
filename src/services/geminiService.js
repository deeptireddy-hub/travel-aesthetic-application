// Google Gemini AI Integration Service
// Uses VITE_GEMINI_API_KEY via import.meta.env with intelligent fallback responses

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Using gemini-2.5-flash / gemini-1.5-flash endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Chat with Wanderly AI Travel Concierge
 */
export async function askGeminiTravelAssistant(userMessage, conversationHistory = [], destinationContext = null) {
  if (!API_KEY) {
    // Return curated contextual editorial responses if no API key is configured
    return getEditorialFallbackChatResponse(userMessage, destinationContext);
  }

  try {
    const systemPrompt = `You are Wanderly AI, an elite, knowledgeable, and culturally discerning luxury travel concierge for the publication "Wanderly" (tagline: "Go somewhere worth remembering.").
Your tone is calm, warm, eloquent, and sophisticated.
Provide structured, concise, and inspiring answers highlighting authentic local culture, seasonal advice, culinary gems, and hidden spots.
Keep answers under 3-4 paragraphs unless an exhaustive breakdown is requested.`;

    const contents = [];

    // Append context if provided
    let fullPrompt = userMessage;
    if (destinationContext) {
      fullPrompt = `[Context: Traveler is inquiring about ${destinationContext}] ${userMessage}`;
    }

    // Add previous history
    conversationHistory.forEach((msg) => {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });

    contents.push({
      role: 'user',
      parts: [{ text: fullPrompt }]
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.warn(`Gemini API returned ${response.status}:`, errBody);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response received from AI model.');
    }

    return {
      success: true,
      text: candidateText,
      isFallback: false
    };
  } catch (error) {
    console.warn('Gemini AI call encountered an issue, serving curated editorial response:', error.message);
    const fallback = getEditorialFallbackChatResponse(userMessage, destinationContext);
    return {
      ...fallback,
      note: 'Offline / Concierge Knowledge Base'
    };
  }
}

/**
 * Generate Structured Itinerary via Gemini
 */
export async function generateGeminiItinerary({
  destination,
  days = 3,
  travelStyle = 'Culture & Heritage',
  interests = []
}) {
  const prompt = `You are the lead travel editor at Wanderly. Generate a bespoke, structured ${days}-day itinerary for ${destination}.
Travel Style: ${travelStyle}.
Interests: ${interests.join(', ') || 'Culture, Food, Nature'}.

CRITICAL: Return ONLY valid, clean JSON with no markdown backticks, matching this exact JSON schema:
{
  "title": "${days}-Day Bespoke Journey",
  "destination": "${destination}",
  "daysCount": ${days},
  "summary": "A 2-sentence evocative editorial summary of this trip.",
  "days": [
    {
      "dayNumber": 1,
      "theme": "Day title or theme",
      "morning": {
        "title": "Morning milestone title",
        "description": "Engaging description with specific locations"
      },
      "afternoon": {
        "title": "Afternoon milestone title",
        "description": "Engaging description with specific locations"
      },
      "evening": {
        "title": "Evening milestone title",
        "description": "Atmospheric evening experience"
      },
      "foodRecommendation": "Must-try dish or reservation recommendation",
      "travelNote": "Insider timing or etiquette tip"
    }
  ]
}`;

  if (!API_KEY) {
    return generateLocalStructuredItinerary(destination, days, travelStyle, interests);
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 2500,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini Itinerary generation returned ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Clean any accidental markdown wrap
    const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      success: true,
      itinerary: parsed,
      isFallback: false
    };
  } catch (error) {
    console.warn('Gemini Itinerary error, using high-fidelity local generator:', error.message);
    return generateLocalStructuredItinerary(destination, days, travelStyle, interests);
  }
}

/**
 * Curated Contextual Editorial Responses for Wanderly AI
 */
function getEditorialFallbackChatResponse(query, destinationContext) {
  const q = (query || '').toLowerCase();

  // Kyoto queries
  if (q.includes('kyoto') || destinationContext?.toLowerCase() === 'kyoto') {
    if (q.includes('how many days') || q.includes('how long')) {
      return {
        success: true,
        text: `I recommend **3 to 4 full days** in Kyoto. This allows you to explore the major cultural corridors without rushing:

• **Day 1:** Eastern Higashiyama & Gion (Kiyomizu-dera, Sannenzaka stone alleys, lantern-lit evening machiya walks).
• **Day 2:** Southern vermilion gates of Fushimi Inari Taisha at dawn, followed by Uji green tea estates.
• **Day 3:** Western Arashiyama (Sagano Bamboo Grove, Tenryu-ji Zen gardens, and the Hozugawa river).
• **Day 4:** Northern Golden Pavilion (Kinkaku-ji) and tranquil moss-carpeted Daitoku-ji sanctuaries.

This rhythm guarantees you experience both iconic landmarks and peaceful contemplative gardens.`,
        isFallback: true
      };
    }
    if (q.includes('eat') || q.includes('food')) {
      return {
        success: true,
        text: `Kyoto's culinary heritage is legendary. Don't leave without tasting:

1. **Kaiseki Ryori:** The zenith of multi-course Japanese seasonal aesthetics, showcasing seasonal vegetables and dashi craftsmanship.
2. **Yudofu (Simmered Tofu):** Silken tofu simmered in kelp broth, traditionally enjoyed in serene temple-side teahouses around Nanzen-ji.
3. **Uji Matcha Parfaits & Ceremonial Tea:** Savor fresh wagashi sweets accompanied by stone-ground green tea in Gion.
4. **Nishiki Market Specialties:** Freshly rolled tamagoyaki and grilled dango skewers along the "Kitchen of Kyoto."`,
        isFallback: true
      };
    }
    if (q.includes('when') || q.includes('best time') || q.includes('season')) {
      return {
        success: true,
        text: `The premier seasons for Kyoto are **Late March to mid-April** (for ethereal Sakura cherry blossoms) and **November** (for fiery momiji autumn maple foliage).

*Insider tip:* If you prefer serene temple grounds with fewer travelers, **late May and early June** offers lush, emerald-green moss gardens and vibrant hydrangeas with pleasant temperatures.`,
        isFallback: true
      };
    }
    if (q.includes('solo')) {
      return {
        success: true,
        text: `Kyoto is widely regarded as one of the world's most welcoming and safe destinations for solo travelers. Its quiet pedestrian alleys, efficient transit, and solitary Zen temple gardens lend themselves beautifully to mindful, independent contemplation. Many traditional ramen bars and teahouses feature intimate single-counter seating.`,
        isFallback: true
      };
    }
  }

  // Santorini queries
  if (q.includes('santorini') || destinationContext?.toLowerCase() === 'santorini') {
    return {
      success: true,
      text: `Santorini is best savored over **3 to 4 days**. Spend your mornings hiking the dramatic cliffside trail from Fira to Oia, take a midday sailing catamaran around the volcanic caldera, and end your evening dining on freshly caught grilled sea bass in Ammoudi Bay beneath the crimson cliffs.

*Best season:* **May or September–October** to enjoy Aegean sunshine with pleasant breezes and fewer cruise crowds.`,
      isFallback: true
    };
  }

  // Cape Town queries
  if (q.includes('cape town') || destinationContext?.toLowerCase() === 'cape town') {
    return {
      success: true,
      text: `For Cape Town, allocate at least **4 to 5 days**. You'll want time to ride the cable car up Table Mountain on a clear morning, drive Chapman's Peak to see the wild penguin colony at Boulders Beach, and spend a leisurely afternoon tasting Pinotage among the historic Cape Dutch wine estates of Franschhoek and Stellenbosch.`,
      isFallback: true
    };
  }

  // Default Editorial Response
  return {
    success: true,
    text: `Greetings from Wanderly. Wherever your travel ambitions point you, we emphasize slow, deliberate travel: rising early for undisturbed cultural monuments, lingering at neighborhood bistros, and leaving space in your afternoon for unplanned discovery.

Feel free to ask me about ideal lengths of stay, seasonal weather windows, signature culinary dishes, or hidden vantage points for any destination!`,
    isFallback: true
  };
}

/**
 * Local High-Fidelity Structured Itinerary Generator (Offline / Zero-Key Fallback)
 */
function generateLocalStructuredItinerary(destination, days, travelStyle, interests) {
  const daysList = [];

  const dayTemplates = [
    {
      theme: 'Arrival & Evening Atmosphere',
      morning: {
        title: 'Arrival & Boutique Hotel Check-in',
        description: `Arrive in ${destination}, settle into your quarters, and enjoy an authentic local espresso or refreshing infusion while soaking in the neighborhood architecture.`
      },
      afternoon: {
        title: 'Historic Center Orientation Walk',
        description: `Wander through the historic quarter at a leisurely pace, discovering quaint artisan boutiques and landmark plazas.`
      },
      evening: {
        title: 'Welcome Dinner & Golden Hour',
        description: `Savor an intimate welcome dinner featuring seasonal regional delicacies with views of the evening skyline.`
      },
      foodRecommendation: `Local seasonal tasting menu with regional wine pairing.`,
      travelNote: `Pre-book airport transit to guarantee a relaxed arrival without taxi queues.`
    },
    {
      theme: 'Iconic Landmarks & Cultural Soul',
      morning: {
        title: 'Sunrise at Major Monument',
        description: `Experience the destination's primary monument at first light before tour groups arrive, capturing golden morning illumination.`
      },
      afternoon: {
        title: 'Curated Museum or Historic Estate',
        description: `Explore renowned art collections or preserved heritage grounds with an audio guide or resident historian.`
      },
      evening: {
        title: 'Sunset Vantage Point & Aperitivo',
        description: `Watch the sunset from an elevated scenic terrace followed by tapas and ambient music.`
      },
      foodRecommendation: `Wood-fired specialties or traditional street food from a historic stall.`,
      travelNote: `Carry comfortable walking shoes with sturdy soles for cobblestone streets.`
    },
    {
      theme: 'Nature, Vistas & Artisans',
      morning: {
        title: 'Scenic Coastal / Mountain Excursion',
        description: `Take a short morning drive or cable ride to the surrounding nature reserves for breathtaking panorama views.`
      },
      afternoon: {
        title: 'Artisan Workshops & Craft Studios',
        description: `Meet local craftsmen, ceramicists, or weavers keeping multi-generational traditions alive.`
      },
      evening: {
        title: 'Waterfront / Riverside Promenade',
        description: `Stroll along the illuminated waterfront followed by late-night gelato or digestif.`
      },
      foodRecommendation: `Fresh catch of the day or handmade pasta/noodles with garden herbs.`,
      travelNote: `Sun protection and an extra layer for changing elevations are recommended.`
    },
    {
      theme: 'Culinary Heritage & Hidden Enclaves',
      morning: {
        title: 'Farmer\'s Market & Cooking Masterclass',
        description: `Browse vibrant morning produce stalls, sampling local cheeses, fruits, and spices with a local chef.`
      },
      afternoon: {
        title: 'Tranquil Gardens & Teahouse Downtime',
        description: `Escape into quiet botanical sanctuaries or hidden cloistered courtyards for afternoon reading and relaxation.`
      },
      evening: {
        title: 'Historic Theatre or Live Music',
        description: `Attend a traditional acoustic musical performance or theatre in a historic venue.`
      },
      foodRecommendation: `Signature regional slow-cooked feast prepared in ceramic earthenware.`,
      travelNote: `Cash is still preferred at smaller open-air market stalls.`
    },
    {
      theme: 'Day Excursion to Surrounding Countryside',
      morning: {
        title: 'Picturesque Village Road Trip',
        description: `Venture beyond the city gates into serene hillside vineyards or fishing hamlets.`
      },
      afternoon: {
        title: 'Winery or Farmstead Lunch',
        description: `Enjoy a lazy multi-course lunch overlooking rolling terraces and olive groves.`
      },
      evening: {
        title: 'Return to City for Farewell Toast',
        description: `Reflect on the journey over crafted cocktails in a secluded speakeasy or rooftop lounge.`
      },
      foodRecommendation: `Farm-to-table tasting paired with estate vintages.`,
      travelNote: `Check train timetables ahead if venturing by regional rail.`
    },
    {
      theme: 'Contemporary Culture & Leisure',
      morning: {
        title: 'Modern Architecture & Contemporary Art',
        description: `Discover contemporary design pavilions, sculpture parks, and progressive architecture.`
      },
      afternoon: {
        title: 'Spa Sanctuary & Hydrotherapy',
        description: `Indulge in traditional thermal baths or herbal massage to rejuvenate body and mind.`
      },
      evening: {
        title: 'Fine Dining Celebration',
        description: `A celebratory dinner at a Michelin-recognized establishment celebrating boundary-pushing regional flavors.`
      },
      foodRecommendation: `Chef's seasonal degustation with botanical pairing.`,
      travelNote: `Smart-casual dress code is often requested for fine dining reservations.`
    },
    {
      theme: 'Fond Farewells & Unfinished Business',
      morning: {
        title: 'Last Sunrise & Souvenir Curation',
        description: `Visit your favorite neighborhood bakery one last time and pick up thoughtfully packaged culinary gifts.`
      },
      afternoon: {
        title: 'Final Leisurely Stroll',
        description: `Spend your remaining hours revisiting the spot that captivated you most, engraving the memory in your mind.`
      },
      evening: {
        title: 'Departure with Lasting Memories',
        description: `Head toward the departure terminal with a sketchbook, journal, and heart full of inspiration.`
      },
      foodRecommendation: `Traditional pastry and espresso before departure.`,
      travelNote: `Keep your passport and departure boarding passes easily accessible.`
    }
  ];

  for (let i = 0; i < Math.min(days, 7); i++) {
    const template = dayTemplates[i];
    daysList.push({
      dayNumber: i + 1,
      theme: `${template.theme}`,
      morning: template.morning,
      afternoon: template.afternoon,
      evening: template.evening,
      foodRecommendation: template.foodRecommendation,
      travelNote: template.travelNote
    });
  }

  return {
    success: true,
    isFallback: true,
    itinerary: {
      title: `${days}-Day ${travelStyle} Journey`,
      destination: destination,
      daysCount: days,
      summary: `An evocative ${days}-day editorial journey through ${destination}, curated specifically for travelers who appreciate ${travelStyle.toLowerCase()} and slow, immersive discovery.`,
      days: daysList
    }
  };
}
