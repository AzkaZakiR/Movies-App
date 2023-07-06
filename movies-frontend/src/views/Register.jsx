import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate()

  const registerUser = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, username, password, age });
    // Handle form submission here
    await axios.post("http://localhost:4000/register", {
        name: name,
        username: username,
        password: password,
        confPassword:confirmPassword,
        age: parseInt(age),
        role: 2
    })
    navigate("/login")
    };

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl text-center font-bold my-6">Register</h2>
            <form onSubmit={registerUser}>
            <div className='flex space-x-2 mb-4'>
                <div className="mb-4">
                    <label className="block mb-2">
                    Name
                    </label>
                    <input  className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                    Username
                    </label>
                    <input className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
            </div>
            
            <div className="mb-4">
                <label className="block mb-2" htmlFor="password">
                Password
                </label>
                <input className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" type="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="mb-4">
                <label className="block mb-2" >
                Confirm Password
                </label>
                <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                Age
                </label>
                <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" type="number" id="age" value={age}  onChange={(e) => setAge(e.target.value)} required/>
            </div>
            <button
                className="bg-black text-white py-2 px-4 rounded hover:bg-red-500 hover:text-black transition-colors duration-700" type="submit">
                Register
            </button>
            </form>
        </div>
    </div>
  );
};

export default RegisterForm;
