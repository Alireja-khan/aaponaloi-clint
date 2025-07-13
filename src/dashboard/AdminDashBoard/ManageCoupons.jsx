import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPlus, FaTimes, FaTicketAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import noFound from '../../assets/images/Empty-cuate.png';
import { VscEmptyWindow } from 'react-icons/vsc';

const baseURL = 'http://localhost:5000/coupons';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        code: '',
        discount: '',
        description: '',
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const { data } = await axios.get(baseURL);
            setCoupons(data);
        } catch {
            toast.error('Failed to load coupons');
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const resetForm = () => {
        setFormData({ code: '', discount: '', description: '' });
        setEditId(null);
    };

    const openModal = (coupon = null) => {
        if (coupon) {
            setEditId(coupon._id);
            setFormData({
                code: coupon.code,
                discount: coupon.discount,
                description: coupon.description,
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        resetForm();
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { code, discount, description } = formData;
        if (!code || !discount || !description) {
            toast.error('All fields are required');
            return;
        }

        try {
            if (editId) {
                await axios.put(`${baseURL}/${editId}`, formData);
                toast.success('Coupon updated');
            } else {
                await axios.post(baseURL, formData);
                toast.success('Coupon added');
            }
            fetchCoupons();
            closeModal();
        } catch {
            toast.error('Failed to save coupon');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action will permanently delete the coupon.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${baseURL}/${id}`);
                await fetchCoupons();
                Swal.fire('Deleted!', 'Coupon has been removed.', 'success');
            } catch {
                Swal.fire('Error', 'Failed to delete the coupon.', 'error');
            }
        }
    };

    return (
        // inside return(...)

        <div className="pt-14 lg:pl-10 px-4 sm:px-6 lg:px-0">

            <div className="flex flex-col gap-3 pb-6 sm:pb-8 sm:flex-row sm:items-center sm:justify-between">
                <h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-2 text-gray-800"
                    data-aos="fade-down"
                >
                    <FaTicketAlt className="text-secondary" />
                    Manage <span className="text-secondary">Coupons</span>
                </h2>

                <div className="sm:ml-auto sm:mt-0 mt-2 sm:flex-shrink-0">
                    <button
                        onClick={() => openModal()}
                        className="px-4 py-2 bg-primary hover:text-white text-sm font-medium rounded-md hover:bg-secondary transition"
                    >
                        <FaPlus className="inline-block mr-2" />
                        Add Coupon
                    </button>
                </div>
            </div>


            <motion.div
                className="max-w-5xl p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {loading ? (
                    ''
                ) : coupons.length === 0 ? (
                    <div className="text-center py-10" data-aos="fade-up">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <VscEmptyWindow className="text-4xl text-gray-400" />
                            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-500">
                                No Coupons Available
                            </h1>
                        </div>
                        <div className="flex justify-center">
                            <img src={noFound} className="w-52" alt="No Data" />
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">Code</th>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">Discount</th>
                                    <th className="px-4 py-3 text-left whitespace-nowrap">Description</th>
                                    <th className="px-4 py-3 text-center whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {coupons.map((coupon, i) => (
                                    <motion.tr
                                        key={coupon._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-orange-50 transition"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{coupon.code}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{coupon.discount}%</td>
                                        <td className="px-4 py-3 text-gray-600 max-w-[150px] truncate" title={coupon.description}>
                                            {coupon.description}
                                        </td>
                                        <td className="px-4 py-3 flex justify-center gap-2 whitespace-nowrap">
                                            <button
                                                onClick={() => openModal(coupon)}
                                                className="px-4 py-1 bg-primary hover:text-white rounded hover:bg-secondary transition text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(coupon._id)}
                                                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>

            {/* Modal unchanged */}
        </div>

    );
};

export default ManageCoupons;
