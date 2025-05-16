import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionForm = () => {
  const navigate = useNavigate();
  const [pfNumber, setPfNumber] = useState('');
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  const [form, setForm] = useState({
    date: '',
    type: '',
    mode: '',
    amount: '',
    isCredit: true,
  });

  // Set current IST date on mount
  useEffect(() => {
    const getISTDate = () => {
      const nowUTC = new Date();
      const offset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(nowUTC.getTime() + offset);
      const formatted = istTime.toISOString().split('T')[0];
      setForm((prev) => ({ ...prev, date: formatted }));
    };

    getISTDate();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Automatically set isCredit based on type
    if (name === 'type') {
      const isCredit = ['Salary', 'Gift', 'Bonus'].includes(value);
      setForm((prev) => ({
        ...prev,
        type: value,
        isCredit,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const generateReferenceId = () => {
    const randomTenDigit = Math.floor(1000000000 + Math.random() * 9000000000);
    return `OMPF${randomTenDigit}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pfNumber.trim()) {
      alert('Please enter a PF Account Number.');
      return;
    }

    const generatedRef = generateReferenceId();

    try {
      const payload = {
        ...form,
        pfNumber,
        ref: generatedRef,
      };

      await axios.post('http://localhost:5000/api/transactions', payload);

      setSuccess(true);
      setRefId(generatedRef);
      setForm({
        date: form.date,
        type: '',
        mode: '',
        amount: '',
        isCredit: true,
      });
      setPfNumber('');

      setTimeout(() => {
        setSuccess(false);
        setRefId('');
      }, 4000);
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <button
        onClick={() => navigate('/admin')}
        className="text-blue-600 underline mb-4 inline-block"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      {success && (
        <div className="mb-6 flex items-center justify-center flex-col">
          <svg
            className="w-16 h-16 text-green-600 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-green-700 mt-2 text-lg font-semibold">
            Transaction Successful!
          </p>
          <p className="text-sm text-gray-700">
            Reference ID: <strong>{refId}</strong>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="pfNumber"
          value={pfNumber}
          onChange={(e) => setPfNumber(e.target.value)}
          placeholder="PF Account Number"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          value={form.date}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="Salary">Salary</option>
          <option value="Bonus">Bonus</option>
          <option value="Gift">Gift</option>
          <option value="Withdrawal">Withdrawal</option>
          <option value="Fine">Fine</option>
        </select>

        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Mode</option>
          <option value="UPI">UPI</option>
          <option value="Bank">Bank</option>
          <option value="PF Account">PF Account</option>
          <option value="Cash">Cash</option>
        </select>

        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full border px-3 py-2 rounded"
          required
        />

        {/* Automatically show Credit/Debit info */}
        <p className={`font-medium ${form.isCredit ? 'text-green-600' : 'text-red-600'}`}>
          Transaction Type: {form.isCredit ? 'Credit' : 'Debit'}
        </p>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Make Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
