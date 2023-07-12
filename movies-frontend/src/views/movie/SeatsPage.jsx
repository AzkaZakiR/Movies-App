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

  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        // Fetch seat data from the API
        const response = await axios.get(`http://localhost:4000/booking/date/${id}/`);
        setSeatsData(response.data.schedule.seats);
        console.log(response.data.schedule);
        console.log("this is token " + token);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeatsData();
  }, [id]);

  const handleSeatSelection = (seat) => {
    // Seat is available
    console.log("selected seeats" + selectedSeats);
    console.log(selectedSeats);
    console.log(selectedSeats.length);
    if (seatsData[seat]) {
      alert("This seat is already booked.");
    } else {
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
    console.log(bookedseat);
    try {
      const token = localStorage.getItem("token");
      const buy = await axios.post(
        `http://localhost:4000/movies/date/booking`,
        {
          showTimeId: id,
          bookedseat: bookedseat,
          totalcost: 150000,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      navigate("/home");
      console.log(buy.data);
      console.log(bookedseat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Booking Seats</h1>
      <div className="columns-7">
        <div> </div>
        <h1 className="text-2x1 font-bold mb-2"> Selected seats: </h1>
        {selectedSeats.map((seat) => (
          <p key={seat} className=" text-black m-2 ">
            {seat}
          </p>
        ))}
      </div>
      <div className="bg-gray-400 border border-black text-center mb-6">Screen</div>
      {/* <div className="flex flex-wrap justify-center"> */}
      <div className="grid  md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-12 gap-1 my-6">
        {Object.keys(seatsData).map((seat) => (
          <div
            key={seat}
            className={`w-11 h-8 border border-gray-500 rounded-md flex items-center justify-center mr-2 mb-3 ${
              seatsData[seat] ? "bg-red-500 cursor-not-allowed" : selectedSeats.includes(seat) ? "bg-blue-500 text-slate-50" : "bg-green-500 cursor-pointer"
            } ${seatsData[seat] ? "bg-red-500" : ""}`}
            onClick={() => handleSeatSelection(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      <div>
        <button className="bg-red-700 text-white py-2 px-4 mb-2 rounded w-full" onClick={BuyTicket}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default SeatBookingPage;
