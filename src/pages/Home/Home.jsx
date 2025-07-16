import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import AboutBuilding from './AboutBuilding';
import CouponsSection from './CouponsSection ';
import LocationSection from './LocationSection';
import FAQSection from './FAQsection';
import StatsSection from './StatsSection';
import { useLocation } from 'react-router';

const Home = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for 500ms (or your real loading)
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) { // Only run after loading completes
            const scrollTarget = location.state?.scrollTo || location.hash?.replace('#', '');
            if (scrollTarget) {
                const el = document.getElementById(scrollTarget);
                if (el) {
                    setTimeout(() => {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [location, loading]); // depend also on loading state

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-primary/20">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    return (
        <div className='bg-primary/20'>
            <Banner />
            <div className='max-w-screen-2xl mx-auto'>
                <AboutBuilding />
                <FAQSection />
                <CouponsSection />
                <LocationSection />
                <StatsSection />
            </div>
        </div>
    );
};

export default Home;
