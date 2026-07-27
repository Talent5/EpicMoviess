import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";

export const Header = ({ isRoot }) => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = e.target.search.value.trim();
    if (!q) return;
    e.target.reset();
    setShowSearch(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-500 ${isRoot ? "bg-gradient-to-b from-black/80 to-transparent" : "bg-black"}`}>
      <nav className="flex items-center justify-between px-6 lg:px-16 py-3 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center shrink-0">
            <img src={Logo} className="h-7 lg:h-8" alt="EpicMovies" />
            <span className="text-netflix-red text-xl lg:text-2xl font-black tracking-tight ml-2 hidden sm:inline">
              EPIC<span className="text-white">MOVIES</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/movies/popular", label: "Popular" },
              { to: "/movies/top", label: "Top Rated" },
              { to: "/movies/upcoming", label: "Upcoming" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-1 text-[13px] font-medium rounded transition-colors ${
                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {showSearch ? (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                onSubmit={handleSubmit}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  name="search"
                  autoFocus
                  placeholder="Search movies..."
                  className="w-full bg-gray-900 border border-gray-700 text-white text-sm px-4 py-2 rounded outline-none focus:border-gray-400 placeholder-gray-500"
                  autoComplete="off"
                  onBlur={() => setShowSearch(false)}
                />
              </motion.form>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowSearch(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          <div className="relative group hidden sm:block">
            <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Menu">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-gray-900 border border-gray-700 rounded overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {[
                { to: "/", label: "Home" },
                { to: "/movies/popular", label: "Popular" },
                { to: "/movies/top", label: "Top Rated" },
                { to: "/movies/upcoming", label: "Upcoming" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className="block px-4 py-2.5 text-[13px] text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="border-gray-700" />
              <button
                onClick={() => setShowSearch(true)}
                className="w-full text-left px-4 py-2.5 text-[13px] text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
