// src/App.tsx
import React from 'react';
import './index.css';
import './transition.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Components/Header/index';
import Home from './Pages/Home/index';
import ParkingPass from './Pages/ParkingPass/index';
import CanvasParkingPass from './Pages/CanvasParkingPass';
import About from './Pages/About/index';
import TransitionLayout from './Components/TransitionLayout';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {/* Replace exitBeforeEnter with mode="wait" */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <TransitionLayout>
                <Home />
              </TransitionLayout>
            }
          />
          <Route
            path="/cv-parking-permit"
            element={
              <TransitionLayout>
                <ParkingPass />
              </TransitionLayout>
            }
          />
          <Route
            path="/canvas-parking-permit"
            element={
              <TransitionLayout>
                <CanvasParkingPass />
              </TransitionLayout>
            }
          />
          <Route
            path="/About"
            element={
              <TransitionLayout>
                <About />
              </TransitionLayout>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
