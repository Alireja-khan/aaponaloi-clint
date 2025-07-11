import React from 'react';
import Banner from './Banner';
import AboutBuilding from './AboutBuilding';
import CouponsSection from './CouponsSection ';
import LocationSection from './LocationSection';

const Home = () => {
    return (
        <div className='bg-primary/20'>
            <Banner></Banner>
            <div className=' max-w-screen-2xl mx-auto'>
                <AboutBuilding></AboutBuilding>
                <CouponsSection></CouponsSection>
                <LocationSection></LocationSection>
            </div>
        </div>
    );
};

export default Home;