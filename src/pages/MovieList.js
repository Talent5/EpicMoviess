import { Card } from "../components/Card";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";

export const MovieList = ({ apiPath, title}) => {
  const { data: movies, loading, hasMore, loadMore } = useFetch(apiPath);


  useEffect (() =>
  {
    document.title= `${title} - Epic Movies `
  })



  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {!loading && hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={loadMore}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Load More
            </button>
          </div>
        )}
        {!hasMore && movies.length > 0 && (
          <p className="text-center mt-4">No more movies to load.</p>
        )}
        {!hasMore && movies.length === 0 && (
          <p className="text-center mt-4">No movies found.</p>
        )}
      </section>
    </main>
  );
};
