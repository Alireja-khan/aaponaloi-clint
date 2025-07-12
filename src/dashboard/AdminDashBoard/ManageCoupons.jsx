import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPlus, FaEdit, FaTrashAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true });
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
    if (!window.confirm('Delete this coupon?')) return;
    try {
      await axios.delete(`${baseURL}/${id}`);
      toast.success('Coupon removed');
      fetchCoupons();
    } catch {
      toast.error('Failed to delete coupon');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Manage Coupons</h2>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add Coupon
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 text-blue-600 border-4 border-blue-300 border-t-transparent rounded-full" />
        </div>
      ) : coupons.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No coupons found.</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Discount (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-blue-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coupons.map((coupon, i) => (
                <motion.tr
                  key={coupon._id}
                  className="hover:bg-blue-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{coupon.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{coupon.discount}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{coupon.description}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button onClick={() => openModal(coupon)} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(coupon._id)} className="text-red-600 hover:text-red-800">
                      <FaTrashAlt />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                <FaTimes />
              </button>
              <h3 className="text-xl font-semibold mb-4">
                {editId ? 'Edit Coupon' : 'Add Coupon'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInput}
                  placeholder="Coupon Code"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInput}
                  placeholder="Discount (%)"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInput}
                  placeholder="Coupon Description"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {editId ? 'Update' : 'Submit'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCoupons;
