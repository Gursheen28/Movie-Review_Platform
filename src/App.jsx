import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import SecondaryNav from "./components/SecondaryNav";
import PopularCarousel from "./components/PopularCarousel";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import MoviesByGenrePage from "./pages/MoviesByGenrePage";
import MovieCategoryPage from "./pages/MovieCategoryPage";
import SearchPage from "./pages/SearchPage";
import Spinner from "./components/Spinner";
import { getCurrentUser } from "./services/auth";

const API_KEY = "9409e3217703c30d215c36f1fce4d16a";
const MOVIES_PER_PAGE = 20;
const MAX_MOVIES = 1000;

export default function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(getCurrentUser());

  const handleAuth = (username) => {
    setUser(username);
  };

  // Fetch 1000 movies once
  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      let movies = [];
      const totalPages = Math.ceil(MAX_MOVIES / MOVIES_PER_PAGE);

      try {
        for (let i = 1; i <= totalPages; i++) {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${i}`
          );
          const data = await res.json();
          if (data.results) movies = [...movies, ...data.results];
          if (movies.length >= MAX_MOVIES) break;
        }
        setAllMovies(movies.slice(0, MAX_MOVIES));
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        <NavBar user={user} />
        <SecondaryNav />

        <div className="flex-1 px-6 md:px-12 py-10">
          {loading ? (
            <Spinner />
          ) : (
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={
                  <>
                    <PopularCarousel movies={allMovies} />
                    <MovieListPage movies={allMovies} />
                  </>
                }
              />

              {/* ✅ Categories (filter from allMovies) */}
              <Route path="/movies/popular" element={<MovieCategoryPage category="popular" allMovies={allMovies} />} />
              <Route path="/movies/upcoming" element={<MovieCategoryPage category="upcoming" allMovies={allMovies} />} />
              <Route path="/movies/latest" element={<MovieCategoryPage category="latest" allMovies={allMovies} />} />


              {/* ✅ Genres (filter from allMovies) */}
              <Route
                path="/movies/genre/:genreId"
                element={<MoviesByGenrePage allMovies={allMovies} />}
              />

              {/* Movie details */}
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              {/* Auth routes */}
              <Route
                path="/profile"
                element={
                  user ? <ProfilePage user={user} /> : <Navigate to="/auth" replace />
                }
              />

              <Route
                path="/auth"
                element={<AuthPage onAuthSuccess={handleAuth} />}
              />
            </Routes>
          )}
        </div>

        <footer className="text-center py-6 border-t border-gray-800 text-gray-500 text-sm mt-auto">
          © {new Date().getFullYear()} | Built by Gursheen-Kaur
        </footer>
      </div>
    </Router>
  );
}
