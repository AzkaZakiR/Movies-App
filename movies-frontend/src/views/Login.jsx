import axios from 'axios';
import React, { useState } from 'react';
import "../css/login.css"
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login",{
      username: username,
      password: password,
    })  
    const { accessToken } = response.data.data;
    localStorage.setItem("token", accessToken);
    console.log("Successfully logged in", Response.data)
    navigate('/home')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        const errorMessage = error.response.data.msg;
        setError(errorMessage);
        setTimeout(() => {
          setError('');
        }, 2000);setTimeout(() => {
          setError('');
        }, 2000);
      } else {
        // Error occurred while making the request
        setError('An error occurred during login. Please try again.');
      }
    }
    
    } 
    // Perform login logic here
  return (
    <div className="flex justify-center items-center h-screen">
    {/* {error && (  <div className="modal">
          <div className="modal-content">
            <p>{error}</p>
          </div>
        </div> )} */}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-1/3" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        {error && !error.includes('Wrong Password')  && (
            <p className="text-red-500 mt-1">{error}</p> )}      
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
          {error && !error.includes('user not found') && (
            <p className="text-red-500 mt-1">{error}</p>)}
        </div>
        <div className="flex items-center justify-between">
          <button className="border border-red-500 bg-white text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white transition-colors duration-700" type="submit" onClick={handleLogin}>
            Login
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
export default Loginpage;
