import React, { useState } from 'react';
import logo from '../assets/logo.png'; // adjust the path if needed

const AdminLoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminCredentials = {
      username: 'admin',
      password: 'admin123',
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-omblue text-white px-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="OM Enterprises Logo" className="w-20 h-20 mb-2" />
          <h1 className="text-2xl font-bold text-omred">OM ENTERPRISES</h1>
        </div>

        <h2 className="text-xl font-semibold text-center text-omred mb-4">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter password"
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

export default AdminLoginForm;
