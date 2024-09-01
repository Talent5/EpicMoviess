import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useFetch } from "../hooks/useFetch";

export const Search = ({ apiPath }) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q");
  const { data: movies = [], loading, hasMore, loadMore } = useFetch(apiPath, queryTerm);

  const renderResultsMessage = () => {
    if (loading) return null;
    if (movies.length === 0) return `No results found for '${queryTerm}'`;
    return `Results for '${queryTerm}'`;
  };

  return (
    <main>
      <section className="py-7">
        <p className="text-3xl text-gray-700 dark:text-white">
          {renderResultsMessage()}
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-7">
        <div className="flex justify-start flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : (
            movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))
          )}
        </div>

        {hasMore && !loading && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={loadMore} 
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
};



