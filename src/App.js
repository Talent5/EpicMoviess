import { BrowserRouter as Router } from 'react-router-dom';
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer } from "./components";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <AllRoutes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;

