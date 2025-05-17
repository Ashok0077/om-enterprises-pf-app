import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionList = () => {
  const [pfNumberInput, setPfNumberInput] = useState('');
  const [pfNumber, setPfNumber] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const fetchTransactions = async (pfAccNo) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://om-enterprises-pf-app.onrender.com/api/transactions/${pfAccNo}`);
      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (pfNumberInput.trim()) {
      setPfNumber(pfNumberInput.trim());
      fetchTransactions(pfNumberInput.trim());
    }
  };

  const handleDelete = async (ref) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await axios.delete(`https://om-enterprises-pf-app.onrender.com/api/transactions/ref/${ref}`);
      setTransactions((prev) => prev.filter((txn) => txn.ref !== ref));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      alert('Failed to delete transaction.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4">
      <button
        onClick={() => navigate('/admin')}
        className="text-blue-600 underline mb-4 inline-block"
      >
        ← Back to Dashboard
      </button>

      <div className="flex gap-2 items-center mb-4">
        <input
          type="text"
          value={pfNumberInput}
          onChange={(e) => setPfNumberInput(e.target.value)}
          placeholder="Enter PF Account Number"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading transactions...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {pfNumber && !loading && !error && (
        <div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            Transactions for <span className="text-blue-700">{pfNumber}</span>
          </h3>

          {transactions.length === 0 ? (
            <p className="text-gray-600">No transactions found.</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn, idx) => (
                <div
                  key={idx}
                  className="border rounded-md p-3 bg-gray-50 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold">{txn.type}</p>
                    <p className={txn.isCredit ? 'text-green-600' : 'text-red-600'}>
                      {txn.isCredit ? 'Credit' : 'Debit'}
                    </p>
                  </div>
                  <p className="text-gray-700">₹{txn.amount} via {txn.mode}</p>
                  <p className="text-sm text-gray-600">Ref: {txn.ref}</p>
                  <p className="text-sm text-gray-600">Date: {txn.date}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleDelete(txn.ref)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
