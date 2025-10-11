import { Star } from "lucide-react";
import { useState } from "react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => {
        const rate = i + 1;
        return (
          <Star
            key={rate}
            className={`cursor-pointer w-7 h-7 transition ${
              rate <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-600 hover:text-yellow-300"
            }`}
            onClick={() => setRating(rate)}
            onMouseEnter={() => setHover(rate)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
}
