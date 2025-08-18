import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMoneyCheckAlt, FaHistory, FaSearch } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';
import { BsCalendarCheck, BsCurrencyDollar } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import noFound from '../../assets/images/Empty-cuate.png';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true });
    if (user?.email) {
      axios
        .get(`https://aaponaloi-server.vercel.app/payments?email=${user.email}`)
        .then(res => setPayments(res.data))
        .catch(err => console.error('Error fetching payments:', err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  const filteredPayments = payments.filter(payment => 
    payment.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.apartmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.block.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-8">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
              <FaHistory className="text-primary" />
              Payment <span className="text-primary">History</span>
            </h2>
            <p className="text-gray-600 mt-2">View all your previous rental payments</p>
          </div>
          
          {payments.length > 0 && (
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="" />
              </div>
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {!loading && payments.length === 0 && (
          <motion.div
            className="text-center bg-primary/20 rounded-xl shadow-sm p-8 border border-secondary/50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <img 
                src={noFound} 
                alt="No payments found" 
                className="w-64 h-64 mx-auto mb-6" 
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Payment Records Found
              </h3>
              <p className=" mb-6">
                You haven't made any payments yet. Your payment history will appear here once you complete your first payment.
              </p>
            </div>
          </motion.div>
        )}

        {/* Payment Table */}
        {filteredPayments.length > 0 && (
          <motion.div
            className="bg-primary/20 rounded-xl shadow-sm overflow-hidden border border-secondary/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-secondary/20">
                <thead className="bg-primary/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <BsCalendarCheck />
                        Month
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <IoLocationSharp />
                        Apartment
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <RiBillFill />
                        Original Rent
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <BsCurrencyDollar />
                        Amount Paid
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-primary/20 divide-y divide-secondary/20">
                  {filteredPayments.map((p, idx) => (
                    <motion.tr
                      key={idx}
                      className="hover:bg-primary/30 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{p.apartmentNo}</span>
                          <span className="">|</span>
                          <span>Block {p.block}</span>
                          <span className="">|</span>
                          <span>Floor {p.floor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        ৳{p.originalRent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.discountPercentage > 0 
                            ? 'bg-primary' 
                            : 'bg-primary/50'
                        }`}>
                          {p.discountPercentage || 0}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        ৳{p.rent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm ">
                        {new Date(p.paidAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="bg-primary/50 px-6 py-3 border-t border-secondary/30">
              <div className="flex justify-between items-center">
                <p className="text-sm ">
                  Showing <span className="font-medium">{filteredPayments.length}</span> of{' '}
                  <span className="font-medium">{payments.length}</span> payments
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* No results for search */}
        {payments.length > 0 && filteredPayments.length === 0 && (
          <motion.div
            className="text-center bg-primary/20 rounded-xl shadow-sm p-8 border border-secondary/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-md mx-auto">
              <FaSearch className="text-4xl  mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No payments found
              </h3>
              <p className=" mb-4">
                No payments match your search for "<span className="font-medium">{searchTerm}</span>"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;