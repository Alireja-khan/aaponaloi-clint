import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import {
  FaEnvelope, FaMapMarkerAlt, FaMoneyBillWave, FaUser,
  FaPhone, FaCalendarAlt, FaFileSignature,
  FaCheckCircle, FaHome, FaFileAlt
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useNavigate } from 'react-router';

const MemberProfile = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (user?.email) {
      const fetchData = async () => {
        try {
          const [agreementRes, memberRes] = await Promise.all([
            axios.get(`https://aaponaloi-server.vercel.app/agreements/accepted/${user.email}`),
            axios.get(`https://aaponaloi-server.vercel.app/members?email=${user.email}`)
          ]);

          setAgreement(agreementRes.data || null);
          setMemberDetails(memberRes.data?.[0] || null);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="text-center max-w-md p-8 bg-primary/20 rounded-2xl shadow-sm border border-secondary/50">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <FaHome className="text-blue-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Active Agreement</h2>
          <p className="text-gray-600 mb-6">
            You don't have an active housing agreement. Please contact administration to complete your registration.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="btn btn-primary rounded-lg px-6 py-2 shadow-sm hover:shadow-md transition-all"
          >
            Contact Admin
          </button>
        </div>
      </div>
    );
  }

  // Merge both sets of data
  const userData = {
    ...agreement,
    ...memberDetails,
    photoURL: user?.photoURL,
    displayName: user?.displayName,
    email: user?.email
  };

  // Rent & discount calculation
  const hasDiscount = userData?.discountPercentage > 0;
  const discountAmount = hasDiscount ? (userData?.originalRent || 0) - (userData?.rent || 0) : 0;

  // Format agreement date
  const agreementDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary">
            <FaUser className="text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Member Profile</h1>
        </div>
        <p className="text-gray-500">View and manage your housing information</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card - Takes 4 columns on large screens */}
        <div className="lg:col-span-4 bg-primary/20 rounded-xl shadow-sm border border-secondary/50 overflow-hidden h-fit" data-aos="fade-right">
          <div className="bg-primary/30 border-b border-b-secondary/50 p-6">
            <div className="flex flex-col items-center">
              <img
                src={
                  userData.photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.userName || userData.displayName || 'Member')}&background=random`
                }
                alt="Profile"
                className="w-44 h-62 rounded-xl object-cover object-top border-4 border-primary/60 shadow-sm"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-800 text-center">
                {userData.userName || userData.displayName || 'Member Name'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Resident Member</p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/80 rounded-lg  mt-0.5">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="text-xs font-medium  uppercase tracking-wider">Email</p>
                <p className="text-sm text-gray-600 mt-1 break-all">{userData.email || 'Not provided'}</p>
              </div>
            </div>

            {/* Phone */}
            {(userData.contact || userData.phone) && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/80 rounded-lg mt-0.5">
                  <FaPhone className="text-sm" />
                </div>
                <div>
                  <p className="text-xs font-medium  uppercase tracking-wider">Contact</p>
                  <p className="text-sm text-gray-600 mt-1">{userData.contact || userData.phone}</p>
                </div>
              </div>
            )}

            {/* Created At */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/80 rounded-lg  mt-0.5">
                <FaCalendarAlt className="text-sm" />
              </div>
              <div>
                <p className="text-xs font-medium  uppercase tracking-wider">Member Since</p>
                <p className="text-sm text-gray-600 mt-1">
                  {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Takes 8 columns on large screens */}
        <div className="lg:col-span-8 space-y-5">
          {/* Location & Financial in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Location Card */}
            <div className="bg-primary/20 rounded-xl shadow-sm border border-secondary/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-secondary/50 bg-primary/30 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/50">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <h2 className="text-base font-semibold text-gray-800">Location</h2>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium  uppercase">Block</p>
                  <p className="text-base font-medium text-gray-600 mt-1">{userData.block || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium  uppercase">Floor</p>
                  <p className="text-base font-medium text-gray-600 mt-1">{userData.floor || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium  uppercase">Apartment</p>
                  <p className="text-base font-medium text-gray-600 mt-1">{userData.apartmentNo || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium  uppercase">Status</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    <span className="text-base font-medium text-gray-600">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Card */}
            <div className="bg-primary/20 rounded-xl shadow-sm border border-secondary/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-secondary/50 bg-primary/30 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/50">
                  <FaMoneyBillWave className="text-sm" />
                </div>
                <h2 className="text-base font-semibold text-gray-800">Financials</h2>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase">Monthly Rent</p>
                  <p className="text-xl font-bold text-gray-600 mt-1">৳{userData.rent?.toLocaleString() || 'N/A'}</p>
                </div>
                {hasDiscount && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs font-medium text-blue-600 uppercase">Discount Applied</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-600 line-through">৳{userData.originalRent?.toLocaleString()}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {userData.discountPercentage}% OFF
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Agreement Details */}
          <div className="bg-primary/20 rounded-xl shadow-sm border border-secondary/50 overflow-hidden">
            <div className="px-5 py-3 border-b border-secondary/50 bg-primary/30 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/50">
                <FaFileSignature className="text-sm" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">Agreement Details</h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium  uppercase">Agreement Date</p>
                  <p className="text-sm text-gray-600 mt-1">{agreementDate}</p>
                </div>
                <div>
                  <p className="text-xs font-medium  uppercase">Document ID</p>
                  <p className="text-sm text-gray-600 mt-1 font-mono">{agreement._id?.slice(-8) || 'N/A'}</p>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-secondary/50">
                <p className="text-xs font-medium  uppercase mb-2">Key Terms</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <FaFileAlt className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                    <span>Rent due by the 5th of each month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaFileAlt className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                    <span>1 year minimum contract duration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaFileAlt className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                    <span>30 days notice required before moving out</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div>
            <Link to='/member-dashboard/make-payment'>
              <button className="w-full flex items-center justify-center gap-2 p-3 bg-primary/70 rounded-lg border border-secondary/50 hover:bg-secondary/70 hover:text-white transition-all shadow-sm hover:shadow-md">
                <FaMoneyBillWave className="" />
                <span className="font-medium">Make Payment</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;