import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchTrending() {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const json = await response.json();
      if (json.results?.length > 0) {
        const featured = json.results[Math.floor(Math.random() * 5)];
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/movie/${featured.id}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const detail = await detailRes.json();
        setMovie(detail);
      }
    }
    fetchTrending();
  }, []);

  if (!movie) return null;

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center"
      >
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            {movie.title}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center gap-1 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-300">{movie.release_date?.split("-")[0]}</span>
            <span className="text-gray-300">{movie.runtime} min</span>
          </div>
          <p className="text-gray-300 text-lg mb-6 line-clamp-3">{movie.overview}</p>
          <div className="flex gap-3 flex-wrap">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Details
            </Link>
            {movie.genres?.slice(0, 3).map((g) => (
              <span
                key={g.id}
                className="inline-flex items-center px-4 py-3 rounded-full border border-white/30 text-white text-sm backdrop-blur-sm"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
