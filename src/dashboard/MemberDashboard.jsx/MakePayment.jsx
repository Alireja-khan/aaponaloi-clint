import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const [agreement, setAgreement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState('');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [finalRent, setFinalRent] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:5000/agreements/accepted/${user.email}`)
                .then(res => {
                    setAgreement(res.data);
                    setFinalRent(res.data?.rent);
                })
                .catch(() => setError('No accepted agreement found'))
                .finally(() => setLoading(false));
        }
    }, [user?.email]);

    const handleApplyCoupon = () => {
        if (!coupon) return;

        axios
            .get(`http://localhost:5000/coupons/${coupon}`)
            .then(res => {
                const percentage = res.data?.discount;
                if (percentage) {
                    const reduced = agreement.rent - (agreement.rent * (percentage / 100));
                    setDiscount(percentage);
                    setFinalRent(Math.round(reduced));
                    setError('');
                } else {
                    setError('Invalid coupon code');
                }
            })
            .catch(() => {
                setError('Invalid coupon code');
                setDiscount(0);
                setFinalRent(agreement.rent);
            });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        if (!month) return setError('Please enter a month');

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
            const res = await axios.post('http://localhost:5000/payments', paymentData);
            if (res.status === 201) {
                alert(`✅ Payment of ৳${finalRent} for ${month} submitted successfully`);
                // Optionally reset form or navigate
            }
        } catch (err) {
            if (err.response?.status === 409) {
                setError('❌ You have already paid for this month');
            } else {
                console.error(err);
                setError('❌ Failed to submit payment');
            }
        }
    };


    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!agreement) return <div className="text-center text-red-500 py-10">{error || 'Agreement not found'}</div>;

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow mt-10">
            <h2 className="text-3xl font-bold text-[#D9822B] mb-6">Make Payment</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="font-semibold">Member Email</label>
                    <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Floor</label>
                    <input type="text" value={agreement.floor} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Block Name</label>
                    <input type="text" value={agreement.block} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Apartment No / Room No</label>
                    <input type="text" value={agreement.apartmentNo} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Original Rent</label>
                    <input type="text" value={`৳${agreement.rent}`} readOnly className="input input-bordered w-full" />
                </div>

                <div>
                    <label className="font-semibold">Month</label>
                    <input
                        type="text"
                        placeholder="Enter month (e.g., July 2025)"
                        className="input input-bordered w-full"
                        value={month}
                        onChange={e => setMonth(e.target.value)}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="font-semibold">Coupon Code</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            className="input input-bordered flex-1"
                            value={coupon}
                            onChange={e => setCoupon(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleApplyCoupon}
                            className="btn bg-[#D9822B] text-white"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                {discount > 0 && (
                    <p className="md:col-span-2 text-green-600 mt-2">✅ Coupon Applied: {discount}% off</p>
                )}

                <div className="md:col-span-2">
                    <label className="font-semibold">Final Rent</label>
                    <input
                        type="text"
                        value={`৳${finalRent}`}
                        readOnly
                        className="input input-bordered w-full text-green-700 font-semibold"
                    />
                </div>

                {error && (
                    <p className="md:col-span-2 text-red-500">{error}</p>
                )}

                <div className="md:col-span-2">
                    <button type="submit" className="btn bg-[#D9822B] text-white w-full">
                        Proceed to Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MakePayment;
