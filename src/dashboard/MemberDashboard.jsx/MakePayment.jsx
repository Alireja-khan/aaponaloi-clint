import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { FaMoneyCheckAlt, FaEye, FaTag, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router';

const MakePayment = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalRent, setFinalRent] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://aaponaloi-server.vercel.app/agreements/accepted/${user.email}`)
        .then(res => {
          setAgreement(res.data);
          setFinalRent(res.data?.rent);
        })
        .catch(() => toast.error('No accepted agreement found'))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  // Pre-fill coupon
  useEffect(() => {
    if (location.state?.appliedCoupon) {
      setCoupon(location.state.appliedCoupon);
    }
  }, [location.state, agreement]);

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return;

    axios
      .get(`https://aaponaloi-server.vercel.app/coupons/${coupon}`)
      .then(res => {
        const percentage = res.data?.discount;
        if (percentage) {
          const reduced = agreement.rent - (agreement.rent * (percentage / 100));
          setDiscount(percentage);
          setFinalRent(Math.round(reduced));
          toast.success(`Coupon Applied: ${percentage}% off`);
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        toast.error('Invalid coupon code');
        setDiscount(0);
        setFinalRent(agreement.rent);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!month.trim()) {
      toast.error('Please enter a month');
      return;
    }

    const paymentData = {
      email: user.email,
      userName: agreement.userName,
      apartmentNo: agreement.apartmentNo,
      floor: agreement.floor,
      block: agreement.block,
      rent: finalRent,
      originalRent: agreement.rent,
      month,
      discountPercentage: discount,
    };

    try {
      setSubmitting(true);
      const res = await axios.post('https://aaponaloi-server.vercel.app/payments', paymentData);
      if (res.status === 201) {
        toast.success(`Payment of ৳${finalRent} for ${month} submitted successfully`);
        setMonth('');
        setCoupon('');
        setDiscount(0);
        setFinalRent(agreement.rent);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error('You have already paid for this month');
      } else {
        console.error(err);
        toast.error('Failed to submit payment');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white">
        <span className="loading loading-bars loading-lg text-green-600"></span>
      </div>
    );
  }

  if (!agreement) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <FaMoneyCheckAlt className="text-green-600" />
            Make <span className="text-green-700">Payment</span>
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">Complete your rental payment quickly and securely through our platform</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-green-600 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Payment Details</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Member Email" value={user.email} readOnly />
                <Input label="Floor" value={agreement.floor} readOnly />
                <Input label="Block Name" value={agreement.block} readOnly />
                <Input label="Apartment No" value={agreement.apartmentNo} readOnly />
                <Input label="Original Rent" value={`৳${agreement.rent}`} readOnly />
                <Input
                  label="Month"
                  value={month}
                  placeholder="e.g., July 2025"
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </div>

              {/* Coupon Section */}
              <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">Coupon Code</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTag className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle />
                    <span>Apply</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.location.pathname !== '/') {
                        window.location.href = '/#coupons';
                      } else {
                        const el = document.getElementById('coupons');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-green-100 transition flex items-center justify-center gap-2"
                  >
                    <FaEye />
                    <span>View Coupons</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`mt-8 w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 ${
                  submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-green-600 px-6 py-4">
              <h3 className="text-lg font-semibold text-white">Order Summary</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Original Rent</span>
                  <span className="font-medium">৳{agreement.rent}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100 text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span className="font-medium">-৳{agreement.rent - finalRent}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 pt-4">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-green-700">৳{finalRent}</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Payment Method
                </h4>
                <p className="text-sm text-gray-600">
                  After submission, you'll receive bank transfer details via email. Please complete the transfer within 24 hours.
                </p>
              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  Important Note
                </h4>
                <p className="text-sm text-gray-600">
                  Please ensure the payment is made from an account in your name. Payments from third-party accounts may cause delays in processing.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
        props.readOnly ? 'bg-gray-50 text-gray-600' : 'bg-white'
      }`}
    />
  </div>
);

export default MakePayment;