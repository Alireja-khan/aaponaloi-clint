import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ScrollToTop from '../shared/ScrollToTop';

const RootLayout = () => {
    const location = useLocation();

    // Hide navbar on any dashboard route
    const hideNavbar = location.pathname.startsWith('/dashboard') ||
        location.pathname.startsWith('/admin-dashboard') ||
        location.pathname.startsWith('/member-dashboard') ||
        location.pathname.startsWith('/user-dashboard');

    return (
        <div>
            <ScrollToTop />
            {!hideNavbar && <Navbar />}
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;
