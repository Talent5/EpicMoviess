import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import "./App.css";

function Layout() {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <>
      <Header isRoot={isRoot} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AllRoutes />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App min-h-screen flex flex-col bg-deep-space">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
