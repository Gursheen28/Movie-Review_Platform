import React, { useState } from 'react';

const ReviewForm = ({ movieId, addReview }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(review.trim() === '') return;
    addReview(movieId, review);
    setReview('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="p-2 rounded text-black"
      />
      <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded font-bold">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
