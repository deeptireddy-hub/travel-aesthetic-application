import { useState, useEffect } from 'react';
import { fetchWeatherByCoordinates } from '../services/weatherService';

export function useWeather(coordinates, fallbackMock = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!coordinates) return;
      setLoading(true);
      setError(null);

      const res = await fetchWeatherByCoordinates(coordinates.lat, coordinates.lon, fallbackMock);
      if (isMounted) {
        if (res.success && res.data) {
          setData(res.data);
          setIsLive(!res.isMock);
        } else {
          setError(res.error || 'Weather is temporarily unavailable.');
        }
        setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [coordinates?.lat, coordinates?.lon]);

  return { data, loading, error, isLive };
}
