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
const apiUrl = process.env.REACT_APP_API_URL;

const HeaderTop = () => {
  const { mutate } = useSWRConfig();
  const [loginModal, setloginModal] = useState(false);
  const [registerModal, setregisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [historyUser, setHistoryUser] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("token");
    // const token = localStorage.getItem("token");
    let decodedToken = null;
    let IdofUser = null;

    if (userLoggedIn) {
      decodedToken = jwt_decode(userLoggedIn);
      IdofUser = decodedToken.id;
      setIsLoggedIn(true);
      setUserId(IdofUser);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token: " + token);
      // const response = await axios.get(`http://localhost:4000/user/${userId}`, {
      const response = await axios.get(`${apiUrl}/user`, {
        headers: {
          "x-access-token": token,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);
  // const { data: } = useSWR(`http://localhost:4000/user/${userId}`, fetcher);
  // if (error) {
  //   console.log("Error fetching user data: ", error);
  // }

  const formattedBalance = userData ? userData.balance.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) : "";

  const signOut = () => {
    localStorage.removeItem("token");

    window.location.href = "/home";
  };
  const renderGuestLinks = () => {
    return (
      <>
        <div className="mr-5">
          <button onClick={() => setloginModal(true)} className="hover:text-gray-200">
            <h1> Login </h1>
          </button>
        </div>
        <div>
          <button onClick={() => setregisterModal(true)} className="hover:text-gray-200">
            <h1> Register </h1>{" "}
          </button>
        </div>
      </>
    );
  };

  const renderLoggedInLinks = () => {
    if (!userId) {
      return null; // If userId is not available, return null to prevent rendering the links
    }

    return (
      <>
        {/* Balance */}
        {userData ? <h1> Balance: Idr {formattedBalance}</h1> : <h1>Loading...</h1>}
        <div class="relative ml-3 flex ">
          <a href="/transactions">
            <button className="mx-4 flex rounded-full bg-gray-800 hover:shadow-slate-100 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:shadow-lg  ">
              <BiSolidBell size={30} />
            </button>
          </a>
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
                <div></div>

                {loginModal && <Modal closeModal={() => setloginModal(false)} openRegister={() => setregisterModal(true)} />}
                {registerModal && <RegisterModal closeModal={() => setregisterModal(false)} openLogin={() => setloginModal(true)} />}

                {/* Conditionally render links based on login status */}
                {isLoggedIn ? renderLoggedInLinks() : renderGuestLinks()}
              </div>
            </div>
          </nav>
        </section>
      </div>
    </header>
  );
};

export default HeaderTop;
