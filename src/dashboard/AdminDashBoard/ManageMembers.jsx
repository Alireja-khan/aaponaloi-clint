import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';

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
    <div className="py-15 max-w-5xl lg:pl-10">

      <h2
        className="text-4xl pb-9 font-bold flex items-center gap-3"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"

      >
        <FaUsers className="text-secondary" />
        Manage <span className='text-secondary'>Members</span>
      </h2>

      {loading ? (''
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
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text uppercase tracking-wider">
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
