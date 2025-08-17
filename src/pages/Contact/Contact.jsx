import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import contactImg from "../../assets/images/Get in touch-cuate.png"; // Use your own image path
import { FiMessageSquare } from "react-icons/fi";

const Contact = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay, adjust as needed or replace with real loading logic
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-primary/20">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="pt-15 lg:pt-0 bg-primary/20">
            <div
                id="contact"
                className="max-w-screen-2xl mx-auto min-h-screen px-4 lg:px-30 py-10 grid grid-cols-1 lg:grid-cols-2 items-center"
            >
                {/* Left Section */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-[#678314] flex items-center gap-3">
                        <FiMessageSquare className="text-5xl text-[#678314]" />
                        Get in Touch
                    </h2>
                    <p className="text-gray-600">We’re here to help. Reach out to us through any of the platforms below.</p>

                    <div className="space-y-4 text-lg">
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-[#678314]" />
                            <a href="mailto:contact@example.com" className="hover:underline">
                                alirejakhan18@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaPhoneAlt className="text-[#678314]" />
                            <a href="tel:+1234567890" className="hover:underline">
                                +880 173 342 8976
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaWhatsapp className="text-[#678314]" />
                            <a href="https://wa.me/1234567890" className="hover:underline">
                                +880 133 111 6711
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaFacebook className="text-[#678314]" />
                            <a href="https://facebook.com/yourpage" className="hover:underline">
                                facebook.com/yourpage
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaInstagram className="text-[#678314]" />
                            <a href="https://instagram.com/yourprofile" className="hover:underline">
                                @yourprofile
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <img
                        src={contactImg}
                        alt="Contact Illustration"
                        className="w-full h-auto max-h-[700px] object-contain mx-auto"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
