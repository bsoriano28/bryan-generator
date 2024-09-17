// src/pages/Home/index.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen text-white bg-gray-800">
      {/* Add animated lines */}
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Welcome message */}
      <h2 className="z-10 text-4xl font-bold text-center">
        Welcome to Bryan's Parking Pass Generator
      </h2>
    </div>
  );
};

export default Home;
