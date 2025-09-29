"use client";
import { useEffect, useState } from "react";

export default function Weather({ defaultCity = "" }: { defaultCity?: string }) {
  const [weather, setWeather] = useState<string>("Loading weather...");
  const [city, setCity] = useState<string>(defaultCity);
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  useEffect(() => {
    if (!apiKey || !city) {
      setWeather("Please provide a city and check your API key.");
      return;
    }
    const controller = new AbortController();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.main) {
          setWeather(`${data.name}: ${Math.round(data.main.temp)}°C, ${data.weather[0].description}`);
        } else {
          setWeather("Weather data not available.");
        }
      })
      .catch(() => setWeather("Failed to load weather."));
    return () => controller.abort();
  }, [city, apiKey]);

  return (
    <div className="space-y-2">
      <p className="text-lg">🌤️ Current Weather: {weather}</p>
      <div className="flex justify-center gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 rounded text-black"
          placeholder="Change city"
        />
      </div>
    </div>
  );
}
