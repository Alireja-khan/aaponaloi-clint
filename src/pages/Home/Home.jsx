import React from 'react';
import Banner from './Banner';
import AboutBuilding from './AboutBuilding';
import CouponsSection from './CouponsSection ';
import LocationSection from './LocationSection';
import FAQSection from './FAQsection';
import StatsSection from './StatsSection';

const Home = () => {
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