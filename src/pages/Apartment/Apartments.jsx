import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Apartments = () => {
    const [apartments, setApartments] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 800, once: false });
        AOS.refresh();

        const fetchApartments = async () => {
            try {
                const res = await axios.get('http://localhost:5000/apartments');
                setApartments(res.data);
                setFiltered(res.data);
            } catch (err) {
                console.error('Failed to fetch apartments:', err);
            }
        };
        fetchApartments();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const min = Number(minRent) || 0;
        const max = Number(maxRent) || Infinity;
        const results = apartments.filter((apt) => apt.rent >= min && apt.rent <= max);
        setFiltered(results);
        setCurrentPage(1);
        AOS.refresh(); // Refresh AOS after filtering
    };

    const handleAgreement = async (apt) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const agreementData = {
            userName: user.displayName || 'Anonymous',
            email: user.email,
            floor: apt.floor,
            block: apt.block,
            apartmentNo: apt.apartmentNo,
            rent: apt.rent,
        };

        try {
            const res = await axios.post('http://localhost:5000/agreements', agreementData);
            if (res.status === 201) {
                toast.success('Agreement submitted successfully!');
            }
        } catch (err) {
            if (err.response?.status === 409) {
                toast.warn('You have already applied for one apartment.');
            } else {
                toast.error('Failed to submit agreement.');
            }
        }
    };

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentApartments = filtered.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e2e8f0] font-sans">
            <div
                className="relative z-10 flex flex-col pt-20 items-center justify-center h-full text-center px-6"
                data-aos="fade-up"
            >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">Find Your Dream Apartment</h1>
                <p className="text-lg max-w-xl mb-6">Comfort, security, and luxury—all in one place.</p>
                <button className="px-6 py-3 bg-[#222222] text-white rounded-full hover:bg-[#111] transition">
                    View Listings
                </button>
            </div>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="max-w-4xl mx-auto mt-16 mb-10 flex flex-wrap justify-center gap-4 px-6"
            >
                <input
                    type="number"
                    placeholder="Min Rent"
                    className="w-40 px-4 py-2 rounded-md border border-gray-900 shadow-sm focus:ring-2 focus:ring-[#D9822B] outline-none"
                    value={minRent}
                    onChange={(e) => setMinRent(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Rent"
                    className="w-40 px-4 py-2 rounded-md border border-gray-900 shadow-sm focus:ring-2 focus:ring-[#D9822B] outline-none"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-[#D9822B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#c6995a] transition"
                >
                    Search
                </button>
            </form>

            {/* Apartment Grid */}
            <div className="mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10 pb-16">
                {currentApartments.length > 0 ? (
                    currentApartments.map((apt, i) => (
                        <div
                            key={apt._id}
                            className={`rounded-2xl overflow-hidden flex flex-col sm:flex-row ${
                                i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                            } items-center`}
                            data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                            data-aos-duration="700"
                            data-aos-delay={i * 100}
                        >
                            <img
                                src={apt.image}
                                alt={`Apartment ${apt.apartmentNo}`}
                                className="w-full sm:w-1/2 h-96 object-cover sm:rounded-none"
                            />

                            <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                                <div>
                                    <p className="text-sm uppercase font-medium text-gray-500 mb-1">
                                        Apartment {apt.apartmentNo}
                                    </p>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                                        ৳{apt.rent} / month
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4">{apt.description}</p>

                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#222222] mb-4">
                                        <p>
                                            <strong>Floor:</strong> {apt.floor}
                                        </p>
                                        <p>
                                            <strong>Block:</strong> {apt.block}
                                        </p>
                                        <p>
                                            <strong>Facing:</strong> {apt.facing}
                                        </p>
                                        <p>
                                            <strong>Size:</strong> {apt.sizeSqFt} sqft
                                        </p>
                                        <p>
                                            <strong>Balcony:</strong> {apt.balcony ? 'Yes' : 'No'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-4">
                                    <button className="px-5 py-2 text-sm font-medium bg-[#D9822B] text-white rounded-full hover:bg-[#D9822B] transition-all">
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleAgreement(apt)}
                                        className="px-5 py-2 text-sm font-medium bg-[#222222] text-white rounded-full hover:bg-gray-900 transition-all"
                                    >
                                        Apply for Agreement
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400">No apartments found.</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 pb-20">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center border font-medium transition-all duration-200 ${
                                currentPage === i + 1
                                    ? 'bg-[#D9822B] text-white'
                                    : 'bg-white text-gray-800 border-gray-300 hover:bg-[#f3e8d3]'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Apartments;
