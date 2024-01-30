import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import jwt_decode from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

const DetailProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [error, setError] = useState("");
  const [balanceUpdated, setBalanceUpdated] = useState(false);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const fetchUserDetail = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${apiUrl}/user`, {
          headers: {
            "x-access-token": token,
          },
        });
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
        `${apiUrl}/user/topup`,
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
      setBalanceUpdated(true);
      mutate();
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleWithDraw = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${apiUrl}/user/withdraw`,
        {
          moneyAmount: withdraw,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response.data);
      setBalanceUpdated(true);
      mutate();
      window.location.reload(false);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const errorMessage = error.response.data.msg;
        setError(errorMessage);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };
  return (
    //<body className="bg-gradient-to-r from-black to-orange-800">
    <body className="bg-gray-500">
      <div className="flex justify-center bg-gradient-to-r from-black to-red-800 min-h-screen">
        <div className="w-full lg:w-1/2 p-4">
          {/* <div className="flex justify-center">  <img src={movie.poster} /> </div> */}
          <h1 className="text-center text-3xl text-white">Profile</h1>
          <div className="my-4 text-white">
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
              <span className="grid grid-cols-3">
                <span className="font-bold">User Balance:</span>
                <span>: Rp. {balanceUpdated ? "Updating..." : Number(user.balance).toLocaleString("en-ID")}</span>
              </span>
            </ul>
          </div>
          <hr></hr>
          <div>
            <div className="flex justify-center items-center mb-4 my-2 text-white">
              <h2 className="mr-4">Choose How much to top up:</h2>
              <div>
                <input
                  datatype="currency"
                  id="balanceInput"
                  className="w-full border-gray-300 rounded-lg p-2 mx-4 text-black"
                  value={`RP ${Number(balance).toLocaleString("en-ID")}`}
                  onChange={(e) => setBalance(e.target.value.replace(/RP /, "").replace(/,/g, ""))}
                />
              </div>

              <button className="mx-6 hover:bg-red-700 hover:text-white py-2 px-4 rounded bg-white text-red-600 transition-colors duration-100" onClick={handleTopUp}>
                Top up
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 my-2 text-white">
              <h2 className="mr-4">Choose How much to withdraw</h2>
              <div>
                <input
                  datatype="currency"
                  id="balanceInput"
                  className="w-full border-gray-300 rounded-lg p-2 mx-4 text-black"
                  value={`RP ${Number(withdraw).toLocaleString("en-ID")}`}
                  onChange={(e) => setWithdraw(e.target.value.replace(/RP /, "").replace(/,/g, ""))}
                />
              </div>
              <button className="mx-6 hover:bg-red-700 hover:text-white py-2 px-4 rounded bg-white text-red-700 transition-colors duration-100" onClick={handleWithDraw}>
                Withdraw
              </button>
            </div>
          </div>
          <div className="text-center">{error && error.includes("balance") && <p className="text-red-500 mt-1">{error}</p>}</div>
        </div>
      </div>
    </body>
  );
};

export default DetailProfile;
