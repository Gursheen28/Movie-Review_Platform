import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../services/tmdbApi";
import StarRating from "../components/StarRating";
import ReviewList from "../components/ReviewList";
import { getReviews, addReview } from "../services/localStorage";
import { getCurrentUser } from "../services/auth";

const MovieDetailPage = () => {
  const { id } = useParams(); // movie id from URL
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const user = getCurrentUser(); // get current logged-in user

  useEffect(() => {
    fetchMovieById(id).then(setMovie);
    setReviews(getReviews(id));
  }, [id]);

  const handleSubmitReview = () => {
    if (!user) {
      setError("Please log in to submit a review.");
      return;
    }

    if (reviewText.trim() === "") {
      setError("Please write a review before submitting.");
      return;
    }

    const now = new Date();
    const newReview = {
    id: Date.now(), // unique ID for deleting
    user: user.username || user.name,
    movieId: id,
    movieTitle: movie.title,
    text: reviewText,
    rating,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    addReview(newReview);
    setReviews(getReviews(id));
    setReviewText("");
    setRating(0);
    setError("");
  };

  if (!movie)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 blur-sm"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col md:flex-row items-start gap-20">
        {/* POSTER SECTION */}
        <div className="w-full md:w-2/5 flex justify-start ml-0 md:ml-6">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/assets/placeholder.png"
            }
            alt={movie.title}
            className="rounded-3xl shadow-2xl w-[350px] sm:w-[420px] md:w-[500px] lg:w-[550px] transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* MOVIE DETAILS */}
        <div className="flex-1 space-y-6 md:pr-10 text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-amber-400 drop-shadow-lg">
            {movie.title}
          </h1>

          <p className="text-gray-400 text-lg">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : ""}{" "}
            • ⭐ {movie.vote_average?.toFixed(1)}/10
          </p>

          <p className="text-gray-200 text-lg leading-relaxed max-w-3xl">
            {movie.overview}
          </p>

          {/* GENRES */}
          {movie.genres && (
            <div className="flex flex-wrap gap-3 mt-3">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-amber-500/20 border border-amber-400 text-amber-300 px-3 py-1 rounded-full text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* USER RATING + REVIEW */}
          <div className="mt-10 bg-black/40 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-gray-800">
            <h3 className="text-2xl font-semibold text-amber-400 mb-4">
              Your Rating & Review
            </h3>

            {/* RATING */}
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={rating} setRating={setRating} />
              {rating > 0 && (
                <span className="text-amber-300 font-semibold">{rating}/5</span>
              )}
            </div>

            {/* REVIEW TEXT AREA */}
            <textarea
              className="w-full bg-gray-900 border border-gray-700 text-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              rows="4"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            {/* ERROR MESSAGE */}
            {error && <p className="text-red-400 mt-2">{error}</p>}

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmitReview}
              className="mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2 rounded-full transition duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* USER REVIEWS SECTION */}
      <div className="relative z-10 container mx-auto px-6 py-12 mt-6 bg-black/40 rounded-3xl shadow-xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-8">
          Other Users' Reviews
        </h2>

        {/* NO REVIEWS YET MESSAGE */}
        {reviews.length === 0 ? (
          <p className="text-center text-gray-400 text-lg py-10">
            No ratings yet.
          </p>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
            <ReviewList reviews={reviews} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
