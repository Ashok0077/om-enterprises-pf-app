import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('employee');
        if (!token) throw new Error('No employee token found');

        const parsedToken = JSON.parse(token);
        setEmployeeData(parsedToken);

        const pfNumber = parsedToken.pfNumber;
        if (!pfNumber) throw new Error('No PF number found in token');

        // Fetch transactions using PF account number
        const res = await axios.get(`https://om-enterprises-pf-app.onrender.com/api/transactions/${pfNumber}`, {
          headers: { Authorization: `Bearer ${parsedToken.token}` },
        });

        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  if (!employeeData) {
    return <div className="text-center text-red-500 mt-10">Loading or employee not found...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="lg:w-1/3 w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
           // src={employeeData.photo}
           src={`data:image/jpeg;base64,${employeeData.photo}`}
            alt="Employee"
            className="w-32 h-32 rounded-full mb-4 object-cover shadow"
          />
          <h2 className="text-2xl font-bold text-omred mb-1">{employeeData.name}</h2>
          <p className="text-base text-gray-500 mb-4">{employeeData.position}</p>
          <div className="text-sm text-left w-full space-y-2">
            <p><span className="font-semibold">Date of Birth:</span> {employeeData.dob}</p>
            <p><span className="font-semibold">Gender:</span> {employeeData.gender}</p>
            <p><span className="font-semibold">Aadhar:</span> {employeeData.aadhar}</p>
            <p><span className="font-semibold">PF Account:</span> {employeeData.pfNumber}</p>
            <p><span className="font-semibold">PF Balance:</span> <span className="text-green-600 font-semibold">₹{employeeData.pfBalance}</span></p>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/3 w-full">
          <h2 className="text-2xl font-semibold text-omblue mb-4 text-center lg:text-left">Transaction History</h2>
          <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
            <table className="min-w-full text-sm md:text-base">
              <thead className="bg-omblue text-white text-left">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index} className="border-t hover:bg-gray-100 transition-all">
                    <td className="px-4 py-3">{txn.date}</td>
                    <td className="px-4 py-3">{txn.type}</td>
                    <td className="px-4 py-3">{txn.mode}</td>
                    <td className="px-4 py-3">{txn.ref}</td>
                    <td className={`px-4 py-3 font-bold ${txn.isCredit ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.isCredit ? `+ ₹${txn.amount}` : `- ₹${txn.amount}`}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
