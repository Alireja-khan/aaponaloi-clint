import React from 'react';
import { Outlet } from 'react-router';
import AaponaloiLogo from '../shared/AaponaloiLogo';
import { motion } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="min-h-screen my-10 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center bg-white rounded-xl overflow-hidden">
            {/* Left Side */}
            <motion.div
                className="flex flex-col justify-center items-center p-8"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.20 }}
            >
                <div className="">
                    <AaponaloiLogo />
                </div>
                <div className='text-center -mt-20'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 ">Welcome to Aaponaloi</h2>
                    <p className="text-gray-600 text-center max-w-sm">
                        Aaponaloi is your one-stop solution for apartment rentals and building management. Sign in to manage your space.
                    </p>
                </div>
            </motion.div>

            {/* Divider */}
            <div className="h-[60%] w-px bg-gray-300 mx-4 hidden md:block" />

            {/* Right Side */}
            <motion.div
                className="flex justify-center items-center p-6"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </motion.div>
        </div>
    );
};

export default AuthLayout;