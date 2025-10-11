import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY = "9409e3217703c30d215c36f1fce4d16a";
const MOVIES_PER_PAGE = 20;
const MAX_MOVIES = 1000;

export default function MovieListPage({ movies: propMovies = [] }) {
  const [allMovies, setAllMovies] = useState(propMovies);
  const [loading, setLoading] = useState(propMovies.length === 0);
  const [page, setPage] = useState(1);

  // ✅ Fetch movies only if no prop movies are provided
  useEffect(() => {
    const fetchAllMovies = async () => {
      if (propMovies.length > 0) {
        setAllMovies(propMovies);
        setLoading(false);
        return;
      }

      setLoading(true);
      let movies = [];
      const totalPages = Math.ceil(MAX_MOVIES / MOVIES_PER_PAGE);

      try {
        for (let i = 1; i <= totalPages; i++) {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${i}`
          );
          const data = await res.json();
          if (data.results) {
            movies = [...movies, ...data.results];
          }
          if (movies.length >= MAX_MOVIES) break;
        }
        setAllMovies(movies.slice(0, MAX_MOVIES));
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
      setLoading(false);
    };

    fetchAllMovies();
  }, [propMovies]);

  // ✅ Reset pagination if new prop movies are received
  useEffect(() => {
    setPage(1);
  }, [propMovies]);

  // Pagination logic
  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const paginatedMovies = allMovies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allMovies.length / MOVIES_PER_PAGE);

  return (
    <div className="px-6 py-8 bg-gray-950 min-h-screen text-white">
      {/* Loading Spinner */}
      {loading ? (
        <p className="text-center text-gray-400 text-lg mt-10 animate-pulse">
          Loading movies... 🍿
        </p>
      ) : paginatedMovies.length === 0 ? (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No movies found.
        </p>
      ) : (
        <>
          {/* Movie Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-6">
            {paginatedMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 group">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/assets/placeholder.png"
                    }
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-4">
                    <h3 className="text-white text-lg font-bold truncate">
                      {movie.title}
                    </h3>
                    {movie.vote_average && (
                      <p className="text-yellow-400 font-semibold mt-1">
                        ⭐ {movie.vote_average.toFixed(1)}/10
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-5 py-2 rounded-full text-lg font-semibold transition ${
                page === 1
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-amber-400 text-gray-900 hover:bg-amber-500"
              }`}
            >
              ⬅ Prev
            </button>

            <span className="text-lg font-medium text-gray-300">
              Page {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-5 py-2 rounded-full text-lg font-semibold transition ${
                page === totalPages
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-amber-400 text-gray-900 hover:bg-amber-500"
              }`}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
