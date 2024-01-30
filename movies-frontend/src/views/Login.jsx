import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Loginpage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username: username,
        password: password,
      });
      const { accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);
      // Redirect to the home page or wherever you want after successful login
      navigate("/home");
    } catch (error) {
      // Handle login failure
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
    <div className="login-container flex items-center justify-center h-screen">
      <form className="login-form w-full max-w-md p-8  rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
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
          <button
            className="border border-red-500 bg-white text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white transition-colors duration-700"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-center inline-block font-bold text-sm text-blue-500 hover:text-blue-800">
            New to SEA CINEMA?{" "}
            <button
              className="text-red-500  hover:text-red-700"
            >
              {" "}
              Register here
            </button>{" "}
          </h1>
        </div>
      </form>
      
    </div>
  );
  
};

export default Loginpage;
