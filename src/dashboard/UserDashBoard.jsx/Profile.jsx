import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import {
  FaEnvelope, FaMapMarkerAlt, FaBuilding,
  FaUserCheck, FaEdit,
  FaCalendarAlt, FaIdCard, FaPhone, FaInfoCircle,
  FaLayerGroup,
  FaHome,
  FaMoneyBillAlt
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <span className="loading loading-bars loading-xl"></span>
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

  return (
    <div className="px-4 mt-30 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Card */}
        <div className="w-full md:w-1/3 lg:w-1/4" data-aos="fade-right">
          <div className="bg-primary/20 border border-secondary/50 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
            <div className="bg-gradient-to-r from-primary to-secondary h-24 relative">
              <div className="absolute -bottom-26 left-1/2 transform -translate-x-1/2">
                <div className="w-44 h-44 rounded-full border-4 border-white bg-primary/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt="Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="pt-16 mt-15 pb-6 px-4 text-center flex-grow">
              <h2 className="text-xl font-bold text-gray-800">
                {userName || user?.displayName || 'Member Name'}
              </h2>
              <p className="text-sm text-gray-500 mb-4">Resident Member</p>

              <div className="flex justify-center gap-2 mb-4">
                <span className="bg-primary text-xs px-2 py-1 rounded-full">
                  Active
                </span>
                {agreement && (
                  <span className="bg-primary/50 text-xs px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm mt-4 ml-8 px-2">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="flex-shrink-0" />
                  <span>Member since: </span>
                  <span className="font-medium">
                    {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="flex-shrink-0" />
                  <span>Status: </span>
                  <span className="font-medium">
                    {agreement ? 'With Agreement' : 'No Agreement'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4" data-aos="fade-left">
          <div className="flex items-center gap-3 mb-6">
            <FaUserCheck className="text-secondary text-2xl" />
            <h1 className="text-3xl font-bold text-gray-800">
              My <span className="text-secondary">Profile</span>
            </h1>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <div className="bg-primary/20 border border-secondary/50 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
                <FaInfoCircle className="text-secondary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3">
                  <div className="bg-primary p-3 rounded-full">
                    <FaUserCheck className="" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Full Name</p>
                    <p className="font-medium">{userName || user?.displayName || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3">
                  <div className="bg-primary p-3 rounded-full">
                    <FaEnvelope className="" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">Email</p>
                    <p className="font-medium">{email || user?.email || 'Not provided'}</p>
                  </div>
                </div>
                {contactNumber && (
                  <div className="flex items-center gap-3 p-3">
                    <div className="bg-primary p-3 rounded-full">
                      <FaPhone className="" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Contact Number</p>
                      <p className="font-medium">{contactNumber}</p>
                    </div>
                  </div>
                )}
                {nidNumber && (
                  <div className="flex items-center gap-3 p-3">
                    <div className="bg-primary p-3 rounded-full">
                      <FaIdCard className="" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">NID Number</p>
                      <p className="font-medium">{nidNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {agreement && (
              <div className="bg-primary/20 border border-secondary/50 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaBuilding className="text-secondary" />
                  Residence Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: 'Block',
                      value: block,
                      icon: <FaBuilding className="text-lg text-black" />
                    },
                    {
                      label: 'Floor',
                      value: floor,
                      icon: <FaLayerGroup className="text-lg text-black" />
                    },
                    {
                      label: 'Apartment No',
                      value: apartmentNo,
                      icon: <FaHome className="text-lg text-black" />
                    },
                    {
                      label: 'Monthly Rent',
                      value: `৳${rent}`,
                      icon: <FaMoneyBillAlt className="text-lg text-black" />
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border border-secondary/50 rounded-lg p-4 hover:shadow-md transition-shadow"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-full text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm">{item.label}</p>
                          <p className="font-semibold">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!agreement && (
            <div className="alert bg-amber-100 border-secondary/50 alert-warning mt-6 shadow-lg">
              <div className="flex items-start gap-2">
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