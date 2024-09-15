// ParkingPass.tsx
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { generate } from '@pdfme/generator';
import { template } from './source';

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

  // New state variables for button text and status
  const [generateButtonText, setGenerateButtonText] = useState('Generate Parking Pass');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

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

    // Update button state
    setIsGenerating(true);
    setGenerateButtonText('Generating...');

    // Set inputs to match the schema
    const inputs = [
      {
        'Resident First Name': firstName,
        'Resident Last Name': lastName,
        'Expiration Date and Time': formattedExpirationDate,
        'Vehicle Make': vehicleMake,
        'Vehicle Model': vehicleModel,
        'Vehicle Color': vehicleColor,
      },
    ];

    try {
      //@ts-ignore
      const pdfUint8Array = await generate({ template, inputs });

      // Convert Uint8Array to Blob
      const pdfBlob = new Blob([pdfUint8Array], { type: 'application/pdf' });

      setPdfBlob(pdfBlob); // Store the generated PDF blob

      // Update button text to "Generated!"
      setGenerateButtonText('Generated!');

      // Show the download button
      setShowDownloadButton(true);

      // After 5 seconds, reset the button text and hide the download button
      setTimeout(() => {
        setGenerateButtonText('Generate Parking Pass');
        setIsGenerating(false);
        setShowDownloadButton(false);
        setPdfBlob(null); // Clear the PDF blob
      }, 5000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Reset button states in case of error
      setGenerateButtonText('Generate Parking Pass');
      setIsGenerating(false);
    }
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
    <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Parking Pass Generator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resident Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resident First Name
            </label>
            <input
              type="text"
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resident Last Name
            </label>
            <input
              type="text"
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Expiration Date and Time */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permit Expiration Date
            </label>
            <input
              type="date"
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              value={expirationDate}
              onChange={handleDateChange}
              required
            />
          </div>
          {/* Expiration Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permit Expiration Time
            </label>
            <input
              type="time"
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              value={expirationTime}
              onChange={handleTimeChange}
              required
            />
          </div>
        </div>

        {/* Auto-set Expiration Date Button */}
        <div className="flex items-center">
          <button
            type="button"
            className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={handleAutoSetExpiration}
          >
            Set Expiration Date to 1 Day from Now
          </button>
          <p className="ml-4 text-sm text-gray-500">
            {formattedExpirationDate
              ? `Selected: ${formattedExpirationDate}`
              : 'Format: Mon Sep 9 2024 at 12:00 PM'}
          </p>
        </div>

        {/* Vehicle Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Vehicle Make */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Make
            </label>
            <input
              type="text"
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
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
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
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
              className="block w-full p-3 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Generate Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-3 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
              isGenerating ? 'cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
            disabled={isGenerating}
          >
            {generateButtonText}
          </button>
        </div>
      </form>

      {/* Download PDF Button */}
      {showDownloadButton && (
        <div className="mt-8 text-center">
          <button
            onClick={handleDownload}
            className="px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ParkingPass;
