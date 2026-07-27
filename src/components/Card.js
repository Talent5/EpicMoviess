import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Backup from "../assets/backup.png";

export const Card = ({ movie, index = 0 }) => {
  const { id, title, overview, poster_path, vote_average, release_date } = movie;
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : Backup;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="w-[280px] flex-shrink-0 m-3"
    >
      <Link to={`/movie/${id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="aspect-[2/3] overflow-hidden">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={image}
              alt={title}
              loading="lazy"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-white text-sm leading-relaxed line-clamp-4">{overview}</p>
          </div>

          {vote_average > 0 && (
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {vote_average.toFixed(1)}
            </div>
          )}
        </div>

        <div className="mt-3 px-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          {release_date && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {release_date.split("-")[0]}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};
