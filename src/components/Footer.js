import { Link } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-space border-t border-slate/20">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-16 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[
            { label: "Home", to: "/" },
            { label: "Popular", to: "/movies/popular" },
            { label: "Top Rated", to: "/movies/top" },
            { label: "Upcoming", to: "/movies/upcoming" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-caption text-silver hover:text-chalk-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://instagram.com/boiali5"
            target="_blank"
            rel="noreferrer"
            className="text-caption text-silver hover:text-chalk-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/in/talent-mundwa-a7b545270"
            target="_blank"
            rel="noreferrer"
            className="text-caption text-silver hover:text-chalk-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/BoiAli3"
            target="_blank"
            rel="noreferrer"
            className="text-caption text-silver hover:text-chalk-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://github.com/Talent5"
            target="_blank"
            rel="noreferrer"
            className="text-caption text-silver hover:text-chalk-white transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-[11px] text-ash">
          &copy; {year} Epic Movies. All rights reserved. Powered by TMDB.
        </p>
      </div>
    </footer>
  );
};
