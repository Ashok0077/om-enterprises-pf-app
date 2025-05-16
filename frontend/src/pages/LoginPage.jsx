import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

const LoginPage = () => {
  const [pfNumber, setPfNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        pfNumber,
        password,
      });

      // Save login data in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('employee', JSON.stringify(res.data.employee));
      localStorage.setItem('transactions', JSON.stringify(res.data.transactions));

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-omblue text-white px-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="OM Enterprises Logo" className="w-20 h-20 mb-2" />
          <h1 className="text-2xl font-bold text-omred">OM ENTERPRISES</h1>
        </div>

        <h2 className="text-xl font-semibold text-center text-omred mb-4">Employee Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">PF Account Number</label>
            <input
              type="text"
              value={pfNumber}
              onChange={(e) => setPfNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-omred"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-omred"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-omred text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
