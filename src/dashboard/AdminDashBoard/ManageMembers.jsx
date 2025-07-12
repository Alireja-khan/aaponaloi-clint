import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true });
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/users');
      if (Array.isArray(res.data)) {
        const filtered = res.data.filter(user => user.role === 'member');
        setMembers(filtered);
      } else {
        setMembers([]);
        toast.error('Invalid data format from server');
      }
    } catch (error) {
      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (email) => {
    const confirm = window.confirm('Are you sure you want to remove this member?');
    if (!confirm) return;

    try {
      await axios.patch(`http://localhost:5000/users/${email}`, {
        role: 'user',
      });
      toast.success('Member demoted to user');
      fetchMembers();
    } catch {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Manage Members</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      ) : members.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No members found.</p>
      ) : (
        <motion.div
          className="overflow-x-auto rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member, i) => (
                <motion.tr
                  key={member._id || member.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">
                    {member.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleRemove(member.email)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition"
                    >
                      Remove Access
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default ManageMembers;
