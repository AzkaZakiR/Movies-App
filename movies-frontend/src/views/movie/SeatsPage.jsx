import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SeatBookingPage = () => {
  const { id } = useParams();
  let [selectedSeats, setSelectedSeats] = useState([]);
  let [movieDetail, setmovieDetail] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const MAX_SEAT_SELECTION = 6;

  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        // Fetch seat data from the API
        const response = await axios.get(`http://localhost:4000/booking/date/${id}/`);
        setSeatsData(response.data.seats);
        setmovieDetail(response.data);
        console.log("movie data:", movieDetail);
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
    navigate("/login");
    return null;
  }
  return (
    <div style={{ background: "linear-gradient(to right, #000, #8b0000)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "10px", color: "#fff", overflowY: "auto" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px" }}>{movieDetail.title} </h1>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px", display: "inline" }}>{movieDetail.date}, </h1>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px", display: "inline" }}>{movieDetail.startAt} </h1>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px" }}></h1>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px", display: "inline" }}>Selected seats: </h1>
          {selectedSeats.map((seat, index) => (
            <p key={seat} style={{ fontSize: "1rem", color: "#fff", margin: "4px", display: "inline" }}>
              {index > 0 ? `, ${seat}` : seat}
            </p>
          ))}
        </div>
        <div style={{fontSize: "1.5rem", backgroundColor: "#ccc", border: "1px solid #000", textAlign: "center", margin: "16px 0 2.5cm", borderRadius: "0 0 10px 10px" }}> <h1>Screen </h1> </div>

        {/* Seats Grid */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "1px", margin: "16px 0" }}>
          {Object.keys(seatsData)
            .slice(0, 60)
            .map((seat) => (
              <div
                key={seat}
                style={{
                  width: "calc(8.666% - 15px)", // Adjusted width and removed display: grid
                  height: "60px",
                  border: "2px solid #999",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "7px",
                  marginBottom: "6px", // Adjusted marginBottom to be consistent
                  padding: "10px",
                  backgroundColor: seatsData[seat] ? "#888" : selectedSeats.includes(seat) ? "#005bb5" : "#fff",
                  color: seatsData[seat] ? "#606c7a" : selectedSeats.includes(seat) ? "#fff" : "#000",
                  cursor: seatsData[seat] ? "not-allowed" : "pointer",
                }}
                onClick={() => handleSeatSelection(seat)}
              >
                {seat}
              </div>
            ))}
        </div>

        {/* Additional Information */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {Object.keys(seatsData)
            .slice(-4)
            .map((seat) => (
              <div
                key={seat}
                style={{
                  width: "8.333%",
                  height: "40px",
                  border: "1px solid #999",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "2px", // Reduced marginRight
                  marginBottom: "2px", // Reduced marginBottom
                  backgroundColor: seatsData[seat] ? "#888" : selectedSeats.includes(seat) ? "#005bb5" : "#fff",
                  color: seatsData[seat] ? "#606c7a" : selectedSeats.includes(seat) ? "#fff" : "#000",
                  cursor: seatsData[seat] ? "not-allowed" : "pointer",
                }}
                onClick={() => handleSeatSelection(seat)}
              >
                {seat}
              </div>
            ))}
        </div>

        {/* Legend */}
        <div style={{ margin: "16px 0", display: "flex", marginLeft: "10px" }}>
          <div style={{ margin: "4px", display: "flex", alignItems: "center" }}>
            <div style={{ border: "1px solid #999", height: "40px", width: "40px", padding: "16px", backgroundColor: "#005bb5" }}></div>
            <h1 style={{ marginLeft: "8px" }}>Selected Seats</h1>
          </div>
          <div style={{ margin: "4px", display: "flex", alignItems: "center" }}>
            <div style={{ border: "1px solid #999", height: "40px", width: "40px", padding: "16px", backgroundColor: "#fff" }}></div>
            <h1 style={{ marginLeft: "8px" }}>Available Seats</h1>
          </div>
          <div style={{ margin: "4px", display: "flex", alignItems: "center" }}>
            <div style={{ border: "1px solid #999", height: "40px", width: "40px", padding: "16px", backgroundColor: "#888" }}></div>
            <h1 style={{ marginLeft: "8px" }}>Unavailable</h1>
          </div>
        </div>

        {/* Buy Ticket Button */}
        <button style={{ width: "100%", backgroundColor: "#8b0000", color: "#fff", padding: "8px 16px", margin: "16px 0", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.7s" }} onClick={BuyTicket}>
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default SeatBookingPage;
