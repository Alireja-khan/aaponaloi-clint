import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discount: '',
        description: '',
    });

    const fetchCoupons = async () => {
        try {
            const res = await axios.get('http://localhost:5000/coupons');
            setCoupons(res.data);
        } catch (error) {
            toast.error('Failed to load coupons');
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleInput = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { code, discount, description } = formData;

        if (!code || !discount || !description) {
            toast.error('All fields are required');
            return;
        }

        try {
            await axios.post('http://localhost:5000/coupons', formData);
            toast.success('Coupon added successfully');
            setFormData({ code: '', discount: '', description: '' });
            setShowModal(false);
            fetchCoupons();
        } catch (error) {
            toast.error('Failed to add coupon');
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage Coupons</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Coupon
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Code</th>
                            <th className="px-4 py-2 border">Discount (%)</th>
                            <th className="px-4 py-2 border">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((c) => (
                            <tr key={c._id} className="border-t">
                                <td className="px-4 py-2 border">{c.code}</td>
                                <td className="px-4 py-2 border">{c.discount}%</td>
                                <td className="px-4 py-2 border">{c.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-4">Add Coupon</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="code"
                                placeholder="Coupon Code"
                                value={formData.code}
                                onChange={handleInput}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <input
                                type="number"
                                name="discount"
                                placeholder="Discount Percentage"
                                value={formData.discount}
                                onChange={handleInput}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <textarea
                                name="description"
                                placeholder="Coupon Description"
                                value={formData.description}
                                onChange={handleInput}
                                className="w-full p-2 border rounded mb-3"
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
