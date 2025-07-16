import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import {
  FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaBed,
  FaDoorOpen, FaDoorClosed, FaUsers, FaUserCheck,
  FaTicketAlt, FaUserShield
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    availableRoomsPercentage: '0.00',
    unavailableRoomsPercentage: '0.00',
    users: 0,
    members: 0,
    coupons: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [apartmentsRes, usersRes, membersRes, couponsRes] = await Promise.all([
          axios.get('https://aaponaloi-server.vercel.app/apartments'),
          axios.get('https://aaponaloi-server.vercel.app/users'),
          axios.get('https://aaponaloi-server.vercel.app/members'),
          axios.get('https://aaponaloi-server.vercel.app/coupons'),
        ]);

        const allRooms = apartmentsRes.data;
        const availableRooms = allRooms.filter(room => !room.isBooked);

        const totalRooms = allRooms.length;
        const availableCount = availableRooms.length;
        const unavailableCount = totalRooms - availableCount;

        const availableRoomsPercentage = totalRooms
          ? ((availableCount / totalRooms) * 100).toFixed(2)
          : '0.00';

        const unavailableRoomsPercentage = totalRooms
          ? ((unavailableCount / totalRooms) * 100).toFixed(2)
          : '0.00';

        setStats({
          totalRooms,
          availableRooms: availableCount,
          availableRoomsPercentage,
          unavailableRoomsPercentage,
          users: usersRes.data.length,
          members: membersRes.data.length,
          coupons: couponsRes.data.length,
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <h1
        className="text-3xl sm:text-4xl font-bold flex items-center gap-3 mb-6"
        data-aos="fade-down"
      >
        <FaUserShield className="text-secondary" />
        Admin <span className="text-secondary">Profile</span>
      </h1>

      {/* Profile Card */}
      <div className="bg-white text-gray-800 items-center rounded-xl overflow-hidden max-w-5xl my-10 shadow-lg flex flex-col md:flex-row">
        {/* Left: Image Section */}
        <div
          className="w-full md:w-1/2 bg-gray-50 p-6 flex items-center justify-center"
          data-aos="fade-right"
        >
          <img
            src={user?.photoURL || 'https://via.placeholder.com/200'}
            alt="Admin"
            className="w-100 h-100 rounded-lg object-top object-cover border-4 border-gray-200"
          />
        </div>

        {/* Right: Info Section */}
        <div
          className="w-full md:w-1/2 p-6 flex flex-col justify-between"
          data-aos="fade-left"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{user?.displayName || 'Admin Name'}</h1>
            <h2 className="text-md text-slate-600 mb-4">Admin / Lead Manager</h2>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
              {user?.bio ||
                "This admin manages core operations, oversees system performance, and ensures platform stability and efficiency for all users."}
            </p>

            <div className="space-y-2 text-sm md:text-base">
              <p className="flex items-center gap-2 text-slate-700">
                <FaMapMarkerAlt className="text-slate-500" />
                <span>Location:</span> {user?.location || 'City, Country'}
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

          <div className="mt-4 flex gap-4 text-lg">
            <a
              href={user?.instagram || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href={user?.whatsapp || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {[
          { label: 'Total Rooms', value: stats.totalRooms, icon: <FaBed className="text-blue-600 text-2xl" /> },
          { label: 'Available Rooms', value: stats.availableRooms, icon: <FaDoorOpen className="text-green-600 text-2xl" /> },
          { label: 'Available Rooms (%)', value: `${stats.availableRoomsPercentage}%`, icon: <FaDoorOpen className="text-green-600 text-2xl" /> },
          { label: 'Unavailable Rooms', value: stats.totalRooms - stats.availableRooms, icon: <FaDoorClosed className="text-red-600 text-2xl" /> },
          { label: 'Unavailable Rooms (%)', value: `${stats.unavailableRoomsPercentage}%`, icon: <FaDoorClosed className="text-red-600 text-2xl" /> },
          { label: 'Users', value: stats.users, icon: <FaUsers className="text-indigo-600 text-2xl" /> },
          { label: 'Members', value: stats.members, icon: <FaUserCheck className="text-teal-600 text-2xl" /> },
          {
            label: 'Total Coupons',
            value: stats.coupons,
            icon: <FaTicketAlt className="text-yellow-600 text-2xl" />,
            span: true,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-gray-50 rounded-md p-4 shadow flex items-center justify-between gap-4 hover:scale-[1.02] transition duration-300 ${item.span ? 'col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2' : ''
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

export default AdminProfile;
