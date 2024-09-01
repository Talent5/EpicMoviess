import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useFetch } from "../hooks/useFetch";

export const Search = ({ apiPath }) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const { data: movies = [], loading, hasMore, loadMore } = useFetch(apiPath, queryTerm);

  return (
    <main>
      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
        {/* Optionally include a "Load More" button if there's more data to fetch */}
        {hasMore && !loading && (
          <button onClick={loadMore} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Load More
          </button>
        )}
      </section>
    </main>
  );
};



