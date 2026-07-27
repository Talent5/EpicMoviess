import { useSearchParams } from "react-router-dom";
import { Card, Skeleton } from "../components";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const Search = ({ apiPath }) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const { data: movies = [], loading, hasMore, loadMore } = useFetch(apiPath, queryTerm);

  useEffect(() => {
    document.title = `Search: ${queryTerm} - Epic Movies`;
  }, [queryTerm]);

  return (
    <main className="bg-deep-space pt-20">
      <section className="max-w-screen-2xl mx-auto px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-heading-sm font-black text-chalk-white mb-8"
        >
          {loading
            ? "Searching..."
            : movies.length === 0
            ? `No results for "${queryTerm}"`
            : `Results for "${queryTerm}"`}
        </motion.h2>

        {loading && movies.length === 0 ? (
          <Skeleton count={8} />
        ) : (
          <div className="flex flex-wrap gap-2">
            {movies.map((movie, index) => (
              <Card key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}

        {loading && movies.length > 0 && (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-2 border-silver border-t-netflix-red rounded-full animate-spin" />
          </div>
        )}

        {hasMore && !loading && (
          <div className="flex justify-center py-8">
            <button
              onClick={loadMore}
              className="bg-netflix-red hover:bg-[#f40612] text-chalk-white font-bold text-body px-8 py-3 rounded-buttons transition-all duration-300 hover:scale-105"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
