import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const TransactionHistory = () => {
  const [historyUser, setHistoryUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const config = {
          headers: {
            "x-access-token": token, // Include the token in the request headers
          },
        };
        const history = await axios.get(`${apiUrl}/history`, config);
        const transactionList = history.data.filter((transaction) => transaction.status !== "pending");
        // setHistoryUser(history.data);
        setHistoryUser(transactionList);
        setLoading(false);
        console.log(history.data);
      } catch (error) {
        console.error("Error fetching movie schedule:", error);
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  const handlePrintTicket = async (transactionId) => {
    // Implement logic to print the ticket based on the transaction details
    try{
      const response = await axios.get(`${apiUrl}/generateticket/${transactionId}`, {
        responseType: 'arraybuffer', // Specify the response type as arraybuffer
      });
  
      // Convert the array buffer to a Blob
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a data URL representing the Blob
      const dataUrl = URL.createObjectURL(blob);
  
      // Open the PDF in a new tab or window
      window.open(dataUrl, '_blank');
    } catch (error) {
      console.log(error);

    }
    console.log("Printing ticket for transaction:", transactionId);
  };
  if (loading) {
    return <h2>Loading....</h2>;
  }
  console.log("THe status of loading", loading);
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
                  <h1 className="text-xl">Date: {history.date}</h1>
                  <h1 className="text-xl">Hour: {history.startAt}</h1>
                  <h2 className="my-3">Status: {history.status}</h2>
                  {history.status === "success" && (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-green-600"
                      onClick={() => handlePrintTicket(history.id)} 
                    >
                      Print Ticket
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
