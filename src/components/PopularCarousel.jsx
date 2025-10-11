import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function PopularCarousel({ movies = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalMovies = movies.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalMovies - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalMovies - 1 ? 0 : prev + 1));
  };

  // Filter unique movies by id
  const uniqueMovies = Array.from(new Map(movies.map((m) => [m.id, m])).values());

  // Main Carousel
  const visibleMovie = uniqueMovies[currentIndex] || {};

  // Top Starers: only movies with rating >= 9
  const topRated = uniqueMovies.filter((m) => (m.vote_average || 0) >= 9);

  return (
    <div className="w-full relative flex flex-col md:flex-row gap-8">
      {/* Main Carousel */}
      <div className="relative flex-1">
        <Link to={`/movie/${visibleMovie.id}`}>
          <img
            src={
              visibleMovie.poster_path
                ? `https://image.tmdb.org/t/p/original${visibleMovie.poster_path}`
                : "/assets/placeholder.png"
            }
            alt={visibleMovie.title}
            className="w-full h-[650px] md:h-[750px] object-cover rounded-xl shadow-lg cursor-pointer"
          />
        </Link>

        {/* Full-width bottom overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4 rounded-b-xl">
          <h2 className="text-2xl md:text-5xl font-bold text-white">{visibleMovie.title}</h2>
          {visibleMovie.release_date && (
            <p className="text-gray-300 mt-1">{visibleMovie.release_date}</p>
          )}
          {visibleMovie.vote_average && (
            <p className="text-yellow-400 mt-1 font-semibold">
              ⭐ {visibleMovie.vote_average.toFixed(1)}/10
            </p>
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-gradient-to-br from-amber-500 to-yellow-400 p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-br from-amber-500 to-yellow-400 p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Top Starers / Up Next */}
      <div className="flex flex-col gap-4 w-full md:w-1/3 h-[750px]">
        <h3 className="text-2xl font-bold mb-2">Top Starers</h3>

        {/* Scrollable container for movies */}
        <div className="flex flex-col gap-4 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-gray-800">
          {topRated.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="flex gap-4 items-center p-2 rounded-lg border-2 border-ash-grey hover:bg-gray-800 transition"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/assets/placeholder.png"
                }
                alt={movie.title}
                className="w-28 h-44 sm:w-32 sm:h-52 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center">
                <p className="text-white font-medium text-lg">{movie.title}</p>
                <p className="text-yellow-400 font-semibold text-base">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
