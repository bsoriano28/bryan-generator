// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure react-router-dom is installed

const Header: React.FC = () => {
  return (
    <header className="py-4 text-white bg-black shadow-md">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <h1 className="text-2xl font-bold">
          <Link to="/">Bryan's Generator</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                Campus View Parking Permit
              </Link>
            </li>
            {/* Add future generator links here */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
