import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ScrollToTop />
        <AllRoutes />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App dark:bg-gray-900 min-h-screen flex flex-col">
      <Router>
        <Header />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
