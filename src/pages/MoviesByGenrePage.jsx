import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieListPage from "./MovieListPage";
import Spinner from "../components/Spinner";

export default function MoviesByGenrePage({ allMovies }) {
  const { genreId } = useParams();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!allMovies || allMovies.length === 0) return;

    setLoading(true);
    const genreFiltered = allMovies.filter((movie) =>
      movie.genre_ids.includes(parseInt(genreId))
    );

    // remove duplicates by movie id
    const uniqueMovies = [
      ...new Map(genreFiltered.map((m) => [m.id, m])).values(),
    ];

    setFilteredMovies(uniqueMovies);
    setLoading(false);
  }, [genreId, allMovies]);

  return loading ? <Spinner /> : <MovieListPage movies={filteredMovies} />;
}