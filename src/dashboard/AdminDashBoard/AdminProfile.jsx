import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import {
  FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaBed,
  FaDoorOpen,
  FaDoorClosed,
  FaUsers,
  FaUserCheck,
  FaTicketAlt
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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [apartmentsRes, usersRes, membersRes, couponsRes] = await Promise.all([
          axios.get('http://localhost:5000/apartments'),
          axios.get('http://localhost:5000/users'),
          axios.get('http://localhost:5000/members'),
          axios.get('http://localhost:5000/coupons'),
        ]);

        const allRooms = apartmentsRes.data;
        const availableRooms = allRooms.filter(room => room.available === true);

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
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>


      <div className="bg-secondary/80 text-white rounded-xl overflow-hidden max-w-5xl my-10 flex shadow-lg">
        {/* Left: Image Section */}
        <div
          className="w-1/2 bg-primary/70 p-6 flex items-center justify-center"
          data-aos="fade-right"
        >
          <img
            src={user?.photoURL || 'https://via.placeholder.com/200'}
            alt="Admin"
            className="w-48 h-48 rounded-lg object-cover border-4 border-secondary"
          />
        </div>

        {/* Right: Info Section */}
        <div
          className="w-1/2 p-8 flex flex-col justify-between"
          data-aos="fade-left"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">{user?.displayName || 'Admin Name'}</h1>
            <h2 className="text-lg mb-4">Admin / Lead Manager</h2>

            <p className="text-gray-100 text-md leading-relaxed mb-6">
              {user?.bio ||
                "This admin manages core operations, oversees system performance, and ensures platform stability and efficiency for all users."}
            </p>

            <div className="space-y-2 text-md">
              <p className="flex items-center gap-2 text-white">
                <FaMapMarkerAlt className="text-lime-400" />
                <span className="font-semibold">Location:</span> {user?.location || 'City, Country'}
              </p>
              <p className="flex items-center gap-2 text-white">
                <FaPhoneAlt className="text-green-400" />
                <span className="font-semibold">Phone:</span> {user?.phone || 'Not provided'}
              </p>
              <p className="flex items-center gap-2 text-white">
                <FaEnvelope className="text-blue-400" />
                <span className="font-semibold">Email:</span> {user?.email || 'Not provided'}
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex gap-4 text-lg">
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



      <div className="rounded-lg max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {[
          {
            label: 'Total Rooms',
            value: stats.totalRooms,
            icon: <FaBed className="text-white text-2xl" />,
            aos: 'fade-up',
          },
          {
            label: 'Available Rooms',
            value: stats.availableRooms,
            icon: <FaDoorOpen className="text-white text-2xl" />,
            aos: 'fade-up',
          },
          {
            label: 'Available Rooms (%)',
            value: `${stats.availableRoomsPercentage}%`,
            icon: <FaDoorOpen className="text-white text-2xl" />,
            aos: 'fade-up',
          },
          {
            label: 'Unavailable Rooms',
            value: stats.totalRooms - stats.availableRooms,
            icon: <FaDoorClosed className="text-white text-2xl" />,
            aos: 'fade-up',
          },
          {
            label: 'Unavailable Rooms (%)',
            value: `${stats.unavailableRoomsPercentage}%`,
            icon: <FaDoorClosed className="text-white text-2xl" />,
            aos: 'fade-up',
          },
          {
            label: 'Users',
            value: stats.users,
            icon: <FaUsers className="text-white text-2xl" />,
            aos: 'fade-up',
          },
          {
            label: 'Members',
            value: stats.members,
            icon: <FaUserCheck className="text-white text-2xl" />,
            aos: 'fade-up',
          },
          {
            label: 'Total Coupons',
            value: stats.coupons,
            icon: <FaTicketAlt className="text-white text-2xl" />,
            span: true,
            aos: 'fade-up',
          }
        ].map((item, index) => (
          <div
            key={index}
            className={`bg-secondary/80 rounded-md p-4 shadow flex items-center justify-between gap-4 hover:scale-[1.02] transition duration-300 ${item.span ? 'col-span-1 sm:col-span-2 lg:col-span-2' : ''}`}
            data-aos={item.aos}
            data-aos-delay={index * 100}
          >
            <div>
              <p className="text-md font-semibold text-white">{item.label}</p>
              <p className="text-xl font-bold text-white">{item.value}</p>
            </div>
            {item.icon}
          </div>
        ))}
      </div>


    </div>
  );
};

export default AdminProfile;
