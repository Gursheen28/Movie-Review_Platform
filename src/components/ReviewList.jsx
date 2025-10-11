import React from "react";
import { Star } from "lucide-react";

export default function ReviewList({ reviews }) {
  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-gray-900/70 border border-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          {/* USER INFO */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-amber-400 text-lg">
              {review.user || "Anonymous"} {/* fallback if user not present */}
            </h4>
            <p className="text-sm text-gray-400">
              {review.date} • {review.time}
            </p>
          </div>

          {/* STAR RATING */}
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating ? "text-yellow-400" : "text-gray-600"
                }`}
                fill={i < review.rating ? "#facc15" : "none"}
              />
            ))}
            <span className="ml-2 text-amber-300 font-medium">
              {review.rating}/5
            </span>
          </div>

          {/* REVIEW TEXT */}
          <p className="text-gray-300 leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
