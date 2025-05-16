import React, { useState } from 'react';
import AdminLoginForm from './AdminLoginForm';
import PFAccountList from './PFAccountList';
import PFAccountForm from './PFAccountForm';
import TransactionForm from './TransactionForm';
import logo from '../assets/logo.png';
import { FaUserPlus, FaExchangeAlt, FaList, FaTachometerAlt } from 'react-icons/fa';
import TransactionList from './TransactionList';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'create':
        return (
          <div className="bg-white border shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#1e2a38] mb-4">Create PF Account</h2>
            <PFAccountForm />
          </div>
        );
      case 'transfer':
        return (
          <div className="bg-white border shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#1e2a38] mb-4">Fund Transfer</h2>
            <TransactionForm />
          </div>
        );
      case 'transactions':
        return (
          <div className="bg-white border shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#1e2a38] mb-4">Transaction History</h2>
            <TransactionList />
          </div>
        );
      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1e2a38] mb-2">Total PF Accounts</h3>
                <p className="text-2xl font-bold text-[#c13337]">128</p>
              </div>
              <div className="bg-white border shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1e2a38] mb-2">Total Transfers</h3>
                <p className="text-2xl font-bold text-[#c13337]">56</p>
              </div>
              <div className="bg-white border shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#1e2a38] mb-2">Pending Requests</h3>
                <p className="text-2xl font-bold text-[#c13337]">12</p>
              </div>
            </div>

            <div className="bg-white border shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#1e2a38] mb-4">PF Account List</h2>
              <PFAccountList />
            </div>
          </>
        );
    }
  };

  const navItems = [
    { label: 'Create', icon: <FaUserPlus size={20} />, view: 'create' },
    { label: 'Transfer', icon: <FaExchangeAlt size={20} />, view: 'transfer' },
    { label: 'Transactions', icon: <FaList size={20} />, view: 'transactions' },
    { label: 'Dashboard', icon: <FaTachometerAlt size={20} />, view: 'dashboard' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {!isAuthenticated ? (
        <AdminLoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar for large screens */}
          <aside className="hidden lg:flex w-64 bg-[#1e2a38] text-white min-h-screen px-6 py-6 shadow-lg flex-col">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-16 h-14 rounded-full bg-white flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-14 h-14 object-contain rounded-full" />
              </div>
              <h2 className="text-lg font-bold whitespace-nowrap">Om Enterprises</h2>
            </div>
            <nav className="flex flex-col gap-4 text-sm">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => setActiveView(item.view)}
                  className="text-left px-4 py-2 rounded-lg hover:bg-[#c13337] transition duration-150"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-10 bg-white">
            <header className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-[#c13337]">Welcome, Admin</h1>
              <div className="text-gray-500 capitalize hidden sm:block">
                {activeView.replace('-', ' ') || 'Dashboard Overview'}
              </div>
            </header>
            {renderMainContent()}
          </main>

          {/* Bottom Navbar for Mobile */}
          <nav className="fixed bottom-0 left-0 right-0 bg-[#1e2a38] flex justify-around items-center py-2 px-4 lg:hidden z-50 border-t border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setActiveView(item.view)}
                className={`flex flex-col items-center text-white hover:text-[#c13337] transition ${
                  activeView === item.view ? 'text-[#c13337]' : ''
                }`}
              >
                {item.icon}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
