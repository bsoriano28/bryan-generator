// src/App.tsx
import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/index';
import Home from './Pages/Home/index';
import ParkingPass from './Pages/ParkingPass/index';
import CanvasParkingPass from './Pages/CanvasParkingPass';


const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv-parking-permit" element={<ParkingPass />} />
        <Route path="/canvas-parking-permit" element={<CanvasParkingPass />} />
        {/* Add future routes here */}
      </Routes>
    </div>
  );
};

export default App;
