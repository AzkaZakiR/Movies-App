import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TbMovie } from "react-icons/tb";
import useSWR, { useSWRConfig } from "swr";
import jwt_decode from "jwt-decode";
import axios from "axios";

const HeaderTop = () => {
  <a href="/home" className="text-white text-2xl flex items-center justify-center">
    <TbMovie size={40} />
    SEA CINEMA
  </a>;

  // const token = localStorage.getItem("token");
  // const decodedToken = jwt_decode(token);
  // const userId = decodedToken.id;
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };
  // const { data: userData, error } = useSWR(`http://localhost:4000/user/${userId}`, fetcher);
  // if (error) { console.log("Error fetching user data: ", error);}

  // const formattedBalance = userData.balance.toLocaleString("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  // });

  // console.log("User data: ", userData);
  return (
    <header className="py-2  bg-gradient-to-br from-slate-800 to-orange-800">
      <div class="flex flex-wrap place-items-center">
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
                  <h1> Balance: </h1>
                  {/* {userData ? <h1> Idr {userData.balance} </h1> : <h1>Loading...</h1>} */}
                  {/* <h1>{formattedBalance}</h1> */}
                </div>
                <a class="flex items-center hover:text-gray-200 mx-3" href="#">
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
                </a>
              </div>
            </div>
          </nav>
        </section>
      </div>
    </header>
  );
};

export default HeaderTop;
