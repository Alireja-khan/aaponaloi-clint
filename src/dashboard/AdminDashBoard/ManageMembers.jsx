import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUsers, FaUserShield, FaSearch, FaUserAlt, FaEnvelope, FaPhone, FaBuilding, FaTrashAlt, FaUserCog } from 'react-icons/fa';
import { RiUserStarFill } from 'react-icons/ri';
import { GiModernCity } from 'react-icons/gi';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import MemberCard from './MemberCard';

const ManageMembers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'admins', 'members', 'users'
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    members: 0,
    users: 0,
    active: 0,
    premium: 0
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://aaponaloi-server.vercel.app/users');
      if (Array.isArray(res.data)) {
        setAllUsers(res.data);

        // Calculate stats
        const admins = res.data.filter(u => u.role === 'admin');
        const members = res.data.filter(u => u.role === 'member');
        const users = res.data.filter(u => u.role === 'user');

        setStats({
          total: res.data.length,
          admins: admins.length,
          members: members.length,
          users: users.length,
          active: members.filter(m => m.status === 'active').length,
          premium: members.filter(m => m.membership === 'premium').length
        });
      } else {
        setAllUsers([]);
        toast.error('Invalid data format from server');
      }
    } catch (error) {
      toast.error('Failed to load users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    const action = newRole === 'admin' ? 'promote to admin' :
      newRole === 'member' ? 'grant member access' :
        'revoke privileges';

    const result = await Swal.fire({
      title: `Confirm ${action}?`,
      text: `This will change the user's access privileges.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#EF4444',
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    try {
      await axios.patch(`https://aaponaloi-server.vercel.app/users/${email}`, {
        role: newRole,
      });
      toast.success(`User role updated successfully`);
      fetchUsers();
    } catch {
      toast.error('Failed to update user role');
    }
  };

  const getFilteredUsers = () => {
    let filtered = allUsers;

    // Filter by role tab
    if (activeTab === 'admins') {
      filtered = filtered.filter(u => u.role === 'admin');
    } else if (activeTab === 'members') {
      filtered = filtered.filter(u => u.role === 'member');
    } else if (activeTab === 'users') {
      filtered = filtered.filter(u => u.role === 'user');
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredUsers = getFilteredUsers();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <RiUserStarFill className="text-secondary" />
            <span>User <span className='text-secondary'>Management</span></span>
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all registered users of your apartment community
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 px-4 rounded-lg ${viewMode === 'grid' ? 'bg-secondary text-white ' : 'bg-primary'}`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 px-4 rounded-lg ${viewMode === 'list' ? 'bg-secondary text-white ' : 'bg-primary'}`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-primary/20 p-6 rounded-xl shadow-sm  -gray-100"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="">Total Users</p>
              <h3 className="text-3xl font-bold ">{stats.total}</h3>
            </div>
            <div className="p-3 rounded-full bg-primary ">
              <FaUsers className="text-2xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-primary/20 p-6 rounded-xl shadow-sm  -blue-100"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="">Admins</p>
              <h3 className="text-3xl font-bold ">{stats.admins}</h3>
            </div>
            <div className="p-3 rounded-full bg-primary ">
              <FaUserShield className="text-2xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-primary/20 p-6 rounded-xl shadow-sm  -green-100"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="">Members</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.members}</h3>
              <p className="text-sm  mt-1">
                {stats.active} active, {stats.premium} premium
              </p>
            </div>
            <div className="p-3 rounded-full bg-primary ">
              <FaUserAlt className="text-2xl" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-primary/20 p-6 rounded-xl shadow-sm  -purple-100"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="">Regular Users</p>
              <h3 className="text-3xl font-bold ">{stats.users}</h3>
            </div>
            <div className="p-3 rounded-full bg-primary ">
              <FaUserCog className="text-2xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-primary/20 p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Role Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-secondary text-white' : 'bg-primary '}`}
            >
              All Users
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'admins' ? 'bg-secondary text-white' : 'bg-primary '}`}
            >
              Admins
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'members' ? 'bg-secondary text-white' : 'bg-primary '}`}
            >
              Members
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-secondary text-white' : 'bg-primary '}`}
            >
              Regular Users
            </button>
          </div>

          {/* Search */}
          <div className="relative border border-primary rounded-2xl w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 w-full rounded-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Users Display */}
      {filteredUsers.length === 0 ? (
        <div className="bg-primary/20 p-12 rounded-xl shadow-sm text-center">
          <GiModernCity className="mx-auto text-5xl text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No users found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm ? 'Try a different search term' : `No ${activeTab === 'all' ? 'users' : activeTab} are currently registered`}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <MemberCard
              key={user._id || user.email}
              user={user}
              index={index}
              onRoleChange={handleRoleChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-primary/20 rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-black">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">Apartment</th>
                <th className="px-6 py-3 text-left text-sm font-medium  uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium  uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-primary/20 divide-y divide-secondary">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user._id || user.email}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-primary/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center ">
                        <FaUserAlt />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name || 'No Name'}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-primary' :
                        user.role === 'member' ? 'bg-primary/50' :
                          'bg-primary/20'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-md text-gray-900 flex items-center gap-2">
                      <FaEnvelope className="" /> {user.email}
                    </div>
                    {user.phone && (
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <FaPhone className="text-gray-400" /> {user.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.apartment ? (
                      <div className="text-md text-gray-900 flex items-center gap-2">
                        <FaBuilding className="" /> {user.apartment}
                      </div>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/20">
                        Not assigned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-primary/20'}`}>
                      {user.status || 'unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                    <div className="flex justify-end gap-2">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleRoleChange(user.email, 'admin')}
                          className=" bg-primary p-2 rounded-full mr-3"
                          title="Make Admin"
                        >
                          <FaUserShield />
                        </button>
                      )}
                      {user.role !== 'member' && (
                        <button
                          onClick={() => handleRoleChange(user.email, 'member')}
                          className="bg-primary p-2 rounded-full mr-3"
                          title="Make Member"
                        >
                          <FaUserAlt />
                        </button>
                      )}
                      {user.role !== 'user' && (
                        <button
                          onClick={() => handleRoleChange(user.email, 'user')}
                          className="bg-primary p-2 rounded-full  mr-3"
                          title="Make Regular User"
                        >
                          <FaUserCog />
                        </button>
                      )}
                      <button
                        onClick={() => handleRoleChange(user.email, 'user')}
                        className=""
                        title="Remove Privileges"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;