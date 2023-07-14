import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TbMovie } from "react-icons/tb";
import { BiSolidBell } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./user/cobaLogin";
import RegisterModal from "./user/Register";
import useSWR, { useSWRConfig } from "swr";
import jwt_decode from "jwt-decode";
import axios from "axios";

const HeaderTop = () => {
  const [loginModal, setloginModal] = useState(false);
  const [registerModal, setregisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdown(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDropdown(false);
    }, 300); // Adjust the delay time as needed (200 milliseconds in this example)
  };
  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.id;

  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  // const { data: userData, error } = useSWR(`http://localhost:4000/user/${userId}`, fetcher);
  // if (error) { console.log("Error fetching user data: ", error);}

  // const formattedBalance = userData.balance.toLocaleString("id-ID", {   style: "currency", currency: "IDR", });
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token");

    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");

    window.location.href = "/home";
  };
  const renderGuestLinks = () => {
    return (
      <>
        <div className="mr-5">
          <button onClick={() => setloginModal(true)}>
            <h1> Login </h1>
          </button>
        </div>
        <div>
          <button onClick={() => setregisterModal(true)}>
            <h1> Register </h1>{" "}
          </button>
        </div>
      </>
    );
  };

  const renderLoggedInLinks = () => {
    return (
      <>
        {/* Balance */}
        {/* {userData ? (
          <h1> Balance: Idr {formattedBalance}</h1>
        ) : (
          <h1>Loading...</h1>
        )} */}
        <div class="relative ml-3 flex ">
          <TbMovie size={30} />

          <div>
            <button
              type="button"
              className="mx-4 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:shadow-md "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span class="sr-only">Open user menu</span>
              <FaUserCircle size={30} />
            </button>
          </div>
          {dropdown && (
            <div class="absolute mt-2 right-0 z-10  w-48 origin-top-right rounded-md bg-red-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 " role="menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <a href={`/profile/${userId}`} class="block px-4 py-2 text-sm text-white hover:bg-red-500">
                Your Profile
              </a>
              <a href="/history" class="block px-4 py-2 text-sm text-white hover:bg-red-400">
                See history
              </a>
              <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-red-400" onClick={signOut}>
                Sign out
              </a>
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <header className="py-2  bg-gradient-to-r from-black to-orange-800">
      <div class="flex flex-wrap place-items-center  border-b border-white border-opacity-40 ">
        <section class="relative container mx-auto">
          <nav class="flex justify-between  text-white ">
            <div class="px-5 xl:px-3.5 py-3 flex w-full items-center">
              <a class="text-3xl font-bold font-heading" href="#">
                <a href="/home" className="text-white text-2xl flex items-center justify-center">
                  <TbMovie size={40} />
                  SEA CINEMA
                </a>
              </a>
              <ul class="hidden md:flex px-2 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <a class="hover:text-gray-200" href="http://localhost:3000/home">
                    Home
                  </a>
                </li>
                <li>
                  <a class="hover:text-gray-200" href="#">
                    Upcoming
                  </a>
                </li>
                <li>
                  <a class="hover:text-gray-200" href="#">
                    Schedule
                  </a>
                </li>
                <li>
                  <a class="hover:text-gray-200" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
              <div class=" xl:flex items-center  items-center">
                <div>
                  {/* <h1> Balance: </h1>
                  {userData ? <h1> Idr {userData.balance} </h1> : <h1>Loading...</h1>
                   <h1>{formattedBalance}</h1>} */}
                </div>

                {loginModal && <Modal closeModal={() => setloginModal(false)} openRegister={() => setregisterModal(true)} />}
                {registerModal && <RegisterModal closeModal={() => setregisterModal(false)} openLogin={() => setloginModal(true)} />}

                {/* Conditionally render links based on login status */}
                {isLoggedIn ? renderLoggedInLinks() : renderGuestLinks()}
                {/* <a class="flex items-center hover:text-gray-200 mx-3" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="flex absolute -mt-5 ml-4">
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </a>
                <a class="flex items-center hover:text-gray-200" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a> */}
              </div>
            </div>
          </nav>
        </section>
      </div>
    </header>
  );
};

export default HeaderTop;
