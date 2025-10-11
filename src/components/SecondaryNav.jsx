import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_KEY = "9409e3217703c30d215c36f1fce4d16a";

const SecondaryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();

  const activeGenreId = location.pathname.startsWith("/movies/genre/")
    ? location.pathname.split("/movies/genre/")[1]
    : null;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenreClick = (genre) => {
    setIsOpen(false);
    navigate(`/movies/genre/${genre.id}`);
  };

  return (
    <div className="bg-gray-800 text-gray-300 px-6 py-4 flex items-center justify-center gap-8 text-2xl font-semibold shadow relative h-[80px]">
      <button
        onClick={() => navigate("/movies/popular")}
        className={`flex-1 text-center hover:text-amber-400 ${
          location.pathname.includes("/movies/popular")
            ? "text-amber-400"
            : ""
        }`}
      >
        Popular
      </button>

      <button
        onClick={() => navigate("/movies/upcoming")}
        className={`flex-1 text-center hover:text-amber-400 ${
          location.pathname.includes("/movies/upcoming")
            ? "text-amber-400"
            : ""
        }`}
      >
        Upcoming
      </button>

      <button
        onClick={() => navigate("/movies/latest")}
        className={`flex-1 text-center hover:text-amber-400 ${
          location.pathname.includes("/movies/latest")
            ? "text-amber-400"
            : ""
        }`}
      >
        Latest
      </button>

      {/* Genres Dropdown */}
      <div className="relative flex-1 flex justify-center" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-amber-400 flex items-center gap-2"
        >
          Genres ▼
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-2 w-56 z-50 max-h-80 overflow-y-auto">
            {genres.length > 0 ? (
              genres.map((genre) => {
                const isActive = String(genre.id) === String(activeGenreId);
                return (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre)}
                    className={`block w-full text-left px-3 py-2 rounded transition text-lg ${
                      isActive
                        ? "bg-amber-500 text-black font-semibold"
                        : "hover:bg-gray-700 hover:text-amber-400 text-gray-300"
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })
            ) : (
              <div className="text-gray-400 px-3 py-2">Loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecondaryNav;
