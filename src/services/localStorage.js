// services/localStorage.js

// Get all reviews for a specific movie
export const getReviews = (movieId) => {
  const stored = JSON.parse(localStorage.getItem("reviews"));
  if (!Array.isArray(stored)) return [];
  return stored.filter((rev) => rev.movieId === movieId);
};

// Get all reviews of a specific user
export const getAllUserReviews = (username) => {
  const stored = JSON.parse(localStorage.getItem("reviews"));
  if (!Array.isArray(stored)) return [];
  return stored.filter((rev) => rev.user === username);
};

// Add a review
export const addReview = (review) => {
  let stored = JSON.parse(localStorage.getItem("reviews"));
  if (!Array.isArray(stored)) stored = [];
  stored.push(review);
  localStorage.setItem("reviews", JSON.stringify(stored));
};

// Delete a review by its unique ID
export const deleteReview = (reviewId) => {
  let stored = JSON.parse(localStorage.getItem("reviews"));
  if (!Array.isArray(stored)) stored = [];
  const updated = stored.filter((rev) => rev.id !== reviewId);
  localStorage.setItem("reviews", JSON.stringify(updated));
};
