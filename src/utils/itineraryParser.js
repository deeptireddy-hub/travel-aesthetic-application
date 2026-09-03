// Itinerary parser and normalization utility

export function parseItineraryResponse(rawJsonOrObject) {
  if (typeof rawJsonOrObject === 'object' && rawJsonOrObject !== null) {
    return normalizeItinerary(rawJsonOrObject);
  }

  try {
    const cleaned = String(rawJsonOrObject)
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();
    const parsed = JSON.parse(cleaned);
    return normalizeItinerary(parsed);
  } catch (error) {
    console.error('Failed to parse itinerary JSON:', error);
    return null;
  }
}

function normalizeItinerary(obj) {
  return {
    title: obj.title || 'Bespoke Travel Itinerary',
    destination: obj.destination || 'Destination',
    daysCount: obj.daysCount || (obj.days ? obj.days.length : 3),
    summary: obj.summary || '',
    days: Array.isArray(obj.days) ? obj.days : []
  };
}
