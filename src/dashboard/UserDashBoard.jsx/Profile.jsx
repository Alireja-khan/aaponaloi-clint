import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-[#D9822B]">My Profile</h1>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={user?.photoURL || 'https://via.placeholder.com/100'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold">{user?.displayName || 'Anonymous User'}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="text-gray-700 space-y-2">
        <p>
          <strong>Agreement Accept Date:</strong> none
        </p>
        <p>
          <strong>Rented Apartment Info:</strong> none
        </p>
      </div>
    </div>
  );
};

export default Profile;
