import React from 'react';
import './index.css'; // Ensure Tailwind or custom styles are applied
import ParkingPass from './ParkingPass'; // Import the ParkingPass form

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ParkingPass /> {/* Render the ParkingPass form component */}
    </div>
  );
};

export default App;
