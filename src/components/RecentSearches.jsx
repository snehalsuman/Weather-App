import React from "react";

const RecentSearches = ({ searches, onSelect }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-800 rounded shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Searches</h2>
      <div className="flex gap-2 mt-2 flex-wrap">
        {searches.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelect(city)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;