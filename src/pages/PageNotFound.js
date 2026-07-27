import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageNotFoundImage from "../assets/images/pagenotfound.png";
import { useEffect } from "react";

export const PageNotFound = () => {
  useEffect(() => {
    document.title = "404 - Epic Movies";
  }, []);

  return (
    <main className="bg-deep-space pt-24">
      <section className="max-w-[1280px] mx-auto px-16 flex flex-col items-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-display font-black text-netflix-red mb-4">Lost your way?</p>
          <p className="text-subheading text-silver mb-8 max-w-md mx-auto">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          <div className="max-w-md mb-10">
            <img className="rounded-cards" src={PageNotFoundImage} alt="404" />
          </div>
          <Link
            to="/"
            className="inline-flex items-center bg-netflix-red hover:bg-[#f40612] text-chalk-white font-bold text-subheading px-10 py-4 rounded-buttons transition-all hover:scale-105"
          >
            Epic Movies Home
          </Link>
        </motion.div>
      </section>
    </main>
  );
};
