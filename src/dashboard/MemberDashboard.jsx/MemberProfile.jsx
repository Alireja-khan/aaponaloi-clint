import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import {
  FaEnvelope, FaMapMarkerAlt,
  FaBuilding, FaThLarge, FaDoorClosed, FaMoneyBillWave, FaUserCheck
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MemberProfile = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/agreements/accepted/${user.email}`)
        .then(res => setAgreement(res.data))
        .catch(err => console.error('No accepted agreement:', err))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (!agreement) {
    return <div className="text-center py-10 text-red-500">No accepted agreement found</div>;
  }

  const {
    userName,
    email,
    floor,
    block,
    apartmentNo,
    rent,
    createdAt
  } = agreement;

  return (
    <div className="py-10 pl-10">
      <h1
        className="text-4xl font-bold flex items-center gap-3"
        data-aos="fade-down"
      >
        <FaUserCheck className="text-secondary" />
        Member <span className="text-secondary">Profile</span>
      </h1>

      <div className="bg-white text-gray-800 rounded-xl overflow-hidden max-w-5xl my-10 flex items-center shadow-lg">
        {/* Left: Image */}
        <div
          className="w-1/2 bg-gray-50 p-6 flex items-center justify-center"
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
          className="w-1/2 p-8 flex flex-col justify-between"
          data-aos="fade-left"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{userName || user?.displayName || 'Member Name'}</h1>
            <h2 className="text-lg mb-4 text-slate-600">Resident Member</h2>

            <p className="text-slate-700 text-md leading-relaxed mb-6">
              Welcome to your member profile. Here you can view your current agreement and housing details.
            </p>

            <div className="space-y-2 text-md">
              <p className="flex items-center gap-2 text-slate-700">
                <FaEnvelope className="text-slate-500" />
                <span>Email:</span> {email}
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <FaMapMarkerAlt className="text-slate-500" />
                <span>Joined:</span> {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="rounded-lg max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
            colSpan: true, // mark this card to span full width
          }
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-gray-50 rounded-md p-4 shadow flex items-center justify-between gap-4 transition-all duration-300 ease-in-out  hover:shadow-lg ${
              item.colSpan ? 'lg:col-span-3' : ''
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
    </div>
  );
};

export default MemberProfile;
