import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Backup from "../assets/backup.png";
import { Card } from "../components/Card";

export const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const json = await response.json();
      setMovie(json);
    }
    fetchMovie();
  }, [params.id]);

  useEffect(() => {
    async function fetchExtras() {
      const [vidRes, castRes, simRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API_KEY}`),
      ]);
      const vidData = await vidRes.json();
      const castData = await castRes.json();
      const simData = await simRes.json();

      const trailerVideo = vidData.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailerVideo) setTrailer(trailerVideo.key);
      setCast(castData.cast?.slice(0, 12) || []);
      setSimilar(simData.results?.slice(0, 8) || []);
    }
    fetchExtras();
  }, [params.id]);

  useEffect(() => {
    document.title = movie.title ? `${movie.title} - Epic Movies` : "Epic Movies";
  }, [movie.title]);

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : Backup;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const formatCurrency = (n) =>
    n ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n) : "N/A";

  return (
    <main>
      {/* Backdrop Hero */}
      {backdrop && (
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img src={backdrop} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-gray-50/70 dark:via-gray-900/70 to-gray-50/50 dark:to-gray-900/50" />
        </section>
      )}

      {/* Movie Info Section */}
      <section className={`max-w-7xl mx-auto px-4 ${backdrop ? "-mt-48" : "pt-8"} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={image}
              alt={movie.title}
              className="w-64 rounded-xl shadow-2xl"
            />
          </div>

          <div className="flex-1 text-gray-900 dark:text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-lg text-gray-500 dark:text-gray-400 italic mb-4">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              <span className="text-gray-500 dark:text-gray-400">{movie.vote_count?.toLocaleString()} votes</span>
              <span className="text-gray-500 dark:text-gray-400">|</span>
              <span className="text-gray-500 dark:text-gray-400">{movie.runtime} min</span>
              <span className="text-gray-500 dark:text-gray-400">|</span>
              <span className="text-gray-500 dark:text-gray-400">{movie.release_date}</span>
            </div>

            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((g) => (
                  <span key={g.id} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-lg leading-relaxed mb-6">{movie.overview}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Status</p>
                <p className="font-medium">{movie.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Budget</p>
                <p className="font-medium">{formatCurrency(movie.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Revenue</p>
                <p className="font-medium">{formatCurrency(movie.revenue)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">IMDB</p>
                {movie.imdb_id ? (
                  <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    {movie.imdb_id}
                  </a>
                ) : (
                  <p className="font-medium">N/A</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trailer */}
        {trailer && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Watch Trailer</h2>
            <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.section>
        )}

        {/* Cast Section */}
        {cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Top Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {cast.map((actor) => (
                <div key={actor.id} className="flex-shrink-0 w-32 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                        {actor.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{actor.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Similar Movies</h2>
            <div className="flex justify-start flex-wrap">
              {similar.map((movie, idx) => (
                <Card key={movie.id} movie={movie} index={idx} />
              ))}
            </div>
          </motion.section>
        )}
      </section>
    </main>
  );
};
