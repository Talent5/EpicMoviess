import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageNotFoundImage from "../assets/images/pagenotfound.png";
import { useEffect } from "react";

export const PageNotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | EpicMovies";
  }, []);

  return (
    <main>
      <section className="flex flex-col justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <p className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            404
          </p>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
            Lost in the movies? This page doesn't exist.
          </p>
          <div className="max-w-md mb-10">
            <img className="rounded-xl shadow-2xl" src={PageNotFoundImage} alt="404" />
          </div>
          <Link
            to="/"
            className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-sm font-semibold text-white rounded-full bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg"
          >
            Back To Home
          </Link>
        </motion.div>
      </section>
    </main>
  );
};
