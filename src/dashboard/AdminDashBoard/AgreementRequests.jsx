import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AgreementRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh(); // Fixes animation not triggering on refresh
    }, []);

    useEffect(() => {
        axios
            .get('https://aaponaloi-server.vercel.app/all-agreements')
            .then((res) => {
                const pending = res.data.filter((req) => req.status === 'pending');
                setRequests(pending);
            })
            .catch((err) => console.error('Error fetching agreements:', err))
            .finally(() => setLoading(false));
    }, []);

    const handleDecision = async (id, email, action) => {
        const status = 'checked';
        const approve = action === 'accept';

        try {
            await axios.patch(`https://aaponaloi-server.vercel.app/agreements/respond/${id}`, {
                status,
                userEmail: email,
                approve,
            });

            Swal.fire('Success', `Agreement ${approve ? 'accepted' : 'rejected'}`, 'success');
            setRequests((prev) => prev.filter((req) => req._id !== id));
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="pt-14 lg:pl-10">
            <h2
                className="text-2xl sm:text-3xl lg:text-4xl pb-6 sm:pb-8 font-bold flex flex-wrap items-center gap-2 sm:gap-3 text-gray-800"
                data-aos="fade-down"
                data-aos-duration="800"
                data-aos-easing="ease-in-out"
            >
                <FaHandshake className="text-secondary" />
                Agreement <span className="text-secondary">Requests</span>
            </h2>


            <motion.div
                className="max-w-5xl p-6 bg-white rounded-xl shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {loading ? (
                    ''
                ) : requests.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">No pending agreement requests.</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Floor</th>
                                    <th className="px-4 py-3">Block</th>
                                    <th className="px-4 py-3">Apt No</th>
                                    <th className="px-4 py-3">Rent</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {requests.map((req, i) => (
                                    <motion.tr
                                        key={req._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-orange-50 transition"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-800">{req.name || 'N/A'}</td>
                                        <td className="px-4 py-3 text-gray-600">{req.email}</td>
                                        <td className="px-4 py-3">{req.floor}</td>
                                        <td className="px-4 py-3">{req.block}</td>
                                        <td className="px-4 py-3">{req.apartmentNo}</td>
                                        <td className="px-4 py-3 text-green-700 font-semibold">${req.rent}</td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(req.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-4 py-3 flex justify-center gap-2">
                                            <button
                                                onClick={() => handleDecision(req._id, req.email, 'accept')}
                                                className="px-4 py-1 bg-primary hover:text-white rounded hover:bg-secondary transition"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleDecision(req._id, req.email, 'reject')}
                                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                            >
                                                Reject
                                            </button>
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
