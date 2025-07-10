// pages/AdminDashboard/AdminProfile.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#D9822B]">Admin Profile</h1>
      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL || 'https://via.placeholder.com/100'}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{user?.displayName}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
