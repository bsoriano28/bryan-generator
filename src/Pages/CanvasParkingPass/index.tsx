// src/CanvasParkingPass/index.tsx
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';

const CanvasParkingPass: React.FC = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [licensePlateState, setLicensePlateState] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const licensePlateStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 
    'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 
    'WI', 'WY', 'DC', 'AS', 'GU', 'MP', 'PR', 'VI', 'UM'
  ];
  
  const handleAutoSetExpiration = () => {
    const now = new Date();
    const oneDayLater = addDays(now, 1);

    const formattedDate = format(oneDayLater, 'yyyy-MM-dd');
    setExpirationDate(formattedDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Coming Soon!');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-6 bg-gray-100">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Canvas Guest Parking Pass
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-6 space-y-6 bg-white rounded-lg shadow-lg"
      >
        {/* License Plate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            License Plate
          </label>
          <input
            type="text"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            placeholder="Enter license plate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>

        {/* License Plate State */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            License Plate State
          </label>
          <select
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            value={licensePlateState}
            onChange={(e) => setLicensePlateState(e.target.value)}
            required
          >
            <option value="">Select a state</option>
            {licensePlateStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Year
          </label>
          <input
            type="number"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            placeholder="Enter vehicle year"
            value={vehicleYear}
            onChange={(e) => setVehicleYear(e.target.value)}
            required
          />
        </div>

        {/* Vehicle Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Color
          </label>
          <input
            type="text"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            placeholder="Enter vehicle color"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            required
          />
        </div>

        {/* Vehicle Make */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Make
          </label>
          <input
            type="text"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            placeholder="Enter vehicle make"
            value={vehicleMake}
            onChange={(e) => setVehicleMake(e.target.value)}
            required
          />
        </div>

        {/* Vehicle Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Model
          </label>
          <input
            type="text"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            placeholder="Enter vehicle model"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        {/* Set Expiration Date to One Day from Now */}
        <div className="flex items-center">
          <button
            type="button"
            className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={handleAutoSetExpiration}
          >
            Set Expiration Date to 1 Day from Now
          </button>
          <p className="ml-4 text-sm text-gray-500">
            {expirationDate ? `Selected: ${expirationDate}` : 'Format: YYYY-MM-DD'}
          </p>
        </div>

        {/* Generate PDF Button (Currently inactive) */}
        <div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Coming Soon
          </button>
        </div>
      </form>
    </div>
  );
};

export default CanvasParkingPass;
