import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    discover: [
      { label: "Home", to: "/" },
      { label: "Now Playing", to: "/" },
      { label: "Popular", to: "/movies/popular" },
      { label: "Top Rated", to: "/movies/top" },
      { label: "Upcoming", to: "/movies/upcoming" },
    ],
    connect: [
      { label: "Twitter", to: "https://twitter.com/BoiAli3" },
      { label: "Instagram", to: "https://instagram.com/boiali5" },
      { label: "LinkedIn", to: "https://linkedin.com/in/talent-mundwa-a7b545270" },
      { label: "GitHub", to: "https://github.com/Talent5" },
    ],
    about: [
      { label: "TMDB", to: "https://www.themoviedb.org/" },
      { label: "Source Code", to: "https://github.com/Talent5/EpicMoviess" },
    ],
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-flex items-center mb-5">
              <span className="text-netflix-red text-lg font-black tracking-tight">
                EPIC<span className="text-white">MOVIES</span>
              </span>
            </Link>
          </div>
          <div>
            <h3 className="text-white text-[13px] font-medium mb-4 tracking-wide uppercase">Discover</h3>
            <ul className="space-y-2">
              {links.discover.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[13px] text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-[13px] font-medium mb-4 tracking-wide uppercase">Connect</h3>
            <ul className="space-y-2">
              {links.connect.map((l) => (
                <li key={l.to}>
                  <a href={l.to} target="_blank" rel="noreferrer" className="text-[13px] text-gray-400 hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white text-[13px] font-medium mb-4 tracking-wide uppercase">About</h3>
            <ul className="space-y-2">
              {links.about.map((l) => (
                <li key={l.to}>
                  <a href={l.to} target="_blank" rel="noreferrer" className="text-[13px] text-gray-400 hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-500">
            &copy; {year} Epic Movies. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-600">
            Powered by{" "}
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="hover:text-gray-400 transition-colors">
              TMDB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
