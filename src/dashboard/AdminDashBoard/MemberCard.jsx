import React from 'react';
import { motion } from 'framer-motion';
import { FaUserAlt, FaEnvelope, FaPhone, FaBuilding, FaUserShield, FaTrashAlt, FaUserCog } from 'react-icons/fa';

const MemberCard = ({ user, index, onRoleChange }) => {
  // Safely handle undefined user object
  if (!user) {
    return (
      <div className="bg-primary/20 rounded-xl shadow-sm p-6 border">
        <div className="text-center text-gray-500">
          Invalid user data
        </div>
      </div>
    );
  }

  // Provide default values
  const userData = {
    name: user.name || 'No Name Provided',
    email: user.email || 'No Email',
    phone: user.phone ,
    apartment: user.apartment || 'Not Assigned',
    status: user.status || 'unknown',
    role: user.role || 'user',
    contact: user.contact || 'Not Available'
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return '';
      case 'member': return '';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-primary/20 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`h-12 w-12  bg-primary  rounded-full bg-${getRoleColor(userData.role)}-100 flex items-center justify-center text-${getRoleColor(userData.role)}-600`}>
              <FaUserAlt className="text-2xl  " />
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-xl text-gray-800">{userData.name}</h3>
              <span className={` py-1 text-md rounded-full bg-${getRoleColor(userData.role)}-100 text-${getRoleColor(userData.role)}-800`}>
                {userData.role}
              </span>
            </div>
          </div>
          <span className={`px-2 py-1 text-md rounded-full 
            ${userData.status === 'active' ? 'bg-green-100 text-green-800' : 'active'}`}>
            {'active'}
          </span>
        </div>

        <div className="space-y-3 text-md text-gray-600">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-secondary" />
            <span>{userData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-secondary" />
            <span>{userData.contact}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-secondary" />
            <span>Unit {userData.apartment}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t flex flex-wrap gap-2">
          {userData.role !== 'admin' && (
            <button
              onClick={() => onRoleChange(userData.email, 'admin')}
              className={` hover:text-white flex items-center gap-1 text-md px-3 py-1 rounded bg-primary hover:bg-secondary`}
              title="Make Admin"
            >
              <FaUserShield /> Admin
            </button>
          )}
          {userData.role !== 'member' && (
            <button
              onClick={() => onRoleChange(userData.email, 'member')}
              className={`  flex items-center gap-1 text-sm px-3 py-1 rounded bg-primary/50 hover:bg-secondary/50`}
              title="Make Member"
            >
              <FaUserAlt /> Member
            </button>
          )}
          {userData.role !== 'user' && (
            <button
              onClick={() => onRoleChange(userData.email, 'user')}
              className={` flex items-center gap-1 text-sm px-3 py-1 rounded bg-primary/20 hover:bg-secondary/20`}
              title="Make Regular User"
            >
              <FaUserCog /> User
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;