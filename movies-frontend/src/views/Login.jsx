import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../css/login.css";

Modal.setAppElement("#root");

const Loginpage = (closeModal) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username: username,
        password: password,
      });
      const { accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);
      //navigate("/home");
      window.location.href = "/home";

      console.log("Successfully logged in", Response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        const errorMessage = error.response.data.msg;
        setError(errorMessage);
        setTimeout(() => {
          setError("");
        }, 2000);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        // Error occurred while making the request
        setError("An error occurred during login. Please try again.");
      }
    }
  };
  return (
    <Modal isOpen={true} onRequestClose={closeModal}>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="modalContainer bg-white rounded shadow-lg p-8">
          <div className="titleCloseBtn flex justify-end">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <button className="  text-gray-500" onClick={closeModal}>
              <h1>close</h1>
            </button>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {error && !error.includes("Wrong Password") && <p className="text-red-500 mt-1">{error}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && !error.includes("user not found") && <p className="text-red-500 mt-1">{error}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button className="border border-red-500 bg-white text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white transition-colors duration-700" type="submit" onClick={handleLogin}>
                Login
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Loginpage;
