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

  const resolveApiPath = useCallback(() => {
    if (queryTerm) return `search/movie`;
    if (selectedGenre) {
      const sortMap = {
        "movie/now_playing": "popularity.desc",
        "movie/popular": "popularity.desc",
        "movie/top_rated": "vote_average.desc",
        "movie/upcoming": "release_date.asc",
      };
      const sortBy = sortMap[apiPath] || "popularity.desc";
      return `discover/movie?sort_by=${sortBy}`;
    }
    return apiPath;
  }, [apiPath, queryTerm, selectedGenre]);

  const fetchMoviesForPage = useCallback(async (requestedPage) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const path = resolveApiPath();
      const basePath = path.includes("?") ? path.split("?")[0] : path;
      const url = new URL(`https://api.themoviedb.org/3/${basePath}`);
      url.searchParams.append("api_key", process.env.REACT_APP_API_KEY);
      url.searchParams.append("page", requestedPage.toString());

      if (path.includes("?")) {
        const params = new URLSearchParams(path.split("?")[1]);
        params.forEach((v, k) => url.searchParams.append(k, v));
      }

      if (queryTerm) url.searchParams.append("query", queryTerm);
      if (selectedGenre) url.searchParams.append("with_genres", selectedGenre);

      const response = await fetch(url, { signal: controller.signal });
      const json = await response.json();
      if (!response.ok || !json.results) throw new Error(json.status_message || `HTTP ${response.status}`);
      if (json.results.length === 0) { setHasMore(false); }
      else { setData((prev) => requestedPage === 1 ? json.results : [...prev, ...json.results]); }
    } catch (error) {
      if (error.name !== "AbortError") console.error("Error fetching movies:", error);
    }
    setLoading(false);
  }, [resolveApiPath, queryTerm, selectedGenre]);

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchMoviesForPage(1);
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [fetchMoviesForPage, queryTerm, selectedGenre]);

  useEffect(() => {
    if (page === 1) return;
    fetchMoviesForPage(page);
  }, [page, fetchMoviesForPage]);

  const loadMore = () => { if (!loading && hasMore) setPage((prev) => prev + 1); };
  const changeGenre = (id) => setSelectedGenre(id);

  return { data, loading, hasMore, loadMore, genres, selectedGenre, changeGenre };
};
