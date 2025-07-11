import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ScrollToTop from '../shared/ScrollToTop';

const RootLayout = () => {
    return (
        <div className=''>
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;