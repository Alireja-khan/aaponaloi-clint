import React, { useState, useEffect } from 'react';
import image1 from '../../assets/images/Thinking face-bro.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RiQuestionAnswerLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        question: 'What is the lease term for apartments at Aaponaloi?',
        answer:
            'We offer flexible lease terms ranging from 6 months to 2 years depending on the apartment type and availability.',
    },
    {
        question: 'Are pets allowed in the building?',
        answer:
            'Yes, we are a pet-friendly community with designated pet areas and guidelines to ensure comfort for all residents.',
    },
    {
        question: 'What maintenance services are available?',
        answer:
            'Our on-site maintenance team handles all plumbing, electrical, and general repairs promptly to keep your home in top condition.',
    },
    {
        question: 'Is parking available for residents and guests?',
        answer:
            'We provide secure underground parking for residents and limited guest parking spots on a first-come, first-served basis.',
    },
    {
        question: 'What safety measures are in place?',
        answer:
            'The building features 24/7 CCTV surveillance, secure access control, and on-site security personnel.',
    },
    {
        question: 'How can I apply for an apartment?',
        answer:
            'You can apply through our website or contact our leasing office directly for personalized assistance.',
    },
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const toggleIndex = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const visibleFaqs = showAll ? faqData : faqData.slice(0, 2);

    return (
        <section 
        id="faq" 
        className="relative pb-30 px-6 md:px-20 overflow-hidden">
            <motion.div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left Illustration */}
                <motion.div
                    data-aos="fade-right"
                    layout
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <img
                        src={image1}
                        alt="Apartment Building"
                        className="rounded-3xl object-cover w-full h-[450px]"
                    />
                </motion.div>


                {/* Right FAQ Section */}
                <div data-aos="fade-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 flex items-center gap-3">
                        <RiQuestionAnswerLine className="text-secondary text-5xl" />
                        Common <span className="text-secondary ml-1">Queries</span>
                    </h2>

                    <div className="space-y-4">
                        <AnimatePresence initial={false}>
                            {visibleFaqs.map((item, index) => (
                                <motion.div
                                    key={item.question}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="border bg-gray-100 rounded-2xl shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleIndex(index)}
                                        className="w-full px-6 py-5 text-left flex justify-between items-center text-lg font-medium text-gray-800 hover:text-secondary transition-colors"
                                    >
                                        {item.question}
                                        <span className="ml-4 text-secondary">
                                            {activeIndex === index ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            )}
                                        </span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {activeIndex === index && (
                                            <motion.div
                                                key="content"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="px-6 pb-6 text-gray-600"
                                            >
                                                <p>{item.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Show More/Less Button */}
                        {faqData.length > 2 && (
                            <div className="text-center mt-6">
                                <motion.button
                                    onClick={() => {
                                        setShowAll(!showAll);
                                        setActiveIndex(null); // Reset open answer
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-secondary font-semibold hover:underline transition duration-200"
                                >
                                    {showAll ? 'Show Less ▲' : 'Show More ▼'}
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FAQSection;
