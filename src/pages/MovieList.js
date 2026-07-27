import { Card, Skeleton, Hero } from "../components";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MovieList = ({ apiPath, title }) => {
  const { data: movies, loading, hasMore, loadMore, genres, selectedGenre, changeGenre } =
    useFetch(apiPath);

  const isHome = title === "Home";

  useEffect(() => {
    document.title = `${title} - Epic Movies`;
  }, [title]);

  return (
    <main>
      <AnimatePresence mode="wait">
        {isHome && <Hero />}
      </AnimatePresence>

      <section className="max-w-7xl mx-auto py-7 px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
            {isHome ? "Now Playing" : title}
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => changeGenre("")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedGenre === ""
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              All
            </button>
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => changeGenre(g.id.toString())}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedGenre === g.id.toString()
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && movies.length === 0 ? (
            <Skeleton count={8} />
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start flex-wrap"
            >
              {movies.map((movie, index) => (
                <Card key={movie.id} movie={movie} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {loading && movies.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && !loading && movies.length > 0 && (
          <p className="text-center mt-8 text-gray-500 dark:text-gray-400">You've reached the end!</p>
        )}
        {!hasMore && !loading && movies.length === 0 && (
          <p className="text-center mt-8 text-gray-500 dark:text-gray-400">No movies found.</p>
        )}
      </section>
    </main>
  );
};
