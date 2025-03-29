import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null; 

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80 mx-auto">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="mx-auto"
      />
      <p className="text-xl">{weather.main.temp}°C</p>
      <p className="text-gray-600">{weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} km/h</p>
    </div>
  );
};

export default WeatherCard;