import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaUser, FaFileContract, FaHome } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (user?.email) {
      axios
        .get(`http://localhost:5000/agreements/accepted/${user.email}`)
        .then(res => setAgreement(res.data))
        .catch(() => setAgreement(null));
    }
  }, [user?.email]);

  return (
    <div className="py-15 pl-10">
      <h1
        className="text-4xl font-bold flex items-center gap-3"
        data-aos="fade-down"
      >
        <FaUser className="text-secondary" />
        My <span className="text-secondary">Profile</span>
      </h1>

      <div className="bg-white text-gray-800 rounded-xl overflow-hidden max-w-5xl my-10 flex shadow-lg">
        {/* Left: Avatar */}
        <div
          className="w-1/2 bg-gray-50 p-6 flex items-center justify-center"
          data-aos="fade-right"
        >
          <img
            src={user?.photoURL || 'https://via.placeholder.com/200'}
            alt="User"
            className="w-48 h-48 rounded-lg object-cover border-4 border-gray-200"
          />
        </div>

        {/* Right: Info */}
        <div
          className="w-1/2 p-8 flex flex-col justify-between"
          data-aos="fade-left"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{user?.displayName || 'Member Name'}</h1>
            <h2 className="text-lg mb-4 text-slate-600">Registered Member</h2>

            <p className="text-slate-700 text-md leading-relaxed mb-6">
              This member has access to rental details, payment system, and announcements within the housing platform.
            </p>

            <div className="space-y-2 text-md">
              <p className="flex items-center gap-2 text-slate-700">
                <FaMapMarkerAlt className="text-slate-500" />
                <span>Location:</span> {user?.location || 'Not specified'}
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <FaPhoneAlt className="text-slate-500" />
                <span>Phone:</span> {user?.phone || 'Not provided'}
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <FaEnvelope className="text-slate-500" />
                <span>Email:</span> {user?.email || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Agreement Stats */}
      <div className="rounded-lg max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {agreement ? (
          [
            {
              label: 'Agreement Accepted On',
              value: new Date(agreement?.acceptedAt || agreement?.createdAt).toLocaleDateString(),
              icon: <FaFileContract className="text-green-600 text-2xl" />,
            },
            {
              label: 'Block',
              value: agreement.block,
              icon: <FaHome className="text-blue-600 text-2xl" />,
            },
            {
              label: 'Floor',
              value: agreement.floor,
              icon: <FaHome className="text-indigo-600 text-2xl" />,
            },
            {
              label: 'Apartment No',
              value: agreement.apartmentNo,
              icon: <FaHome className="text-teal-600 text-2xl" />,
            },
            {
              label: 'Monthly Rent',
              value: `৳${agreement.rent}`,
              icon: <FaFileContract className="text-orange-600 text-2xl" />,
              span: true,
            },
          ]
        ) : (
          [
            {
              label: 'Agreement Status',
              value: 'No active agreement found',
              icon: <FaFileContract className="text-red-600 text-2xl" />,
              span: true,
            },
          ]
        ).map((item, index) => (
          <div
            key={index}
            className={`bg-gray-50 rounded-md p-4 shadow flex items-center justify-between gap-4 hover:scale-[1.02] transition duration-300 ${item.span ? 'col-span-1 sm:col-span-2 lg:col-span-3' : ''
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

export default Profile;
