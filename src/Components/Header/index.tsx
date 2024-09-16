// src/components/Header/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
              <li className="relative group">
                <Link to="/" className="text-white">
                  Home
                </Link>
                <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
              </li>
              <li className="relative group">
                <Link to="/cv-parking-permit" className="text-white">
                  Campus View
                </Link>
                <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
              </li>
              <li className="relative group">
                <Link to="/canvas-parking-permit" className="text-white">
                  Canvas
                </Link>
                <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
              </li>
              <li className="relative group">
                <Link to="/placeholder-parking-permit" className="text-white">
                  Coming Soon
                </Link>
                <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
              </li>
              <li className="relative group">
                <Link to="/About" className="text-white">
                  About
                </Link>
                <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="block w-full mt-4 md:hidden">
        <nav>
          <ul className="flex flex-col items-start pl-4 space-y-2">
            <li className="relative group">
              <Link to="/" className="text-white">
                Home
              </Link>
              <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
            </li>
            <li className="relative group">
              <Link to="/cv-parking-permit" className="text-white">
                Campus View
              </Link>
              <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
            </li>
            <li className="relative group">
              <Link to="/canvas-parking-permit" className="text-white">
                Canvas
              </Link>
              <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
            </li>
            <li className="relative group">
              <Link to="/placeholder-parking-permit" className="text-white">
                Coming Soon
              </Link>
              <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
            </li>
            <li className="relative group">
              <Link to="/About" className="text-white">
                About
              </Link>
              <span className="absolute bottom-0 left-0 block w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300 ease-out"></span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
