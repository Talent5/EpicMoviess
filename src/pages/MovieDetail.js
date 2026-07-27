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
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setMovie(await res.json());
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
      const [vidData, castData, simData] = await Promise.all([vidRes.json(), castRes.json(), simRes.json()]);
      const t = vidData.results?.find((v) => v.type === "Trailer" && v.site === "YouTube");
      if (t) setTrailer(t.key);
      setCast(castData.cast?.slice(0, 15) || []);
      setSimilar(simData.results?.slice(0, 12) || []);
    }
    fetchExtras();
  }, [params.id]);

  useEffect(() => {
    document.title = movie.title ? `${movie.title} - Epic Movies` : "Epic Movies";
  }, [movie.title]);

  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : Backup;
  const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;
  const fmtCurrency = (n) => n ? `$${n.toLocaleString()}` : "N/A";

  return (
    <main className="bg-deep-space">
      {/* Backdrop */}
      {backdrop && (
        <div className="relative h-[60vh] min-h-[500px]">
          <img src={backdrop} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/60 to-deep-space/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-space/80 via-transparent to-deep-space/40" />
        </div>
      )}

      {/* Content */}
      <section className={`max-w-[1280px] mx-auto px-8 lg:px-16 ${backdrop ? "-mt-48" : "pt-20"} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="flex-shrink-0 w-72 mx-auto md:mx-0">
            <img src={image} alt={movie.title} className="w-full rounded-cards" />
          </div>

          <div className="flex-1">
            <h1 className="text-heading md:text-[48px] font-black text-chalk-white leading-tight mb-3">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-subheading text-silver italic mb-6">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1.5 text-subheading font-bold text-chalk-white">
                  <svg className="w-5 h-5 text-netflix-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average.toFixed(1)}
                  <span className="text-silver text-body font-normal">/ 10 · {movie.vote_count?.toLocaleString()} votes</span>
                </span>
              )}
            </div>

            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((g) => (
                  <span key={g.id} className="px-4 py-1.5 bg-charcoal text-chalk-white text-caption font-medium rounded-buttons">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-body text-silver leading-relaxed mb-8 max-w-2xl">{movie.overview}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-caption text-ash mb-1">Status</p>
                <p className="text-body text-chalk-white font-medium">{movie.status || "N/A"}</p>
              </div>
              <div>
                <p className="text-caption text-ash mb-1">Runtime</p>
                <p className="text-body text-chalk-white font-medium">{movie.runtime ? `${movie.runtime} min` : "N/A"}</p>
              </div>
              <div>
                <p className="text-caption text-ash mb-1">Budget</p>
                <p className="text-body text-chalk-white font-medium">{fmtCurrency(movie.budget)}</p>
              </div>
              <div>
                <p className="text-caption text-ash mb-1">Revenue</p>
                <p className="text-body text-chalk-white font-medium">{fmtCurrency(movie.revenue)}</p>
              </div>
              <div>
                <p className="text-caption text-ash mb-1">Release Date</p>
                <p className="text-body text-chalk-white font-medium">{movie.release_date || "N/A"}</p>
              </div>
              <div>
                <p className="text-caption text-ash mb-1">IMDB</p>
                {movie.imdb_id ? (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body text-netflix-red font-medium hover:underline"
                  >
                    {movie.imdb_id}
                  </a>
                ) : (
                  <p className="text-body text-chalk-white font-medium">N/A</p>
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
            className="mt-12 max-w-4xl"
          >
            <h2 className="text-heading-sm font-black text-chalk-white mb-6">Trailer</h2>
            <div className="relative rounded-cards overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-heading-sm font-black text-chalk-white mb-6">Cast</h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {cast.map((actor) => (
                <div key={actor.id} className="flex-shrink-0 w-32 text-center group">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-charcoal mb-2">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-chalk-white text-xl font-bold">
                        {actor.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="text-caption text-chalk-white truncate font-medium">{actor.name}</p>
                  <p className="text-[11px] text-ash truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 mb-12"
          >
            <h2 className="text-heading-sm font-black text-chalk-white mb-6">More Like This</h2>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
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
