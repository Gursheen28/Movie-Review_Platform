import { motion } from "framer-motion";

export default function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden w-72 sm:w-80 relative group"
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-[36rem] sm:h-[40rem] object-cover group-hover:opacity-75 transition"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold truncate text-amber-400">{movie.title}</h3>
        <p className="text-gray-400 text-base">
          ⭐ {movie.vote_average?.toFixed(1)} | 📅 {movie.release_date?.slice(0, 4) || "N/A"}
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition rounded-2xl"></div>
    </motion.div>
  );
}
