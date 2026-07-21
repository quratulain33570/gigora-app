import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardPage from './pages/DashboardPage';
import ProfileAnalyzer from './pages/ProfileAnalyzer'; // 👈 Our new Day 5 page!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analyzer" element={<ProfileAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;