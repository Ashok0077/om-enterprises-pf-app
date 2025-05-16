// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './admin/AdminDashboard';
import PFAccountForm from './admin/PFAccountForm';
import TransactionForm from './admin/TransactionForm';
import TransactionList from './admin/TransactionList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-pf-account" element={<PFAccountForm />} />
        <Route path="/admin/fund-transfer" element={<TransactionForm />} />
        <Route path="/admin/view-transactions" element={<TransactionList />} />
      </Routes>
    </Router>
  );
}

export default App;
