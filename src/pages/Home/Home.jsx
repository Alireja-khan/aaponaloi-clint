import React, { useEffect } from 'react';
import Banner from './Banner';
import AboutBuilding from './AboutBuilding';
import CouponsSection from './CouponsSection ';
import LocationSection from './LocationSection';
import FAQSection from './FAQsection';
import StatsSection from './StatsSection';
import { useLocation } from 'react-router';

const Home = () => {

    const location = useLocation();

    useEffect(() => {
        const scrollTarget = location.state?.scrollTo || location.hash?.replace('#', '');
        if (scrollTarget) {
            const el = document.getElementById(scrollTarget);
            if (el) {
                // Add a slight delay in case component renders a bit later
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    }, [location]);

    return (
        <div className='bg-primary/20'>
            <Banner></Banner>
            <div className=' max-w-screen-2xl mx-auto'>
                <AboutBuilding></AboutBuilding>
                <FAQSection></FAQSection>
                <CouponsSection></CouponsSection>
                <LocationSection></LocationSection>
                <StatsSection></StatsSection>
            </div>
        </div>
    );
};

export default Home;