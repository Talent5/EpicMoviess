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
    <main>
      <section className="max-w-7xl mx-auto py-7 px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
        >
          {loading ? "Searching..." : movies.length === 0 ? `No results found for '${queryTerm}'` : `Results for '${queryTerm}'`}
        </motion.h2>

        {loading && movies.length === 0 ? (
          <Skeleton count={8} />
        ) : (
          <div className="flex justify-start flex-wrap">
            {movies.map((movie, index) => (
              <Card key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}

        {loading && movies.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {hasMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
