import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import RecentSearches from "./components/RecentSearches";
import ForecastCard from "./components/ForecastCard";
import { useWeather } from "./hooks/useWeather";
import { FiRefreshCw } from "react-icons/fi"; // Import refresh icon
import "./App.css";

const App = () => {
  const { weather, forecast, loading, error, fetchWeather, recentSearches } = useWeather();
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode class and save preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSearch = (city) => {
    setCity(city);
    fetchWeather(city);
  };

  const handleRefresh = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen w-full transition-colors">
      <div className="flex justify-between items-center w-full max-w-md">
        <h1 className="weather-title">Weather Dashboard</h1>

        {/* Light Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle p-2 rounded-full transition bg-gray-300 dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Search Bar with Refresh Button */}
      <div className="flex items-center gap-2 w-full max-w-md">
        <SearchBar onSearch={handleSearch} />
        <button 
          onClick={handleRefresh} 
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          <FiRefreshCw size={20} />
        </button>
      </div>

      <RecentSearches searches={recentSearches} onSelect={handleSearch} />

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {forecast && <ForecastCard forecast={forecast} />}
    </div>
  );
};

export default App;