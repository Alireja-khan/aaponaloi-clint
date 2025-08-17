import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import {
  FaEnvelope, FaMapMarkerAlt,
  FaBuilding, FaThLarge, FaDoorClosed, FaMoneyBillWave, FaUserCheck
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://aaponaloi-server.vercel.app/agreements/accepted/${user.email}`)
        .then(res => setAgreement(res.data))
        .catch(err => console.error('No accepted agreement:', err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);
  
  console.log(user)

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
    createdAt
  } = agreement || {};

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <h1
        className="text-3xl sm:text-4xl font-bold flex items-center gap-3 mb-6"
        data-aos="fade-down"
      >
        <FaUserCheck className="text-secondary" />
        Member <span className="text-secondary">Profile</span>
      </h1>

      {/* Profile Card */}
      <div className="bg-white text-gray-800 items-center rounded-xl overflow-hidden max-w-5xl my-10 shadow-lg flex flex-col md:flex-row">
        {/* Left: Image */}
        <div
          className="w-full md:w-1/2 bg-gray-50 p-6 flex items-center justify-center"
          data-aos="fade-right"
        >
          <img
            src={user?.photoURL || 'https://via.placeholder.com/200'}
            alt="Member"
            className="w-100 h-100 rounded-lg object-top object-cover border-4 border-gray-200"
          />
        </div>

        {/* Right: Info */}
        <div
          className="w-full md:w-1/2 p-6 flex flex-col justify-between"
          data-aos="fade-left"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {userName || user?.displayName || 'Member Name'}
            </h1>
            <h2 className="text-md text-slate-600 mb-4">Resident Member</h2>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
              Welcome to your member profile. Here you can view your current agreement and housing details.
            </p>

            <div className="space-y-2 text-sm md:text-base">
              <p className="flex items-center gap-2 text-slate-700">
                <FaEnvelope className="text-slate-500" />
                <span>Email:</span> {email || user?.email || 'Not provided'}
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <FaMapMarkerAlt className="text-slate-500" />
                <span>Joined:</span>{' '}
                {createdAt ? new Date(createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agreement or Fallback */}
      {!agreement ? (
        <div
          className="text-center text-red-500 text-lg mt-8"
          data-aos="fade-up"
        >
          No accepted agreement found
        </div>
      ) : (
        <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            {
              label: 'Block',
              value: block,
              icon: <FaBuilding className="text-blue-600 text-2xl" />,
            },
            {
              label: 'Floor',
              value: floor,
              icon: <FaThLarge className="text-indigo-600 text-2xl" />,
            },
            {
              label: 'Apartment No',
              value: apartmentNo,
              icon: <FaDoorClosed className="text-red-600 text-2xl" />,
            },
            {
              label: 'Rent (৳)',
              value: rent,
              icon: <FaMoneyBillWave className="text-green-600 text-2xl" />,
              span: true,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-md p-4 shadow flex items-center justify-between gap-4 hover:scale-[1.02] transition duration-300 ${item.span ? 'col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-3' : ''
                }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div>
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="text-xl font-bold text-gray-800">{item.value}</p>
              </div>
              {item.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
