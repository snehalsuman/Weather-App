import React from "react";

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  // Extract one forecast per day at noon (12:00 PM)
  const dailyForecasts = forecast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-800 rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        5-Day Forecast
      </h2>
      <div className="flex flex-col gap-3">
        {dailyForecasts.map((day) => (
          <div
            key={day.dt}
            className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded shadow"
          >
            <p className="font-semibold text-gray-900 dark:text-gray-100">
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
            <p className="text-gray-800 dark:text-gray-100">
              {Math.round(day.main.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;