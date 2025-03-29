import React from "react";

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  // Extract data for the next 5 days (filter one per day)
  const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="mt-6 p-4 bg-gray-200 rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">5-Day Forecast</h2>
      <div className="flex flex-col gap-3">
        {dailyForecasts.map((day) => (
          <div
            key={day.dt}
            className="flex items-center justify-between bg-white p-3 rounded shadow"
          >
            <p className="font-semibold">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="w-10"
            />
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;