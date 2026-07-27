import { useState, useEffect } from "react";
import { CardRow } from "./Card";

export const Recommendations = () => {
  const [sections, setSections] = useState({ trending: [], topRated: [], popular: [], upcoming: [] });

  useEffect(() => {
    async function fetchSections() {
      const key = process.env.REACT_APP_API_KEY;
      const [trendingRes, topRes, popRes, upRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`),
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`),
      ]);
      const [trending, topRated, popular, upcoming] = await Promise.all([
        trendingRes.json(), topRes.json(), popRes.json(), upRes.json(),
      ]);
      setSections({
        trending: trending.results?.slice(0, 12) || [],
        topRated: topRated.results?.slice(0, 12) || [],
        popular: popular.results?.slice(0, 12) || [],
        upcoming: upcoming.results?.slice(0, 12) || [],
      });
    }
    fetchSections();
  }, []);

  return (
    <>
      {sections.trending.length > 0 && <CardRow movies={sections.trending} title="Trending Now" />}
      {sections.topRated.length > 0 && <CardRow movies={sections.topRated} title="Top Rated" />}
      {sections.popular.length > 0 && <CardRow movies={sections.popular} title="Popular This Week" />}
      {sections.upcoming.length > 0 && <CardRow movies={sections.upcoming} title="Coming Soon" />}
    </>
  );
};
