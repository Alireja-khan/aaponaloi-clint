import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPlus, FaTimes, FaTicketAlt, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import noFound from '../../assets/images/Empty-cuate.png';
import { VscEmptyWindow } from 'react-icons/vsc';

const baseURL = 'https://aaponaloi-server.vercel.app/coupons';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    description: '',
    validFrom: '',
    validUntil: '',
    minPurchase: '',
    maxDiscount: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(baseURL);
      setCoupons(data);
    } catch (error) {
      toast.error('Failed to load coupons');
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      code: '',
      discount: '',
      description: '',
      validFrom: '',
      validUntil: '',
      minPurchase: '',
      maxDiscount: ''
    });
    setEditId(null);
  };

  const openModal = (coupon = null) => {
    if (coupon) {
      setEditId(coupon._id);
      setFormData({
        code: coupon.code,
        discount: coupon.discount,
        description: coupon.description,
        validFrom: coupon.validFrom || '',
        validUntil: coupon.validUntil || '',
        minPurchase: coupon.minPurchase || '',
        maxDiscount: coupon.maxDiscount || ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

  const validateCoupon = () => {
    const { code, discount, description, validFrom, validUntil } = formData;
    
    if (!code || !discount || !description) {
      toast.error('Code, discount and description are required');
      return false;
    }

    if (validFrom && validUntil && new Date(validFrom) > new Date(validUntil)) {
      toast.error('Valid until date must be after valid from date');
      return false;
    }

    if (discount <= 0 || discount > 100) {
      toast.error('Discount must be between 1% and 100%');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCoupon()) return;

    try {
      if (editId) {
        await axios.put(`${baseURL}/${editId}`, formData);
        toast.success('Coupon updated successfully');
      } else {
        await axios.post(baseURL, formData);
        toast.success('Coupon created successfully');
      }
      fetchCoupons();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save coupon');
      console.error('Error saving coupon:', error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Coupon?',
      text: "This action cannot be undone. Are you sure?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${baseURL}/${id}`);
        await fetchCoupons();
        Swal.fire('Deleted!', 'Coupon has been removed.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete coupon', 'error');
        console.error('Error deleting coupon:', error);
      }
    }
  };

  const filteredCoupons = coupons.filter(coupon => 
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <span className="loading loading-bars loading-lg text-primary mb-4"></span>
          <p className="text-gray-600">Loading coupons...</p>
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
            className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3 text-gray-800"
            data-aos="fade-down"
          >
            <FaTicketAlt className="text-primary" />
            <span>Manage <span className="text-primary">Coupons</span></span>
          </h2>
          <p className="text-gray-600 mt-2">Create and manage discount coupons</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-primary hover:text-white hover:bg-secondary rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Add Coupon
          </button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className=" bg-primary/20 p-6 rounded-xl shadow-sm border border-secondary mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search coupons by code or description..."
              className="pl-10 pr-4 py-2 w-full border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="bg-primary font-semibold hover:bg-secondary hover:text-white text-gray-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            onClick={fetchCoupons}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Coupons Table */}
      <motion.div
        className="bg-primary/20 rounded-xl shadow-sm overflow-hidden border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {filteredCoupons.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
              <VscEmptyWindow className="text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700">No coupons found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm ? 'Try a different search term' : 'No coupons have been created yet'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => openModal()}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center gap-2 mx-auto"
              >
                <FaPlus /> Create First Coupon
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Validity</th>
                  <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="  divide-y divide-secondary">
                {filteredCoupons.map((coupon, i) => (
                  <motion.tr
                    key={coupon._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-primary/20 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{coupon.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-primary/50 rounded-full text-sm font-medium">
                        {coupon.discount}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm  max-w-xs truncate" title={coupon.description}>
                        {coupon.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {coupon.validFrom && coupon.validUntil ? (
                        <div className="text-sm text-gray-500">
                          {new Date(coupon.validFrom).toLocaleDateString()} - {new Date(coupon.validUntil).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm ">No expiration</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openModal(coupon)}
                          className=" p-2 rounded-full hover:bg-blue-50"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                          title="Delete"
                        >
                          <FaTrash />
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

      {/* Add/Edit Coupon Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 backdrop-blur-2xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-primary/20 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {editId ? 'Edit Coupon' : 'Create New Coupon'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code *</label>
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInput}
                        className="w-full border border-secondary rounded-lg px-3 py-2 "
                        placeholder="e.g. SUMMER20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage *</label>
                      <div className="relative">
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleInput}
                          className="w-full border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                          placeholder="e.g. 20"
                          min="1"
                          max="100"
                          required
                        />
                        <span className="absolute right-3 top-2 text-gray-500">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                      <input
                        type="date"
                        name="validFrom"
                        value={formData.validFrom}
                        onChange={handleInput}
                        className="w-full border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                      <input
                        type="date"
                        name="validUntil"
                        value={formData.validUntil}
                        onChange={handleInput}
                        className="w-full border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Purchase ($)</label>
                      <input
                        type="number"
                        name="minPurchase"
                        value={formData.minPurchase}
                        onChange={handleInput}
                        className="w-full border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        placeholder="No minimum"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Discount ($)</label>
                      <input
                        type="number"
                        name="maxDiscount"
                        value={formData.maxDiscount}
                        onChange={handleInput}
                        className="w-full border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        placeholder="No maximum"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInput}
                      className="w-full border border-secondary rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                      rows="3"
                      placeholder="Describe the coupon and any terms..."
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-secondary rounded-lg text-gray-700 hover:bg-primary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark hover:bg-secondary hover:text-white rounded-lg transition-colors"
                    >
                      {editId ? 'Update Coupon' : 'Create Coupon'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageCoupons;