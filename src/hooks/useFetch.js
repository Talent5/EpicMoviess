import { useState, useEffect, useCallback, useRef } from "react";

const GENRES_CACHE = {};

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const abortRef = useRef(null);

  useEffect(() => {
    async function fetchGenres() {
      if (GENRES_CACHE.list) { setGenres(GENRES_CACHE.list); return; }
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`);
        const json = await res.json();
        GENRES_CACHE.list = json.genres || [];
        setGenres(GENRES_CACHE.list);
      } catch (e) { console.error("Failed to fetch genres", e); }
    }
    fetchGenres();
  }, []);

  const fetchMovies = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const url = new URL(`https://api.themoviedb.org/3/${apiPath}`);
      url.searchParams.append("api_key", process.env.REACT_APP_API_KEY);
      url.searchParams.append("page", page.toString());
      if (queryTerm) url.searchParams.append("query", queryTerm);
      if (selectedGenre) url.searchParams.append("with_genres", selectedGenre);
      const response = await fetch(url, { signal: controller.signal });
      const json = await response.json();
      if (!response.ok || !json.results) throw new Error(json.status_message || `HTTP ${response.status}`);
      if (json.results.length === 0) { setHasMore(false); }
      else { setData((prev) => page === 1 ? json.results : [...prev, ...json.results]); }
    } catch (error) {
      if (error.name !== "AbortError") console.error("Error fetching movies:", error);
    }
    setLoading(false);
  }, [apiPath, page, queryTerm, selectedGenre]);

  useEffect(() => {
    resetData();
    fetchMovies();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [fetchMovies, queryTerm, selectedGenre]);

  const loadMore = () => { if (!loading && hasMore) setPage((prev) => prev + 1); };
  const resetData = () => { if (abortRef.current) abortRef.current.abort(); setData([]); setPage(1); setHasMore(true); };
  const changeGenre = (id) => setSelectedGenre(id);

  return { data, loading, hasMore, loadMore, resetData, genres, selectedGenre, changeGenre };
};
