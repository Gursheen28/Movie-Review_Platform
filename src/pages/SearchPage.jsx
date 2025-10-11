// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const API_KEY = "9409e3217703c30d215c36f1fce4d16a";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Get search query from URL params
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            searchTerm
          )}&language=en-US`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]); // ✅ no lint warning

  if (!searchTerm) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-400 text-xl">
        Please enter a search term.
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Search results for: "{searchTerm}"
      </h1>

      {loading ? (
        <div className="text-white text-xl">Loading...</div>
      ) : movies.length === 0 ? (
        <div className="text-gray-400 text-xl">No movies found for "{searchTerm}".</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/assets/placeholder.png"
                }
                alt={movie.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-3">
                <h2 className="text-white font-semibold text-lg truncate">{movie.title}</h2>
                {movie.release_date && (
                  <p className="text-gray-400 text-sm mt-1">
                    📅 {movie.release_date.slice(0, 4)}
                  </p>
                )}
                {movie.vote_average && (
                  <p className="text-yellow-400 font-semibold mt-1">⭐ {movie.vote_average.toFixed(1)}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
