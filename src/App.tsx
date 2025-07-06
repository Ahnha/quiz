import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuizzesPage from './pages/QuizzesPage';

const App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/quizzes' : '/'}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizzesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
