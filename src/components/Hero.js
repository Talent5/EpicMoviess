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
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt=""
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-space via-deep-space/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative h-full max-w-[1280px] mx-auto px-16 flex flex-col justify-center"
      >
        <div className="max-w-xl">
          <h1 className="text-display md:text-[80px] font-black text-chalk-white leading-none mb-6 drop-shadow-lg tracking-tight">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-subheading font-bold text-chalk-white">
              <svg className="w-5 h-5 text-netflix-red" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.vote_average?.toFixed(1)}
              <span className="text-silver font-normal text-body">/ 10</span>
            </span>
            <span className="text-silver text-body">{movie.release_date?.split("-")[0]}</span>
            <span className="text-silver text-body">{movie.runtime}m</span>
          </div>

          <p className="text-subheading text-silver mb-8 leading-relaxed line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex items-center gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center gap-3 bg-netflix-red hover:bg-[#f40612] text-chalk-white font-bold text-subheading px-8 py-4 rounded-buttons transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
