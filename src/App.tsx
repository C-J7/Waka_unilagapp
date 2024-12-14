import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Settings from './pages/Settings';
import About from './pages/About';
import './styles/styles.css';
import Wakasidebar from './components/Wakasidebar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Wakasidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;