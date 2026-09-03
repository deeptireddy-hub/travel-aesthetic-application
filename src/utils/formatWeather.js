// Weather data formatters and helpers

export function formatTemp(celsius) {
  if (celsius === undefined || celsius === null) return '--°C';
  return `${Math.round(celsius)}°C`;
}

export function formatWind(kmh) {
  if (kmh === undefined || kmh === null) return '-- km/h';
  return `${Math.round(kmh)} km/h`;
}

export function formatHumidity(humidity) {
  if (humidity === undefined || humidity === null) return '--%';
  return `${humidity}%`;
}
