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

      const videos = vidData.results || [];
      let t = videos.find((v) => v.type === "Trailer" && v.site === "YouTube");
      if (!t) t = videos.find((v) => v.type === "Teaser" && v.site === "YouTube");
      if (!t) t = videos.find((v) => v.site === "YouTube");
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
    <main className="bg-black">
      {backdrop && (
        <div className="relative h-[60vh] min-h-[500px]">
          <img src={backdrop} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        </div>
      )}

      <section className={`max-w-[1280px] mx-auto px-8 lg:px-16 ${backdrop ? "-mt-48" : "pt-20"} relative z-10`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="flex-shrink-0 w-64 mx-auto md:mx-0">
            <img src={image} alt={movie.title} className="w-full rounded-lg" />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg text-gray-400 italic mb-5">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-5">
              {movie.vote_average > 0 && (
                <span className="flex items-center gap-1.5 text-lg font-bold text-white">
                  <svg className="w-5 h-5 text-netflix-red" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.vote_average.toFixed(1)}
                  <span className="text-gray-400 text-sm font-normal">/10 &middot; {movie.vote_count?.toLocaleString()} votes</span>
                </span>
              )}
            </div>

            {movie.genres && (
              <div className="flex flex-wrap gap-2 mb-5">
                {movie.genres.map((g) => (
                  <span key={g.id} className="px-3 py-1 bg-white/10 text-gray-200 text-[13px] font-medium rounded">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-2xl">{movie.overview}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-[11px] text-gray-500 mb-1">STATUS</p>
                <p className="text-sm text-white font-medium">{movie.status || "N/A"}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mb-1">RUNTIME</p>
                <p className="text-sm text-white font-medium">{movie.runtime ? `${movie.runtime}m` : "N/A"}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mb-1">BUDGET</p>
                <p className="text-sm text-white font-medium">{fmtCurrency(movie.budget)}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mb-1">REVENUE</p>
                <p className="text-sm text-white font-medium">{fmtCurrency(movie.revenue)}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mb-1">RELEASE</p>
                <p className="text-sm text-white font-medium">{movie.release_date || "N/A"}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mb-1">IMDB</p>
                {movie.imdb_id ? (
                  <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer" className="text-sm text-netflix-red font-medium hover:underline">
                    {movie.imdb_id}
                  </a>
                ) : (
                  <p className="text-sm text-white font-medium">N/A</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {trailer && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-14 max-w-4xl"
          >
            <h2 className="text-2xl font-black text-white mb-5">Watch Trailer</h2>
            <div className="relative rounded-lg overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&modestbranding=1`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
          </motion.section>
        )}

        {cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-14"
          >
            <h2 className="text-2xl font-black text-white mb-5">Cast</h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {cast.map((actor) => (
                <div key={actor.id} className="flex-shrink-0 w-28 text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-800 mb-2">
                    {actor.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-xl font-bold">{actor.name?.charAt(0)}</div>
                    )}
                  </div>
                  <p className="text-[13px] text-white truncate font-medium">{actor.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {similar.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 mb-16"
          >
            <h2 className="text-2xl font-black text-white mb-5">More Like This</h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {similar.map((movie, idx) => (
                <div key={movie.id} className="flex-shrink-0 w-[180px]">
                  <Card movie={movie} index={idx} />
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </section>
    </main>
  );
};
