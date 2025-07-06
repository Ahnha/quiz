import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import QuizzesPage from './pages/QuizzesPage';
import { Typography } from '@mui/material';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => (
  <Router>
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizzesPage />} />
        {/* Pentru extensie: <Route path="/about" element={<AboutPage />} /> */}
        <Route path="*" element={<Typography>404 - Pagina nu a fost găsită</Typography>} />
      </Routes>
    </AppLayout>
  </Router>
);

export default App;
