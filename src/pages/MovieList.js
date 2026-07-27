import { Card, Skeleton, Hero } from "../components";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const MovieList = ({ apiPath, title }) => {
  const { data: movies, loading, hasMore, loadMore, genres, selectedGenre, changeGenre } =
    useFetch(apiPath);
  const isHome = title === "Home";
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => { if (el) el.removeEventListener("scroll", checkScroll); };
  }, [genres]);

  useEffect(() => {
    document.title = `${title} - Epic Movies`;
  }, [title]);

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <main className="bg-deep-space">
      {isHome && <Hero />}

      <section className={`max-w-screen-2xl mx-auto ${isHome ? "-mt-20 relative z-10 pt-8" : "pt-20"}`}>
        <div className="px-8 lg:px-16 mb-6">
          {/* Genre Filter Bar */}
          <div className="relative group/genres">
            {canScrollLeft && (
              <button
                onClick={() => scroll(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-deep-space/80 hover:bg-deep-space text-silver hover:text-chalk-white p-1 transition-colors rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto hide-scrollbar pb-1"
            >
              <button
                onClick={() => changeGenre("")}
                className={`flex-shrink-0 px-4 py-1.5 text-[13px] font-medium rounded transition-all duration-200 ${
                  selectedGenre === ""
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/10 bg-white/5"
                }`}
              >
                All
              </button>
              {genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => changeGenre(g.id.toString())}
                  className={`flex-shrink-0 px-4 py-1.5 text-[13px] font-medium rounded transition-all duration-200 ${
                    selectedGenre === g.id.toString()
                      ? "bg-white text-black"
                      : "text-gray-300 hover:text-white hover:bg-white/10 bg-white/5"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
            {canScrollRight && (
              <>
                <button
                  onClick={() => scroll(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-deep-space/80 hover:bg-deep-space text-silver hover:text-chalk-white p-1 transition-colors rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-deep-space to-transparent pointer-events-none" />
              </>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && movies.length === 0 && (
          <Skeleton count={8} />
        )}

        {/* Card Grid */}
        {movies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 px-8 lg:px-16"
          >
            {movies.map((movie, index) => (
              <Card key={movie.id} movie={movie} index={index} />
            ))}
          </motion.div>
        )}

        {/* Load More Spinner */}
        {loading && movies.length > 0 && (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-2 border-white/20 border-t-netflix-red rounded-full animate-spin" />
          </div>
        )}

        {/* Load More Button */}
        {!loading && hasMore && movies.length > 0 && (
          <div className="flex justify-center py-8">
            <button
              onClick={loadMore}
              className="bg-netflix-red hover:bg-[#f40612] text-white font-bold text-sm px-8 py-3 rounded transition-transform hover:scale-105"
            >
              Load More
            </button>
          </div>
        )}

        {/* No Results */}
        {!hasMore && !loading && movies.length === 0 && (
          <p className="text-center py-16 text-gray-400 text-sm">No movies found.</p>
        )}
      </section>
    </main>
  );
};
