import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuizzesPage from './pages/QuizzesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizzesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
