import React, { useEffect, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router';
import Banner from './Banner';
import AboutBuilding from './AboutBuilding';
import CouponsSection from './CouponsSection ';
import LocationSection from './LocationSection';
import FAQSection from './FAQsection';
import StatsSection from './StatsSection';
import TestimonialsSection from './TestimonialsSection';

const Home = () => {
    const location = useLocation();
    const { setBannerLoading } = useOutletContext(); // comes from RootLayout
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) {
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
    }, [location, loading]);

    const handleFirstImageLoad = () => {
        setBannerLoading(false); // Tell navbar banner is loaded
    };

    useEffect(() => {
        setBannerLoading(true); // Force black text until banner image loads
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-primary/20">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="bg-primary/20">
            <Banner onFirstImageLoad={handleFirstImageLoad} />
            <div className=" mx-auto">
                <AboutBuilding />
                <FAQSection />
                <TestimonialsSection></TestimonialsSection>
                <CouponsSection />
                <LocationSection />
                <StatsSection />
            </div>
        </div>
    );
};

export default Home;
