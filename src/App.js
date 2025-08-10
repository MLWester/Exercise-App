import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import ExerciseDetail from './Pages/ExerciseDetail';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

  
const ScrollToHash = () => {
  const { hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [hash]);
  return null;
};

const App = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: { xl: '1488px' }, mx: 'auto' }}>
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
