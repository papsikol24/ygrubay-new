import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GamesOwned from './components/GamesOwned'; // Your existing component
import HoursPlayed from './components/HoursPlayed'; // Your existing HoursPlayed component
import Achievements from './components/Achievements'; // Your new Achievements component
import './index.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Protected pages */}
        <Route 
          path="/games-owned" 
          element={
            <ProtectedRoute>
              <GamesOwned />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/hours-played" 
          element={
            <ProtectedRoute>
              <HoursPlayed />
            </ProtectedRoute>
          }
        />
        {/* Add route for Achievements */}
        <Route 
          path="/achievements" 
          element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>
);