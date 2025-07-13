import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { FaEye, FaMoneyCheckAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const [agreement, setAgreement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState('');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [finalRent, setFinalRent] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
    }, []);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://aaponaloi-server.vercel.app/agreements/accepted/${user.email}`)
                .then(res => {
                    setAgreement(res.data);
                    setFinalRent(res.data?.rent);
                })
                .catch(() => toast.error('No accepted agreement found'))
                .finally(() => setLoading(false));
        }
    }, [user?.email]);

    const handleApplyCoupon = () => {
        if (!coupon.trim()) return;

        axios
            .get(`https://aaponaloi-server.vercel.app/coupons/${coupon}`)
            .then(res => {
                const percentage = res.data?.discount;
                if (percentage) {
                    const reduced = agreement.rent - (agreement.rent * (percentage / 100));
                    setDiscount(percentage);
                    setFinalRent(Math.round(reduced));
                    toast.success(`Coupon Applied: ${percentage}% off`);
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                toast.error('Invalid coupon code');
                setDiscount(0);
                setFinalRent(agreement.rent);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!month.trim()) {
            toast.error('Please enter a month');
            return;
        }

        const paymentData = {
            email: user.email,
            userName: agreement.userName,
            apartmentNo: agreement.apartmentNo,
            floor: agreement.floor,
            block: agreement.block,
            rent: finalRent,
            originalRent: agreement.rent,
            month,
            discountPercentage: discount,
        };

        try {
            setSubmitting(true);
            const res = await axios.post('https://aaponaloi-server.vercel.app/payments', paymentData);
            if (res.status === 201) {
                toast.success(`Payment of ৳${finalRent} for ${month} submitted successfully`);
                setMonth('');
                setCoupon('');
                setDiscount(0);
                setFinalRent(agreement.rent);
            }
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error('You have already paid for this month');
            } else {
                console.error(err);
                toast.error('Failed to submit payment');
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!agreement) return null;

    return (
        <div className="pt-15 lg:pl-10">
            <h2
                className="text-4xl pb-9 font-bold flex items-center gap-3 text-gray-800"
                data-aos="fade-down"
                data-aos-once="true"
            >
                <FaMoneyCheckAlt className="text-secondary" />
                Make <span className="text-secondary">Payment</span>
            </h2>

            <motion.div
                className="max-w-5xl p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Member Email" value={user.email} readOnly />
                    <Input label="Floor" value={agreement.floor} readOnly />
                    <Input label="Block Name" value={agreement.block} readOnly />
                    <Input label="Apartment No / Room No" value={agreement.apartmentNo} readOnly />
                    <Input label="Original Rent" value={`৳${agreement.rent}`} readOnly />

                    <Input
                        label="Month"
                        value={month}
                        placeholder="e.g., July 2025"
                        onChange={(e) => setMonth(e.target.value)}
                    />

                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Coupon Code</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Enter coupon"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                            />
                            <button
                                type="button"
                                onClick={handleApplyCoupon}
                                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-secondary transition duration-200"
                            >
                                Apply
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (window.location.pathname !== '/') {
                                        window.location.href = '/#coupons';
                                    } else {
                                        const el = document.getElementById('coupons');
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                }}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 flex items-center justify-center gap-2 transition duration-200"
                            >
                                <FaEye className="text-base" />
                                <span className="text-sm">Coupons</span>
                            </button>

                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Final Rent</label>
                        <input
                            type="text"
                            value={`৳${finalRent}`}
                            readOnly
                            className="w-full px-4 py-2 font-semibold text-green-600 border border-gray-300 rounded-lg focus:outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-2 px-4 bg-primary text-black hover:text-white rounded-lg font-semibold hover:bg-secondary transition duration-200 flex items-center justify-center ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? (
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                            ) : null}
                            {submitting ? 'Processing...' : 'Proceed to Pay'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const Input = ({ label, ...props }) => (
    <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
            {...props}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${props.readOnly ? 'bg-gray-100' : ''}`}
        />
    </div>
);

export default MakePayment;
