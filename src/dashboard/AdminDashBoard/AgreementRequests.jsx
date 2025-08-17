import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaHandshake, FaSearch, FaCalendarAlt, FaBuilding, FaHome, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import { RiBuilding2Line } from 'react-icons/ri';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AgreementRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'recent'
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        averageRent: 0
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        fetchAgreements();
    }, []);

    const fetchAgreements = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://aaponaloi-server.vercel.app/all-agreements');
            const pendingRequests = res.data.filter(req => req.status === 'pending');
            
            setRequests(pendingRequests);
            calculateStats(pendingRequests);
        } catch (err) {
            console.error('Error fetching agreements:', err);
            Swal.fire('Error', 'Failed to load agreement requests', 'error');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        const total = data.length;
        const pending = data.filter(req => req.status === 'pending').length;
        const averageRent = data.length > 0 
            ? Math.round(data.reduce((sum, req) => sum + (req.rent || 0), 0) / data.length)
            : 0;
            
        setStats({ total, pending, averageRent });
    };

    const handleDecision = async (id, email, action) => {
        const result = await Swal.fire({
            title: `Confirm ${action === 'accept' ? 'Approval' : 'Rejection'}`,
            text: `Are you sure you want to ${action === 'accept' ? 'approve' : 'reject'} this agreement?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: action === 'accept' ? '#10B981' : '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: `Yes, ${action === 'accept' ? 'Approve' : 'Reject'}`,
            cancelButtonText: 'Cancel'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.patch(`https://aaponaloi-server.vercel.app/agreements/respond/${id}`, {
                status: 'checked',
                userEmail: email,
                approve: action === 'accept',
            });

            Swal.fire(
                'Success', 
                `Agreement ${action === 'accept' ? 'approved' : 'rejected'} successfully`, 
                'success'
            );
            
            // Optimistic UI update
            setRequests(prev => prev.filter(req => req._id !== id));
            setStats(prev => ({
                ...prev,
                pending: prev.pending - 1,
                total: prev.total - 1
            }));
        } catch (error) {
            Swal.fire('Error', 'Failed to process request', 'error');
        }
    };

    const filteredRequests = requests.filter(req => {
        const matchesSearch = 
            req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.apartmentNo?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = 
            filter === 'all' || 
            (filter === 'pending' && req.status === 'pending') ||
            (filter === 'recent' && new Date(req.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col items-center">
                    <span className="loading loading-bars loading-lg text-primary mb-4"></span>
                    <p className="text-gray-500">Loading agreement requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-14 lg:pl-10 px-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold flex flex-wrap items-center gap-2 sm:gap-3 text-gray-800"
                        data-aos="fade-down"
                        data-aos-duration="800"
                        data-aos-easing="ease-in-out"
                    >
                        <FaHandshake className="text-secondary" />
                        <span>Agreement <span className="text-secondary">Requests</span></span>
                    </h2>
                    <p className="text-gray-600 mt-2">Manage tenant agreement applications</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-lg text-sm ${filter === 'all' ? 'bg-secondary text-white' : 'bg-primary text-gray-700'}`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => setFilter('pending')}
                        className={`px-3 py-1 rounded-lg text-sm ${filter === 'pending' ? 'bg-secondary text-white' : 'bg-primary text-gray-700'}`}
                    >
                        Pending
                    </button>
                    <button 
                        onClick={() => setFilter('recent')}
                        className={`px-3 py-1 rounded-lg text-sm ${filter === 'recent' ? 'bg-secondary text-white' : 'bg-primary text-gray-700'}`}
                    >
                        Recent
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div 
                    className="bg-primary/20 p-6 rounded-xl shadow-sm "
                    whileHover={{ y: -5 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Requests</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
                        </div>
                        <div className="p-3 rounded-full bg-primary">
                            <FaHandshake className="text-2xl" />
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="bg-primary/20 p-6 rounded-xl shadow-sm "
                    whileHover={{ y: -5 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Pending Approval</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stats.pending}</h3>
                        </div>
                        <div className="p-3 rounded-full bg-primary">
                            <FaCalendarAlt className="text-2xl" />
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="bg-primary/20 p-6 rounded-xl shadow-sm "
                    whileHover={{ y: -5 }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Average Rent</p>
                            <h3 className="text-3xl font-bold text-gray-800">${stats.averageRent}</h3>
                        </div>
                        <div className="p-3 rounded-full bg-primary">
                            <FaMoneyBillWave className="text-2xl" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Search and Filter */}
            <motion.div
                className="bg-primary/20 p-6 rounded-xl shadow-sm mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, email or apartment..."
                            className="pl-10 pr-4 py-2 w-full border border-secondary  rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        className="bg-primary hover:bg-secondary hover:text-white px-6 py-2 rounded-lg transition-colors w-full md:w-auto"
                        onClick={fetchAgreements}
                    >
                        Refresh
                    </button>
                </div>
            </motion.div>

            {/* Requests Table */}
            <motion.div
                className="bg-primary/20 rounded-xl shadow-sm overflow-hidden border border-secondary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {filteredRequests.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                            <FaHandshake className="text-2xl" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-700">No requests found</h3>
                        <p className="text-gray-500 mt-2">
                            {searchTerm ? 'Try a different search term' : 'There are currently no pending agreement requests'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-">
                            <thead className="bg-primary/20">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            <FaUser /> Applicant
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            <FaBuilding /> Property
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            <FaMoneyBillWave /> Rent
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            <FaCalendarAlt /> Date
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-secondary">
                                {filteredRequests.map((req, i) => (
                                    <motion.tr
                                        key={req._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-primary/20 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center ">
                                                    <FaUser />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium ">{req.name || 'N/A'}</div>
                                                    <div className="text-sm ">{req.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 flex items-center gap-1">
                                                <RiBuilding2Line className="" />
                                                Block {req.block}, Floor {req.floor}
                                            </div>
                                            <div className="text-sm  flex items-center gap-1 mt-1">
                                                <FaHome className="" />
                                                Apt {req.apartmentNo}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-secondary font-semibold">
                                            ${req.rent}
                                        </td>
                                        <td className="px-6 py-4 text-sm ">
                                            {new Date(req.createdAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleDecision(req._id, req.email, 'accept')}
                                                    className="px-4 py-2 bg-primary  hover:bg-secondary hover:text-white rounded-lg transition-colors flex items-center gap-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleDecision(req._id, req.email, 'reject')}
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AgreementRequests;