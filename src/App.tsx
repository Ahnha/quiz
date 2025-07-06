import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import QuizzesPage from './pages/QuizzesPage';
import { Typography } from '@mui/material';

const App: React.FC = () => (
  <Router>
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/quizzes" replace />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        {/* Pentru extensie: <Route path="/about" element={<AboutPage />} /> */}
        <Route path="*" element={<Typography>404 - Pagina nu a fost găsită</Typography>} />
      </Routes>
    </AppLayout>
  </Router>
);

export default App;
