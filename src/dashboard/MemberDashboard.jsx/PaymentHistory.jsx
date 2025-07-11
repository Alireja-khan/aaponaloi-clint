import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/payments?email=${user.email}`)
        .then(res => setPayments(res.data))
        .catch(err => console.error('Error fetching payments:', err));
    }
  }, [user?.email]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-[#D9822B]">Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead className="bg-[#f7f7f7] text-gray-700">
              <tr>
                <th className="py-3 px-4 border-b">Month</th>
                <th className="py-3 px-4 border-b">Apartment</th>
                <th className="py-3 px-4 border-b">Rent</th>
                <th className="py-3 px-4 border-b">Discount</th>
                <th className="py-3 px-4 border-b">Paid</th>
                <th className="py-3 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, idx) => (
                <tr key={idx} className="text-center border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{p.month}</td>
                  <td className="py-2 px-4">{p.apartmentNo} (Block {p.block}, Floor {p.floor})</td>
                  <td className="py-2 px-4">৳{p.originalRent}</td>
                  <td className="py-2 px-4">{p.discountPercentage || 0}%</td>
                  <td className="py-2 px-4 font-bold text-green-600">৳{p.rent}</td>
                  <td className="py-2 px-4">{new Date(p.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

    