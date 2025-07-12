import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { VscEmptyWindow } from 'react-icons/vsc';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import noFound from '../../assets/images/Empty-cuate.png';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true });
    if (user?.email) {
      axios
        .get(`http://localhost:5000/payments?email=${user.email}`)
        .then(res => setPayments(res.data))
        .catch(err => console.error('Error fetching payments:', err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  return (
    <div className="pt-15 pl-10 max-w-5xl">
      <h2
        className="text-4xl pb-9 font-bold flex items-center gap-3"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
      >
        <FaMoneyCheckAlt className="text-secondary" />
        Payment <span className="text-secondary">History</span>
      </h2>

      {loading ? null : payments.length === 0 ? (
        <div
          className="text-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span>
              <VscEmptyWindow className="text-4xl text-gray-400" />
            </span>
            <h1 className="text-3xl font-semibold text-gray-500">
              No Payment Records Found
            </h1>
          </div>
          <div
            className="flex justify-center items-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <img className="w-150" src={noFound} alt="Not Found" />
          </div>
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Month</th>
                <th className="py-3 px-4 text-left">Apartment</th>
                <th className="py-3 px-4 text-left">Rent</th>
                <th className="py-3 px-4 text-left">Discount</th>
                <th className="py-3 px-4 text-left">Paid</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((p, idx) => (
                <motion.tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="py-2 px-4">{p.month}</td>
                  <td className="py-2 px-4">{p.apartmentNo} (Block {p.block}, Floor {p.floor})</td>
                  <td className="py-2 px-4">৳{p.originalRent}</td>
                  <td className="py-2 px-4">{p.discountPercentage || 0}%</td>
                  <td className="py-2 px-4 font-bold text-green-600">৳{p.rent}</td>
                  <td className="py-2 px-4">{new Date(p.paidAt).toLocaleDateString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentHistory;
