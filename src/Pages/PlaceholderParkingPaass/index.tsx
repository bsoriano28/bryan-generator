// src/pages/PlaceholderParkingPass/index.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PlaceholderParkingPass: React.FC = () => {
  // Redirect to home
  return <Navigate to="/" />;
};

export default PlaceholderParkingPass;
