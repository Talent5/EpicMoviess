import { useState, useEffect, useCallback } from "react";

export const useFetch = (apiPath) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL(`https://api.themoviedb.org/3/${apiPath}`);
      url.searchParams.append('api_key', process.env.REACT_APP_API_KEY);
      url.searchParams.append('page', page.toString());

      const response = await fetch(url);
      const json = await response.json();
      
      if (json.results.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => page === 1 ? json.results : [...prevData, ...json.results]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  }, [apiPath, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const resetData = () => {
    setData([]);
    setPage(1);
    setHasMore(true);
  };

  return { data, loading, hasMore, loadMore, resetData };
};