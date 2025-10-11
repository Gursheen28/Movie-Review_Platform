import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg shadow-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
  );
};

export default SearchBar;
