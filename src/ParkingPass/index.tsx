import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { generate } from "@pdfme/generator";
import { template } from './source'; 
import { Font } from '@pdfme/common';

const ParkingPass: React.FC = () => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState('');   
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [formattedExpirationDate, setFormattedExpirationDate] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null); 

  // Function to handle date and time input formatting
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(e.target.value);
    updateFormattedDate(e.target.value, expirationTime);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationTime(e.target.value);
    updateFormattedDate(expirationDate, e.target.value);
  };

  const updateFormattedDate = (date: string, time: string) => {
    if (date && time) {
      const combinedDateTime = new Date(`${date}T${time}`);
      const formattedDate = format(combinedDateTime, "EEE MMM d yyyy 'at' hh:mm a");
      setFormattedExpirationDate(formattedDate);
    }
  };

  // Automatically set the date and time to one day from now
  const handleAutoSetExpiration = () => {
    const now = new Date();
    const oneDayLater = addDays(now, 1); 

    const formattedDate = format(oneDayLater, 'yyyy-MM-dd'); 
    const formattedTime = format(oneDayLater, 'HH:mm'); 
    setExpirationDate(formattedDate);
    setExpirationTime(formattedTime);

    const formattedFullDate = format(oneDayLater, "EEE MMM d yyyy 'at' hh:mm a");
    setFormattedExpirationDate(formattedFullDate);
  };

  // Submit handler for the form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Set inputs to match the schema
    const inputs = [
      {
        "Resident First Name": firstName,
        "Resident Last Name": lastName,
        "Expiration Date and Time": formattedExpirationDate,
        "Vehicle Make": vehicleMake,
        "Vehicle Model": vehicleModel,
        "Vehicle Color": vehicleColor,
      }
    ];

    //@ts-ignore
    const pdfUint8Array = await generate({ template, inputs});

    // Convert Uint8Array to Blob
    const pdfBlob = new Blob([pdfUint8Array], { type: 'application/pdf' });

    setPdfBlob(pdfBlob); // Store the generated PDF blob
  };

  // Download the generated PDF
  const handleDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CVParkingPermit.pdf';
      link.click();
      URL.revokeObjectURL(url); 
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Parking Pass Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium">Resident First Name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Resident Last Name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Permit Expiration Date:</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded p-2"
            value={expirationDate}
            onChange={handleDateChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Permit Expiration Time:</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded p-2"
            value={expirationTime}
            onChange={handleTimeChange}
            required
          />
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Format: {formattedExpirationDate || 'Mon Sep 9 2024 at 12:00 PM'}
        </p>

        <div>
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={handleAutoSetExpiration}
          >
            Set Expiration Date to 1 Day from Now
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium">Vehicle Make:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={vehicleMake}
            onChange={(e) => setVehicleMake(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Vehicle Model:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Vehicle Color:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Generate Parking Pass
          </button>
        </div>
      </form>

      {pdfBlob && (
        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ParkingPass;
