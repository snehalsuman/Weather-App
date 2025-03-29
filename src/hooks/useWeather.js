import { useState, useEffect } from "react";
import axios from "axios";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `${WEATHER_API_URL}?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setWeather(weatherResponse.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `${FORECAST_API_URL}?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setForecast(forecastResponse.data);

      // Update recent searches
      setRecentSearches((prev) => {
        const updatedSearches = [city, ...prev.filter((c) => c !== city)];
        return updatedSearches.slice(0, 5);
      });
    } catch (err) {
      if (err.response) {
        setError(err.response.status === 404 ? "City not found." : "Something went wrong.");
      } else {
        setError("Network error. Check your connection.");
      }
    }

    setLoading(false);
  };

  return { weather, forecast, loading, error, fetchWeather, recentSearches };
};