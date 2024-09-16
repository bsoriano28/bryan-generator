// src/components/Header/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="py-4 bg-black shadow-md">
      <div className="flex items-center justify-between">
        {/* Left side: Logo and navigation tabs */}
        <div className="flex items-center space-x-8">
          <h1 className="pl-4 text-2xl font-bold text-white">
            <Link to="/">Bryan's Generator</Link>
          </h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-white hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cv-parking-permit" className="text-white hover:underline">
                  CV Parking Permit
                </Link>
              </li>
              <li>
                <Link to="/canvas-parking-permit" className="text-white hover:underline">
                  Canvas Parking Permit
                </Link>
              </li>
              <li>
                <Link to="/placeholder-parking-permit" className="text-white hover:underline">
                  Placeholder Parking Permit
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right side: More dropdown */}
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            More
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1">
                {/* Future pages */}
                <Link
                  to="/future-page-1"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Future Page 1
                </Link>
                <Link
                  to="/future-page-2"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Future Page 2
                </Link>
                {/* Add more links as needed */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="block w-full mt-4 md:hidden">
        <nav>
          <ul className="flex flex-col items-start pl-4 space-y-2">
            <li>
              <Link to="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cv-parking-permit" className="text-white hover:underline">
                CV Parking Permit
              </Link>
            </li>
            <li>
              <Link to="/canvas-parking-permit" className="text-white hover:underline">
                Canvas Parking Permit
              </Link>
            </li>
            <li>
              <Link to="/placeholder-parking-permit" className="text-white hover:underline">
                Placeholder Parking Permit
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
