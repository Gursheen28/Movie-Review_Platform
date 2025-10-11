import React, { useEffect, useState } from "react";
import MovieListPage from "./MovieListPage";
import Spinner from "../components/Spinner";

const API_KEY = "9409e3217703c30d215c36f1fce4d16a";

export default function MovieCategoryPage({ allMovies = [], category }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let data = null;

        if (category === "popular") {
          data = allMovies; // already fetched
        } else {
          let url = "";
          if (category === "upcoming") {
            url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
          } else if (category === "latest") {
            url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
          }
          const res = await fetch(url);
          const json = await res.json();
          data = json.results || [];
        }

        // Remove duplicates by id
        const uniqueMovies = [...new Map(data.map((m) => [m.id, m])).values()];
        setMovies(uniqueMovies);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, allMovies]);

  return loading ? <Spinner /> : <MovieListPage movies={movies} />;
}
