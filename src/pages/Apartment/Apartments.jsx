import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBuilding } from 'react-icons/fa';

const Apartments = () => {
    const [apartments, setApartments] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [hasApplied, setHasApplied] = useState(false);
    const [appliedApartmentNo, setAppliedApartmentNo] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const goToCoupons = () => {
        navigate('/', { state: { scrollTo: 'coupons' } });
    };

    // Fetch apartments
    useEffect(() => {
        AOS.init({ duration: 800, once: false });
        AOS.refresh();

        const fetchApartments = async () => {
            try {
                setLoading(true);
                const res = await axios.get('https://aaponaloi-server.vercel.app/apartments');
                setApartments(res.data);
                setFiltered(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch apartments:', err);
                setLoading(false);
            }
        };
        fetchApartments();
    }, []);

    // Check if user has applied
    useEffect(() => {
        const checkUserAgreement = async () => {
            if (user?.email) {
                try {
                    const res = await axios.get(`https://aaponaloi-server.vercel.app/agreements?email=${user.email}`);
                    if (res.data.hasApplied) {
                        setHasApplied(true);
                        setAppliedApartmentNo(res.data.appliedApartment);
                    }
                } catch (err) {
                    console.error('Failed to check agreement status:', err);
                }
            }
        };
        checkUserAgreement();
    }, [user?.email]);

    // Search handler
    const handleSearch = (e) => {
        e.preventDefault();
        const min = Number(minRent) || 0;
        const max = Number(maxRent) || Infinity;

        let results = apartments.filter((apt) => apt.rent >= min && apt.rent <= max);

        if (sortOrder === 'asc') results.sort((a, b) => a.rent - b.rent);
        if (sortOrder === 'desc') results.sort((a, b) => b.rent - a.rent);

        setFiltered(results);
        setCurrentPage(1);
        AOS.refresh();
    };

    // Sorting handler
    const handleSort = (order) => {
        setSortOrder(order);

        const sorted = [...filtered].sort((a, b) =>
            order === 'asc' ? a.rent - b.rent : b.rent - a.rent
        );
        setFiltered(sorted);
        setCurrentPage(1);
    };

    // Apply for agreement
    const handleAgreement = async (apt) => {
        if (!user) return navigate('/login');
        if (hasApplied) return toast.warn('You have already applied for one apartment.');
        if (apt.isBooked) return toast.error('This apartment is already booked.');

        const agreementData = {
            userName: user.displayName || 'Anonymous',
            email: user.email,
            floor: apt.floor,
            block: apt.block,
            apartmentNo: apt.apartmentNo,
            rent: apt.rent,
        };

        try {
            const res = await axios.post('https://aaponaloi-server.vercel.app/agreements', agreementData);
            if (res.status === 201) {
                toast.success('Agreement submitted successfully!');
                setHasApplied(true);
                setAppliedApartmentNo(apt.apartmentNo);
            }
        } catch (err) {
            if (err.response?.status === 409) {
                toast.warn('You have already applied or this apartment is taken.');
            } else {
                toast.error('Failed to submit agreement.');
            }
        }
    };

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentApartments = filtered.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-primary/20">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="bg-primary/20 mt-15">
            <div className="max-w-screen-2xl mx-auto min-h-screen font-sans">

                {/* Header */}
                <div className="relative z-10 flex flex-col pt-20 items-center justify-center h-full text-center px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                        <FaBuilding className="text-secondary text-4xl sm:text-5xl" />
                        Find Your <span className="text-secondary ml-1">Dream Apartment</span>
                    </h2>
                    <p className="text-gray-800 text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl font-light">
                        Comfort, security, and elegance — all thoughtfully designed to give you a home that feels Aapon Ghor.
                    </p>
                </div>

                {/* Search + Sort */}
                <div className="flex  justify-between gap-4 mt-10 mb-10 px-4 sm:px-6  mx-auto">

                    <div>
                        <form className="flex flex-wrap gap-4 w-full sm:w-auto" onSubmit={handleSearch}>
                            <input
                                type="number"
                                placeholder="Min Rent"
                                className="w-full sm:w-40 px-4 py-2 rounded-md border border-gray-900 shadow-sm focus:ring-2 focus:ring-primary outline-none"
                                value={minRent}
                                onChange={(e) => setMinRent(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Max Rent"
                                className="w-full sm:w-40 px-4 py-2 rounded-md border border-gray-900 shadow-sm focus:ring-2 focus:ring-primary outline-none"
                                value={maxRent}
                                onChange={(e) => setMaxRent(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-primary px-6 py-2 rounded-md font-semibold hover:bg-secondary hover:text-white transition"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="flex gap-3 mt-4 sm:mt-0">
                        <button
                            onClick={() => handleSort('asc')}
                            className={`px-4 py-2 font-semibold hover:bg-secondary rounded-md transition ${sortOrder === 'asc' ? 'bg-primary hover:text-white' : ' bg-primary  hover:bg-primary hover:text-white'}`}
                        >
                            Price Low → High
                        </button>
                        <button
                            onClick={() => handleSort('desc')}
                            className={`px-4 py-2 font-semibold hover:bg-secondary rounded-md transition ${sortOrder === 'desc' ? 'bg-primary hover:text-white' : ' bg-primary  hover:bg-primary hover:text-white'}`}
                        >
                            Price High → Low
                        </button>
                    </div>

                </div>

                {/* Apartments List */}
                <div className="mx-auto px-4 grid grid-cols-1 gap-12 pb-16">
                    {currentApartments.length > 0 ? (
                        currentApartments.map((apt, i) => {
                            const imgLeft = i % 2 === 0;
                            const flexDir = imgLeft ? 'lg:flex-row' : 'lg:flex-row-reverse';
                            const textAlign = imgLeft ? 'text-left items-start' : 'text-right items-end';
                            const badgeAlign = imgLeft ? 'items-start' : 'items-end';
                            const btnAlign = imgLeft ? '' : 'justify-end';
                            const isDisabled = hasApplied || apt.isBooked;

                            let buttonText = 'Apply for Agreement';
                            if (hasApplied) {
                                buttonText = apt.apartmentNo === appliedApartmentNo ? '✅ You Applied Here' : 'Already Applied';
                            } else if (apt.isBooked) {
                                buttonText = 'Booked';
                            }

                            return (
                                <div
                                    key={apt._id}
                                    className={`rounded-2xl overflow-hidden flex flex-col gap-4 ${flexDir} items-center lg:items-stretch`}
                                    data-aos={imgLeft ? 'fade-right' : 'fade-left'}
                                    data-aos-duration="700"
                                    data-aos-delay={i * 100}
                                >
                                    <img
                                        src={apt.image}
                                        alt={`Apartment ${apt.apartmentNo}`}
                                        className="w-full h-72 sm:h-80 md:h-96 lg:w-1/2 object-cover"
                                    />
                                    <div className={`w-full lg:w-1/2 p-6 lg:p-8 flex flex-col gap-2 ${textAlign}`}>
                                        <div>
                                            <p className="text-2xl uppercase font-medium mb-1">Apartment {apt.apartmentNo}</p>
                                            <h2 className="text-xl font-semibold text-secondary mb-2">৳{apt.rent} / month</h2>
                                            <p className="text-gray-600 text-sm mb-4 max-w-md">{apt.description}</p>
                                            <div className={`flex flex-col gap-2 ${badgeAlign} text-sm text-[#222222] mb-4`}>
                                                <span className="bg-accent text-gray-800 px-3 py-1 rounded-full shadow-sm"><strong>Floor:</strong> {apt.floor}</span>
                                                <span className="bg-accent text-gray-800 px-3 py-1 rounded-full shadow-sm"><strong>Block:</strong> {apt.block}</span>
                                                <span className="bg-accent text-gray-800 px-3 py-1 rounded-full shadow-sm"><strong>Facing:</strong> {apt.facing}</span>
                                                <span className="bg-accent text-gray-800 px-3 py-1 rounded-full shadow-sm"><strong>Size:</strong> {apt.sizeSqFt} sqft</span>
                                                <span className="bg-accent text-gray-800 px-3 py-1 rounded-full shadow-sm"><strong>Balcony:</strong> {apt.balcony ? 'Yes' : 'No'}</span>
                                            </div>
                                        </div>
                                        <div className={`flex flex-wrap gap-3 mt-4 ${btnAlign}`}>
                                            <button
                                                onClick={goToCoupons}
                                                className="px-5 py-2 text-sm font-medium bg-white text-secondary border rounded-md hover:bg-primary hover:text-black transition-all"
                                            >
                                                Check Coupons
                                            </button>
                                            <button
                                                onClick={() => handleAgreement(apt)}
                                                disabled={isDisabled}
                                                className={`px-5 py-2 text-sm font-medium rounded-md transition-all ${isDisabled ? buttonText.includes('✅') ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-gray-400 text-white cursor-not-allowed' : 'bg-primary hover:bg-white hover:text-secondary'}`}
                                            >
                                                {buttonText}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
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
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border font-medium transition-all duration-200 ${currentPage === i + 1 ? 'bg-secondary text-white' : 'bg-white text-gray-800 border-gray-300 hover:bg-primary'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Apartments;
