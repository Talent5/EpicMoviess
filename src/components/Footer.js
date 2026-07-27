import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()}{" "}
          <Link to="/" className="hover:underline font-medium text-gray-700 dark:text-gray-300">
            Epic Movies
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap justify-center md:justify-end items-center text-sm text-gray-500 dark:text-gray-400 gap-5">
          <li>
            <a href="https://instagram.com/boiali5" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Instagram</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/talent-mundwa-a7b545270" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
          </li>
          <li>
            <a href="https://twitter.com/BoiAli3" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/Talent5" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
