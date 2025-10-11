import React from "react";

const genres = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
];

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 my-4">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre)}
          className={`px-4 py-2 rounded-full transition ${
            selectedGenre === genre
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-indigo-400 hover:text-white"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
