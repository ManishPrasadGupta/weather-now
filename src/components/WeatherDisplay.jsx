function getWeatherIcon(code) {
  // Open-Meteo weather code mapping
  if (code === undefined || code === null) return null;
  // Clear sky (sun)
  if ([0, 1].includes(code)) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2">
        <circle cx="32" cy="32" r="18" fill="#FFD700" />
        {/* Sun rays */}
        <g stroke="#FFD700" strokeWidth="3">
          <line x1="32" y1="6" x2="32" y2="20" />
          <line x1="32" y1="44" x2="32" y2="58" />
          <line x1="6" y1="32" x2="20" y2="32" />
          <line x1="44" y1="32" x2="58" y2="32" />
          <line x1="14" y1="14" x2="24" y2="24" />
          <line x1="40" y1="40" x2="50" y2="50" />
          <line x1="14" y1="50" x2="24" y2="40" />
          <line x1="40" y1="24" x2="50" y2="14" />
        </g>
      </svg>
    );
  }
  // Mainly clear, partly cloudy (sun + cloud)
  if ([2].includes(code)) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2">
        <circle cx="24" cy="28" r="12" fill="#FFD700" />
        <ellipse cx="40" cy="40" rx="14" ry="8" fill="#B0C4DE" />
      </svg>
    );
  }
  // Overcast/cloudy (clouds only)
  if ([3, 45, 48].includes(code)) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2">
        <ellipse cx="32" cy="40" rx="18" ry="12" fill="#B0C4DE" />
        <ellipse cx="42" cy="36" rx="10" ry="8" fill="#B0C4DE" />
      </svg>
    );
  }
  // Rainy (clouds + rain drops)
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2">
        <ellipse cx="32" cy="40" rx="18" ry="12" fill="#B0C4DE" />
        <ellipse cx="42" cy="36" rx="10" ry="8" fill="#B0C4DE" />
        <line x1="24" y1="52" x2="24" y2="60" stroke="#00BFFF" strokeWidth="3" />
        <line x1="32" y1="52" x2="32" y2="60" stroke="#00BFFF" strokeWidth="3" />
        <line x1="40" y1="52" x2="40" y2="60" stroke="#00BFFF" strokeWidth="3" />
      </svg>
    );
  }
  // Default: partly cloudy
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-2">
      <circle cx="24" cy="32" r="10" fill="#FFD700" />
      <ellipse cx="40" cy="40" rx="14" ry="8" fill="#B0C4DE" />
    </svg>
  );
}

export default function WeatherDisplay({ data, loading, error }) {
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data) return null;

  // Format date
  let displayDate = "";
  if (data.date) {
    const apiDate = new Date(data.date);
    const now = new Date();
    if (
      apiDate.getFullYear() === now.getFullYear() &&
      apiDate.getMonth() === now.getMonth() &&
      apiDate.getDate() === now.getDate()
    ) {
      displayDate = "Today";
    } else {
      displayDate = apiDate.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }

  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-sm mx-auto text-center">
      {getWeatherIcon(data.weathercode)}
      <h2 className="text-lg font-semibold mb-2">{data.city}</h2>
      {displayDate && (
        <p className="text-sm text-gray-500 mb-2">{displayDate}</p>
      )}
      <p className="text-2xl">{data.temp}°C</p>
      <p>{data.conditions}</p>
      <p>
        Pressure:{" "}
        {data.pressure !== undefined && data.pressure !== null
          ? `${data.pressure} hPa`
          : "N/A"}
      </p>
      <p>
        Humidity:{" "}
        {data.humidity !== undefined && data.humidity !== null
          ? `${data.humidity}%`
          : "N/A"}
      </p>
    </div>
  );
}