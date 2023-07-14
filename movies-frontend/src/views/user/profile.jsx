import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import jwt_decode from "jwt-decode";

const DetailProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetail();
  }, [id]);

  const handleTopUp = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:4000/user/topup",
        {
          moneyAmount: balance,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <body className="bg-gradient-to-r from-black to-orange-800">
      <div className="flex flex-row justify-center items-center text-slate-200">
        <div className="w-full lg:w-1/2 p-4">
          {/* <div className="flex justify-center">  <img src={movie.poster} /> </div> */}
          <h1 className="text-center text-3xl">Profile</h1>
          <div className="my-4">
            <ul className="font-semibold">
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Name:</span>
                  <span>: {user.name}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Username:</span>
                  <span>: {user.username}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">Age: </span>
                  <span>: {user.age}</span>
                </span>
              </li>
              <li>
                <span className="grid grid-cols-3">
                  <span className="font-bold">User Balance:</span>
                  <span>: {user.balance}</span>
                </span>
              </li>
            </ul>
          </div>
          <hr></hr>
          <div>
            <div className="flex justify-center items-center mb-4 my-2">
              <h2 className="mr-4">Choose How much to top up:</h2>
              <div>
                <input type="number" id="balanceInput" className="w-full border-gray-300 rounded-lg p-2 mx-4 text-black" value={balance} onChange={(e) => setBalance(e.target.value)} />
              </div>
              <button className="mx-6 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-500 transition-colors duration-300" onClick={handleTopUp}>
                Top up
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 my-2">
              <h2 className="mr-4">Choose How much to withdraw</h2>
              <div>
                <input type="number" id="balanceInput" className="w-full border-gray-300 rounded-lg p-2 mx-4 text-black" value={balance} onChange={(e) => setBalance(e.target.value)} />
              </div>
              <button className="mx-6 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-500 transition-colors duration-300" onClick={handleTopUp}>
                Top up
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default DetailProfile;
