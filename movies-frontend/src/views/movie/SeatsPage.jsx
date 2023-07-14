import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SeatBookingPage = () => {
  const { id } = useParams();
  let [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const MAX_SEAT_SELECTION = 6;

  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        // Fetch seat data from the API
        const response = await axios.get(`http://localhost:4000/booking/date/${id}/`);
        setSeatsData(response.data.schedule.seats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeatsData();
  }, [id]);

  const handleSeatSelection = (seat) => {
    // Seat is available
    console.log("selected seeats" + selectedSeats);
    if (seatsData[seat]) {
      alert("This seat is already booked.");
    } else {
      if (selectedSeats.length >= MAX_SEAT_SELECTION) {
        alert(`You can only select up to ${MAX_SEAT_SELECTION} seats.`);
        return;
      }
      if (selectedSeats.includes(seat)) {
        // Seat is already selected, remove it from selectedSeats
        setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat));
      } else {
        // Seat is not selected, add it to selectedSeats
        setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
      }
    }
  };

  const BuyTicket = async () => {
    let bookedseat = {};
    selectedSeats.forEach((seat) => {
      bookedseat[seat] = true;
    });
    try {
      const buy = await axios.post(
        `http://localhost:4000/movies/date/booking`,
        {
          showTimeId: id,
          bookedseat: bookedseat,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      navigate("/home");
      console.log(buy.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) {
    navigate("/home");
    return null;
  }
  return (
    <div className="bg-gradient-to-r from-black to-red-800 min-h-screen">
      <div className="container mx-auto px-4 py-8 text-white fixed">
        <h1 className="text-2x1 font-bold mb-2">Selected seats: </h1>
        <div className="flex flex-wrap">
          {selectedSeats.map((seat) => (
            <p key={seat} className="text-white m-1">
              {seat}
            </p>
          ))}
        </div>
        <div className="bg-gray-400 border border-black text-center my-4 rounded-b-lg">Screen</div>
        {/* <div className="flex flex-wrap justify-center"> */}
        <div className="booking-screen items-start">
          {" "}
          <div className="grid  md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-1 my-6">
            {Object.keys(seatsData)
              .slice(0, 60)
              .map((seat) => (
                <div
                  key={seat}
                  className={`w-11 h-8 border border-gray-500 rounded-md flex items-center justify-center mr-2 mb-3 ${
                    seatsData[seat] ? "bg-gray-500 cursor-not-allowed text-slate-400" : selectedSeats.includes(seat) ? "bg-blue-500 text-slate-50" : "bg-white hover:bg-slate-200 text-black cursor-pointer"
                  } ${seatsData[seat] ? "bg-gray-500" : ""}`}
                  onClick={() => handleSeatSelection(seat)}
                >
                  {seat}
                </div>
              ))}
          </div>
          <div className="flex justify-center items-center ">
            {Object.keys(seatsData)
              .slice(-4)
              .map((seat) => (
                <div
                  key={seat}
                  className={`w-11 h-8 border border-gray-500 rounded-md flex items-center justify-center mx-5 mb-3 ${
                    seatsData[seat] ? "bg-gray-500 cursor-not-allowed text-slate-400" : selectedSeats.includes(seat) ? "bg-blue-500 text-slate-50" : "bg-white hover:bg-slate-200 text-black cursor-pointer"
                  } ${seatsData[seat] ? "bg-gray-500" : ""}`}
                  onClick={() => handleSeatSelection(seat)}
                >
                  {seat}
                </div>
              ))}
          </div>
        </div>
        <div className="my-4 flex ml-10">
          {/* <div ="columns-10"> */}
          <div className="m-4 flex items-center">
            <div className="box-border border border-gray-500 h-8 w-8 p-4 bg-blue-500"></div>
            <h1 className="ml-2">Selected Seats</h1>
          </div>
          <div className="m-4 flex items-center">
            <div className="box-border border border-gray-500 h-8 w-8 p-4 bg-white"></div>
            <h1 className="ml-2">Available Seats</h1>
          </div>
          <div className="m-4 flex items-center">
            <div className="box-border border border-slate-100 h-8 w-8 p-4 bg-gray-500"></div>
            <h1 className="ml-2">Unavailable </h1>
          </div>
        </div>
        <button className="bg-red-700 text-white py-2 px-4 my-4 rounded w-full hover:bg-red-500 hover:text-white transition-colors duration-700 " onClick={BuyTicket}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default SeatBookingPage;
