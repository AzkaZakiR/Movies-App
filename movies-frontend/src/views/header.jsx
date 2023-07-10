import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";

const HeaderTop = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  return (
    <header className="py-4 left-0 right-0 z-50 bg-gradient-to-br from-slate-800 to-orange-800">
      <nav className="container flex justify-between items-center">
        <div className="flex-grow">
          <a href="/home" className="text-white text-2xl flex items-center justify-center">
            <TbMovie size={40} />
            SEA CINEMA
          </a>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li className="mx-6">
              <a className="text-white">Upcoming</a>
            </li>
            <li className="mx-6">
              <a className="text-white">Schedule</a>
            </li>
            <li>
              <a href="/login" className="text-white">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="text-white">
                Register
              </a>
            </li>
            <li>
              <div className="relative">
                <button className="flex items-center text-white focus:outline-none" onClick={toggleDropdown}>
                  <span className="mr-2">My Account</span>
                  <svg className={`h-5 w-5 ${isDropdownOpen ? "transform rotate-180" : ""} `} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0  2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md">
                    <li>
                      <a href="/transactions" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Transactions
                      </a>
                    </li>
                    <li>
                      <a href="/history" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        History
                      </a>
                    </li>
                    <li>
                      <a href="/details" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Details
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderTop;
