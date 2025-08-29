import { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";

async function fetchCoordinates(city) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1`
  );
  const data = await res.json();
    console.log(data);
  if (data.results && data.results.length > 0) {
    const { latitude, longitude, name, country } = data.results[0];
    return { latitude, longitude, city: `${name}, ${country}` };
  }
  throw new Error("City not found");
}

async function fetchWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=pressure_msl,relative_humidity_2m`
  );
  const data = await res.json();
  if (data.current_weather && data.hourly) {
    const currentTime = data.current_weather.time;
    const idx = data.hourly.time.indexOf(currentTime);
    const pressure = idx !== -1 ? data.hourly.pressure_msl[idx] : null;
    const humidity = idx !== -1 ? data.hourly.relative_humidity_2m[idx] : null;
    return {
      temp: data.current_weather.temperature,
      conditions: `Wind: ${data.current_weather.windspeed} km/h`,
      pressure,
      humidity,
      weathercode: data.current_weather.weathercode,
      date: currentTime,
    };
  }
  throw new Error("Weather data not found");
}

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const coords = await fetchCoordinates(city);
      const weatherData = await fetchWeather(coords.latitude, coords.longitude);
      setWeather({
        city: coords.city,
        temp: weatherData.temp,
        conditions: weatherData.conditions,
        pressure: weatherData.pressure,
        humidity: weatherData.humidity,
        weathercode: weatherData.weathercode,
        date: weatherData.date, 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-200 to-blue-600 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-white text-center drop-shadow-lg">
          Weather Now
        </h1>
        <div className="mb-6">
          <WeatherForm onSearch={handleSearch} />
        </div>
        <div className="flex justify-center">
          <div className="bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-6 w-full max-w-sm border border-white/40">
            <WeatherDisplay data={weather} loading={loading} error={error} />
          </div>
        </div>
      </div>
      <footer className="mt-10 text-white/80 text-xs text-center">
        Powered by Open-Meteo API
      </footer>
    </div>
  );
}