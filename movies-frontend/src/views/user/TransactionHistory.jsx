import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TransactionHistory = () => {
  const [historyUser, setHistoryUser] = useState([]);

  useEffect(() => {
    const fetchMovieSchedule = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const config = {
          headers: {
            "x-access-token": token, // Include the token in the request headers
          },
        };
        const history = await axios.get("http://localhost:4000/history", config);
        setHistoryUser(history.data);
        console.log(history.data);
      } catch (error) {
        console.error("Error fetching movie schedule:", error);
      }
    };
    fetchMovieSchedule();
  }, []);
  return (
    <div className="flex justify-center bg-gradient-to-r from-black to-red-800 min-h-screen">
      <div className="container mx-auto text-white flex flex-col items-center">
        <div className="text-center my-5">
          {" "}
          <h1 className="text-2xl font-bold mb-2 ">Transaction History</h1>
          <h2 className="">This is your list of transaction orders</h2>{" "}
        </div>
        {historyUser.map((history) => (
          <div className="p-4 grid grid-cols-4 gap-10 items-center m-4 border border-white">
            <div key={history.id}>
              <div className="flex items-center">
                <img className="object-cover h-80" src={history.poster} alt="Movie Poster" />
              </div>
            </div>
            <div className="my-4">
              <h1 className="text-2xl my-3" style={{ maxWidth: "200px" }}>
                {history.title}
              </h1>
              <div className="my-4">
                <h1> Booked Seats: </h1>
                <h1> {Object.keys(JSON.parse(history.booked_seat)).join(", ")} </h1>
              </div>
              <h1> Total Price: Rp. {history.totalcost}</h1>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <h1 className="text-xl">Date: {history.createdAt.slice(0, 10)}</h1>
                  <h2 className="my-3">{history.status}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* <div>
            <div className="flex items-center">
              <img className="object-cover rounded-t h-80" src="https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg" alt="Movie Poster" />
            </div>
          </div>
          <div>
            <h1 className="text-xl">Movie title</h1>
            <h2 className="my-3">Seats: A1, A2, B4, C5</h2>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col items-center justify-center">
              <div>
                <h1 className="text-xl">Date:</h1>
                <h2 className="my-3">Seats: A1, A2, B4, C5</h2>
              </div>
            </div>
            <div>
              <p>coba</p>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default TransactionHistory;
