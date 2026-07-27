import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";

export const Header = ({ isRoot }) => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryTerm = event.target.search.value;
    event.target.reset();
    setShowSearch(false);
    return navigate(`/search?q=${queryTerm}`);
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-500 ${isRoot ? "bg-transparent" : "bg-deep-space"}`}>
      <nav className="flex items-center justify-between px-8 lg:px-16 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} className="h-8" alt="EpicMovies" />
            <span className="text-netflix-red text-2xl font-black tracking-tight hidden sm:block">
              EPIC MOVIES
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-body font-medium transition-colors hover:text-silver ${isActive ? "text-chalk-white" : "text-silver"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies/popular"
              className={({ isActive }) =>
                `text-body font-medium transition-colors hover:text-silver ${isActive ? "text-chalk-white" : "text-silver"}`
              }
            >
              Popular
            </NavLink>
            <NavLink
              to="/movies/top"
              className={({ isActive }) =>
                `text-body font-medium transition-colors hover:text-silver ${isActive ? "text-chalk-white" : "text-silver"}`
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/movies/upcoming"
              className={({ isActive }) =>
                `text-body font-medium transition-colors hover:text-silver ${isActive ? "text-chalk-white" : "text-silver"}`
              }
            >
              Upcoming
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence>
            {showSearch ? (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                onSubmit={handleSubmit}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  name="search"
                  autoFocus
                  placeholder="Titles, people, genres"
                  className="w-full bg-gray-800 border border-gray-600 text-white text-sm px-4 py-2 rounded outline-none focus:border-gray-400 placeholder:text-gray-500"
                  autoComplete="off"
                  onBlur={() => setShowSearch(false)}
                />
              </motion.form>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowSearch(true)}
                className="text-silver hover:text-chalk-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <a
            href="https://github.com/Talent5/EpicMoviess"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center bg-netflix-red hover:bg-[#f40612] text-chalk-white text-caption font-medium px-4 py-1.5 rounded-buttons transition-colors"
          >
            GitHub
          </a>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <div className="relative group">
              <button className="text-silver hover:text-chalk-white transition-colors p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-graphite border border-slate rounded-buttons overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <NavLink to="/" end className="block px-4 py-3 text-caption text-silver hover:text-chalk-white hover:bg-charcoal transition-colors">Home</NavLink>
                <NavLink to="/movies/popular" className="block px-4 py-3 text-caption text-silver hover:text-chalk-white hover:bg-charcoal transition-colors">Popular</NavLink>
                <NavLink to="/movies/top" className="block px-4 py-3 text-caption text-silver hover:text-chalk-white hover:bg-charcoal transition-colors">Top Rated</NavLink>
                <NavLink to="/movies/upcoming" className="block px-4 py-3 text-caption text-silver hover:text-chalk-white hover:bg-charcoal transition-colors">Upcoming</NavLink>
                <div className="border-t border-slate">
                  <button onClick={() => { setShowSearch(true); }} className="w-full text-left px-4 py-3 text-caption text-silver hover:text-chalk-white hover:bg-charcoal transition-colors">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
