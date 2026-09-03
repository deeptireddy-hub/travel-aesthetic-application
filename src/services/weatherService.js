// OpenWeather API Integration Service

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetch current weather by coordinates (lat, lon)
 * Falls back gracefully if API key is not configured or request fails.
 */
export async function fetchWeatherByCoordinates(lat, lon, fallbackData = null) {
  if (!API_KEY) {
    // If no API key provided, gracefully return the high-fidelity calibrated fallback
    return {
      success: true,
      isMock: true,
      data: fallbackData || {
        temp: 20,
        feelsLike: 19,
        condition: 'Partly Cloudy',
        humidity: 62,
        windSpeed: 12,
        description: 'Pleasant conditions with gentle breeze',
        icon: '03d'
      }
    };
  }

  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather service returned ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();

    return {
      success: true,
      isMock: false,
      data: {
        temp: Math.round(json.main.temp),
        feelsLike: Math.round(json.main.feels_like),
        condition: json.weather[0]?.main || 'Clear',
        description: json.weather[0]?.description || '',
        humidity: json.main.humidity,
        windSpeed: Math.round(json.wind?.speed * 3.6), // convert m/s to km/h
        icon: json.weather[0]?.icon || '01d',
        cityName: json.name
      }
    };
  } catch (error) {
    console.warn('OpenWeather fetch failed, falling back to cached seasonal data:', error.message);
    if (fallbackData) {
      return {
        success: true,
        isMock: true,
        data: fallbackData,
        errorNote: 'Live weather service unreachable. Showing seasonal average.'
      };
    }
    return {
      success: false,
      error: 'Weather is temporarily unavailable.'
    };
  }
}

/**
 * Fetch weather by City / Query name
 */
export async function fetchWeatherByCity(cityName) {
  if (!API_KEY) {
    return {
      success: true,
      isMock: true,
      data: {
        temp: 21,
        feelsLike: 20,
        condition: 'Clear Sky',
        humidity: 55,
        windSpeed: 14,
        description: 'Clear sunny sky',
        icon: '01d',
        cityName: cityName
      }
    };
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('City weather lookup failed');
    const json = await response.json();

    return {
      success: true,
      isMock: false,
      data: {
        temp: Math.round(json.main.temp),
        feelsLike: Math.round(json.main.feels_like),
        condition: json.weather[0]?.main || 'Clear',
        description: json.weather[0]?.description || '',
        humidity: json.main.humidity,
        windSpeed: Math.round(json.wind?.speed * 3.6),
        icon: json.weather[0]?.icon || '01d',
        cityName: json.name,
        lat: json.coord.lat,
        lon: json.coord.lon
      }
    };
  } catch (err) {
    return {
      success: false,
      error: 'Weather is temporarily unavailable.'
    };
  }
}
