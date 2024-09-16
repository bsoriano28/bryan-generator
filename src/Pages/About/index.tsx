// src/Pages/About/index.tsx
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-gray-600 to-gray-900">
      <div className="absolute inset-0 bg-cover opacity-10 bg-[url('https://source.unsplash.com/random/1920x1080/?parking')]"></div>
      
      <h1 className="relative z-10 mb-6 text-4xl font-bold text-white md:text-6xl">
        About Guest Parking Permit Generator
      </h1>
      
      <div className="relative z-10 max-w-4xl p-8 text-white bg-black shadow-xl bg-opacity-70 rounded-xl">
        <p className="mb-4 text-lg leading-8 md:text-xl">
          This project is a guest parking permit generator for off-campus housing that uses physical, printed, guest parking temporary permits. It allows you to generate parking passes independently from the official housing system, giving you flexibility and convenience.
        </p>

        <h2 className="mt-6 mb-4 text-2xl font-bold text-teal-300">How to Use:</h2>
        <p className="mb-4 text-lg md:text-xl">
          Go to the parking permit tab you are looking to create, fill out the form, download the PDF, and done!
        </p>

        <h2 className="mt-6 mb-4 text-2xl font-bold text-teal-300">Why Use This Tool?</h2>
        <p className="mb-4 text-lg md:text-xl">
          Many off-campus housing systems restrict the number of guest parking permits or impose strict monitoring policies. With this generator:
        </p>
        <ul className="pl-5 mt-2 space-y-2 text-lg list-disc md:text-xl">
          <li>You bypass the limits imposed by some housing systems (e.g., 8 guest passes per month).</li>
          <li>No notifications are sent to management when you generate a guest pass, so you don’t need to worry about being penalized for system abuse.</li>
          <li>You can adjust the expiration date to suit your needs, allowing for more flexibility when managing guest parking.</li>
        </ul>

        <h2 className="mt-6 mb-4 text-2xl font-bold text-teal-300">Tips for Use:</h2>
        <ul className="pl-5 space-y-2 text-lg list-disc md:text-xl">
          <li>Do not leave a parking permit that has a multi-day expiration date as it may draw unwanted attention. Keep it to a few hours or a day at most.</li>
          <li>You can create parking passes that expire on a future date if you need the pass in advance.</li>
        </ul>

        <p className="mt-6 text-lg md:text-xl">
          <strong>Disclaimer:</strong> This tool is designed for convenience, but please be mindful of any local parking regulations or rules imposed by your housing management. Use it responsibly to avoid penalties or issues with your housing provider.
        </p>
      </div>
    </div>
  );
};

export default About;
