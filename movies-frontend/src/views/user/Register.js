import React, { useState } from "react";
import axios from "axios";

function RegisterModal({ closeModal, openLogin }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", { name, username, password, age });
      // Handle form submission here
      await axios.post("http://localhost:4000/register", {
        name: name,
        username: username,
        password: password,
        confPassword: confirmPassword,
        age: parseInt(age),
        role: 2,
      });
      closeModal();
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        setError(errorMessage);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setError("An error occurred, during register");
      }
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="modalContainer bg-white rounded shadow-lg p-9 h-auto w-2/5 text-gray-700">
        <div className="titleCloseBtn flex justify-end">
          <button
            onClick={() => {
              closeModal(false);
            }}
            className="text-gray-600 text-2xl"
          >
            X
          </button>
        </div>
        <h2 className="text-2xl  font-bold my-6 text-red-700">Register</h2>
        <form onSubmit={registerUser}>
          <div className="flex space-x-2   columns-2">
            <div className="w-full">
              <label className="block mb-2">Name</label>
              <input placeholder="Enter your name" className="text-gray-700 w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="w-full">
              <label className="block mb-2">Username</label>
              <input
                placeholder="Enter your username"
                className="w-full px-3 py-2 border text-gray-700 rounded focus:outline-none focus:border-blue-500"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          {error && error.includes("username") && <p className="text-red-500 mt-1">{error}</p>}

          <div className="my-4">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              placeholder="Password"
              className="w-full px-3 text-gray-700 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Confirm Password</label>
            <input
              placeholder="Confirmation Password"
              className="w-full px-3 text-gray-700 py-2 border rounded focus:outline-none focus:border-blue-500"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && error.includes("characters") && <p className="text-red-500 mt-1">{error}</p>}
            {error && error.includes("Confirmation") && <p className="text-red-500 mt-1">{error}</p>}
          </div>
          {/* check for errors */}

          <div className="mb-4">
            <label className="block mb-2">Age</label>
            <input placeholder="Enter your age" className="w-full text-gray-700 px-3 py-2 border rounded focus:outline-none focus:border-blue-500" type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <button className="border border-red-500 bg-white text-red-500 py-2 px-4 rounded-md w-full hover:bg-red-500 hover:text-white transition-colors duration-700" type="submit">
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <h1 className="text-center inline-block font-bold text-sm text-black hover:text-slate-800">
            Already have an Account?{" "}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                closeModal(false);
                openLogin(true);
              }}
            >
              {" "}
              Login here
            </button>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
