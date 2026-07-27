import { Card, Skeleton, Hero } from "../components";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const MovieList = ({ apiPath, title }) => {
  const { data: movies, loading, hasMore, loadMore, genres, selectedGenre, changeGenre } =
    useFetch(apiPath);
  const isHome = title === "Home";

  useEffect(() => {
    document.title = `${title} - Epic Movies`;
  }, [title]);

  return (
    <main className="bg-deep-space">
      {isHome && <Hero />}

      <section className={`max-w-screen-2xl mx-auto ${isHome ? "-mt-20 relative z-10 pt-8" : "pt-20"}`}>
        {/* Genre Filter */}
        <div className="flex items-center gap-2 px-8 lg:px-16 mb-8 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => changeGenre("")}
            className={`px-5 py-1.5 rounded-buttons text-caption font-medium whitespace-nowrap transition-all ${
              selectedGenre === ""
                ? "bg-chalk-white text-deep-space"
                : "bg-charcoal text-silver hover:bg-slate"
            }`}
          >
            All
          </button>
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => changeGenre(g.id.toString())}
              className={`px-5 py-1.5 rounded-buttons text-caption font-medium whitespace-nowrap transition-all ${
                selectedGenre === g.id.toString()
                  ? "bg-chalk-white text-deep-space"
                  : "bg-charcoal text-silver hover:bg-slate"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading && movies.length === 0 ? (
          <Skeleton count={8} />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2 px-8 lg:px-16"
            >
              {movies.map((movie, index) => (
                <Card key={movie.id} movie={movie} index={index} />
              ))}
            </motion.div>

            {loading && movies.length > 0 && (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-2 border-silver border-t-netflix-red rounded-full animate-spin" />
              </div>
            )}

            {!loading && hasMore && (
              <div className="flex justify-center py-8">
                <button
                  onClick={loadMore}
                  className="bg-netflix-red hover:bg-[#f40612] text-chalk-white font-bold text-body px-8 py-3 rounded-buttons transition-all duration-300 hover:scale-105"
                >
                  Load More
                </button>
              </div>
            )}

            {!hasMore && !loading && movies.length === 0 && (
              <p className="text-center py-16 text-silver text-body">No movies found.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
};
