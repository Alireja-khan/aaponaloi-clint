import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import {
  FaEnvelope, FaMapMarkerAlt, FaBuilding, FaThLarge, 
  FaDoorClosed, FaMoneyBillWave, FaUserCheck, FaEdit,
  FaCalendarAlt, FaIdCard, FaPhone, FaInfoCircle
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://aaponaloi-server.vercel.app/agreements/accepted/${user.email}`)
        .then(res => {
          setAgreement(res.data);
        })
        .catch(err => {
          console.error('No accepted agreement:', err);
          setAgreement(null);
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const {
    userName,
    email,
    floor,
    block,
    apartmentNo,
    rent,
    createdAt,
    contactNumber,
    nidNumber
  } = agreement || {};

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
          <FaInfoCircle className="text-primary" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-3 rounded-full">
              <FaUserCheck className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{userName || user?.displayName || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 p-3 rounded-full">
              <FaEnvelope className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{email || user?.email || 'Not provided'}</p>
            </div>
          </div>
          {contactNumber && (
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-3 rounded-full">
                <FaPhone className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{contactNumber}</p>
              </div>
            </div>
          )}
          {nidNumber && (
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 p-3 rounded-full">
                <FaIdCard className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">NID Number</p>
                <p className="font-medium">{nidNumber}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {agreement && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
            <FaBuilding className="text-primary" />
            Residence Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Block', value: block, icon: <FaBuilding /> },
              { label: 'Floor', value: floor, icon: <FaThLarge /> },
              { label: 'Apartment No', value: apartmentNo, icon: <FaDoorClosed /> },
              { label: 'Monthly Rent', value: `৳${rent}`, icon: <FaMoneyBillWave /> },
            ].map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-full text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentTab = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-700">
        <MdPayment className="text-primary" />
        Payment History
      </h3>
      {agreement ? (
        <div className="text-center py-10">
          <div className="mx-auto w-48 h-48 mb-4 opacity-70 flex items-center justify-center bg-gray-100 rounded-full">
            <MdPayment className="text-5xl text-gray-400" />
          </div>
          <p className="text-gray-500">No payment history available yet</p>
          <button className="mt-4 btn btn-primary">Make Payment</button>
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="mx-auto w-48 h-48 mb-4 opacity-70 flex items-center justify-center bg-gray-100 rounded-full">
            <FaBuilding className="text-5xl text-gray-400" />
          </div>
          <p className="text-gray-500">You need an accepted agreement to view payment information</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 lg:w-1/4" data-aos="fade-right">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary h-24 relative">
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  alt="Member"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              </div>
            </div>
            <div className="pt-16 pb-6 px-4 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {userName || user?.displayName || 'Member Name'}
              </h2>
              <p className="text-sm text-gray-500 mb-4">Resident Member</p>
              
              <div className="flex justify-center gap-2 mb-4">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
                {agreement && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm mt-4 text-left">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>Member since: </span>
                  <span className="font-medium">
                    {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>Status: </span>
                  <span className="font-medium">
                    {agreement ? 'With Agreement' : 'No Agreement'}
                  </span>
                </div>
              </div>

              <button className="btn btn-outline btn-sm mt-6 w-full">
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4" data-aos="fade-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaUserCheck className="text-secondary" />
            My <span className="text-secondary">Profile</span>
          </h1>

          {/* Tabs */}
          <div className="tabs mb-6">
            <button
              className={`tab tab-lg tab-bordered ${activeTab === 'overview' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button> 
            <button
              className={`tab tab-lg tab-bordered ${activeTab === 'payments' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm p-1">
            {activeTab === 'overview' ? renderOverviewTab() : renderPaymentTab()}
          </div>

          {!agreement && (
            <div className="alert alert-warning mt-6 shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>You don't have an accepted agreement yet. Please contact the admin for assistance.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;