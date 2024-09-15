// App.tsx
import React from 'react';
import './index.css';
import ParkingPass from './ParkingPass';
import Header from './Header';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex items-center justify-center flex-grow p-6">
        <ParkingPass />
      </main>
    </div>
  );
};

export default App;
