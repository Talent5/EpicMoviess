import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AllRoutes } from './routes/AllRoutes'; // Adjust the import path as needed

function App() {
  return (
    <Router>
      <AllRoutes />
    </Router>
  );
}
export default App;

