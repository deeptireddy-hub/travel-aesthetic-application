// Dynamic Image Service using Unsplash API & Curated Photo Resolver

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_BASE_URL = 'https://api.unsplash.com/search/photos';

// Cache for fetched image queries during session
const imageCache = new Map();

/**
 * Fetch dynamic photography by search query
 * If no Unsplash key is configured or rate-limited, gracefully returns a curated photography URL.
 */
export async function fetchDynamicImage(query, fallbackUrl = '') {
  if (imageCache.has(query)) {
    return imageCache.get(query);
  }

  if (!UNSPLASH_ACCESS_KEY) {
    // Return curated fallback or direct dynamic unsplash query
    const dynamicUnsplash = fallbackUrl || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop`;
    imageCache.set(query, dynamicUnsplash);
    return dynamicUnsplash;
  }

  try {
    const url = `${UNSPLASH_BASE_URL}?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unsplash returned ${response.status}`);
    }

    const data = await response.json();
    const photoUrl = data.results?.[0]?.urls?.regular || fallbackUrl;
    imageCache.set(query, photoUrl);
    return photoUrl;
  } catch (error) {
    console.warn(`Dynamic image fetch for "${query}" failed, using fallback:`, error.message);
    imageCache.set(query, fallbackUrl);
    return fallbackUrl;
  }
}
