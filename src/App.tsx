import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';

function App() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage />} 
        />
        <Route 
          path="/map" 
          element={<MapPage />} 
        />
      </Routes>
    </Router>
  );
}

export default App;