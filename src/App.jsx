import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import TutorialViewerPage from './pages/TutorialViewerPage';
import Header from './components/common/Header';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/tutorial/:id" element={<TutorialViewerPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;