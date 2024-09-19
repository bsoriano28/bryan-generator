import React, { useState } from 'react';
import { format, addDays, parse, isValid } from 'date-fns';
import { generate } from '@pdfme/generator';
import { template } from './source';

const CanvasParkingPass: React.FC = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [licensePlateState, setLicensePlateState] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [generateButtonText, setGenerateButtonText] = useState('Generate Parking Pass');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const licensePlateStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
    'WI', 'WY', 'DC', 'AS', 'GU', 'MP', 'PR', 'VI', 'UM'
  ];

  const handleSetEndDate = () => {
    const now = new Date();
    const oneDayLater = addDays(now, 1);

    const formattedStartDate = format(now, 'yyyy-MM-dd'); 
    const formattedEndDate = format(oneDayLater, 'yyyy-MM-dd'); 
    const formattedStartTime = format(now, 'HH:mm'); 
    const formattedEndTime = format(addDays(now, 0), 'HH:mm'); 
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setStartTime(formattedStartTime);
    setEndTime(formattedEndTime);
  };

  const formatTimeTo12Hour = (time: string) => {
    const parsedTime = parse(time, 'HH:mm', new Date());
    if (isValid(parsedTime)) {
      return format(parsedTime, 'hh:mm a');
    }
    return time; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsGenerating(true);
    setGenerateButtonText('Generating...');

    const formattedStartTime = formatTimeTo12Hour(startTime);
    const formattedEndTime = formatTimeTo12Hour(endTime);

    const formattedStartDateForPDF = format(parse(startDate, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy');
    const formattedEndDateForPDF = format(parse(endDate, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy');

    const inputs = [
      {
        'Plate Number': licensePlate,
        'Plate Number 2': licensePlate,
        'Plate State': licensePlateState,
        'Year': vehicleYear,
        'Make': vehicleMake,
        'Model': vehicleModel,
        'Color': vehicleColor,
        'Start Date': formattedStartDateForPDF, 
        'End Date': formattedEndDateForPDF,     
        'Start Time': formattedStartTime,
        'End Time': formattedEndTime,
      },
    ];

    try {
      // @ts-ignore
      const pdfUint8Array = await generate({ template, inputs });

      const pdfBlob = new Blob([pdfUint8Array], { type: 'application/pdf' });
      setPdfBlob(pdfBlob);

      setGenerateButtonText('Generated!');
      setShowDownloadButton(true);

      setTimeout(() => {
        setGenerateButtonText('Generate Parking Pass');
        setIsGenerating(false);
        setShowDownloadButton(false);
        setPdfBlob(null);
      }, 5000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setGenerateButtonText('Generate Parking Pass');
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CanvasParkingPermit.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-6 bg-gray-100">
      <h2 className="mb-8 text-3xl font-bold text-center text-black">
        Canvas Guest Parking Pass
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-6 space-y-6 bg-white rounded-lg shadow-lg"
      >
        {/* License Plate */}
        <div>
          <label className="block text-sm font-medium text-black">
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
          <label className="block text-sm font-medium text-black">
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
      <label className="block text-sm font-medium text-black">
        Vehicle Year
      </label>
      <select
        className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
        value={vehicleYear}
        onChange={(e) => setVehicleYear(e.target.value)}
        required
      >
        <option value="">Select a year</option>
        {Array.from({ length: 2025 - 1950 + 1 }, (_, index) => 2025 - index).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
</div>

        {/* Vehicle Color */}
        <div>
          <label className="block text-sm font-medium text-black">
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
          <label className="block text-sm font-medium text-black">
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
          <label className="block text-sm font-medium text-black">
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
          <label className="block text-sm font-medium text-black">
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
          <label className="block text-sm font-medium text-black">
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

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-black">
            Start Date
          </label>
          <input
            type="date"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-black">
            End Date
          </label>
          <input
            type="date"
            className="block w-full p-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {/* Set End Date to One Day from Now */}
        <div className="flex items-center">
          <button
            type="button"
            className="px-4 py-2 text-white bg-black rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={handleSetEndDate}
          >
            Set End Date to 1 Day from Now
          </button>
          <p className="ml-4 text-sm text-black">
            {endDate ? `Selected: ${format(parse(endDate, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy')}` : 'Format: MMM dd, yyyy'}
          </p>
        </div>

        {/* Generate PDF Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-black rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            {generateButtonText}
          </button>
        </div>
        {/* Download PDF Button */}
        {showDownloadButton && (
          <div className="mt-8 text-center">
            <button
              onClick={handleDownload}
              className="px-6 py-3 text-white bg-black rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Download PDF
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CanvasParkingPass;
