import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PFAccountList = ({ onSelect }) => {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pf-accounts');
      console.log("API Response:", res.data);
      setAccounts(Array.isArray(res.data.accounts) ? res.data.accounts : []);
    } catch (error) {
      console.error('Error fetching PF accounts:', error);
      setAccounts([]);
    }
  };

  const deleteAccount = async (pfNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/pf-accounts/${pfNumber}`);
      // After deletion, refetch the list
      fetchAccounts();
    } catch (error) {
      console.error('Error deleting PF account:', error);
      alert('Failed to delete the account.');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-2 text-center">PF Accounts</h3>
      {Array.isArray(accounts) && accounts.length > 0 ? (
        accounts.map((acc) => (
          <div
            key={acc.pfNumber}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg bg-white cursor-pointer transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div onClick={() => onSelect(acc.pfNumber)}>
                <p className="text-lg font-semibold text-blue-700">{acc.name}</p>
                <p className="text-sm text-gray-600">PF Number: {acc.pfNumber}</p>
                <p className="text-sm text-gray-600">Position: {acc.position}</p>
                <p className="text-sm text-gray-600">Gender: {acc.gender}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Balance</p>
                <p className="text-xl font-bold text-green-600">₹{acc.pfBalance?.toLocaleString()}</p>
                <button
                  onClick={() => deleteAccount(acc.pfNumber)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No PF accounts found</p>
      )}
    </div>
  );
};

export default PFAccountList;
