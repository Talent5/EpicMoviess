import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Backup from "../assets/backup.png";

export const Card = ({ movie, index = 0 }) => {
  const { id, title, poster_path, release_date } = movie;
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : Backup;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group"
    >
      <Link to={`/movie/${id}`} className="block">
        <div className="w-full rounded-cards smooth-hover hover:scale-105">
          <div className="aspect-[2/3] bg-charcoal overflow-hidden rounded-cards">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </Link>
      <div className="mt-2 px-1">
        <p className="text-caption text-silver truncate">{title}</p>
        {release_date && (
          <p className="text-[11px] text-ash mt-0.5">{release_date.split("-")[0]}</p>
        )}
      </div>
    </motion.div>
  );
};

export const CardRow = ({ movies, title }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="px-6 lg:px-16 mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="relative group/row">
        <div className="flex gap-2 px-6 lg:px-16 overflow-x-auto hide-scrollbar card-row pb-1 scroll-smooth">
          {movies.map((movie, index) => (
            <div key={movie.id} className="flex-shrink-0 w-[180px]">
              <Card movie={movie} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
