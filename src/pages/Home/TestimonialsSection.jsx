import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FaQuoteLeft, FaStar, FaUsers } from 'react-icons/fa';

// Replace with your actual background image import
import testimonialBg from '../../assets/images/testimonial-bg.jpg';
import { IoIosGift } from 'react-icons/io';

// Testimonial data
const testimonials = [
    {
        id: 1,
        name: 'Ayesha Rahman',
        role: 'Resident',
        content: "Aaponaloi offers a safe and comfortable living experience. The apartments are modern, and the management is always supportive.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
        id: 2,
        name: 'Rafiq Khan',
        role: 'Resident',
        content: "From security to maintenance, everything is handled professionally. Living here has truly been a stress-free experience for me.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 3,
        name: 'Sadia Islam',
        role: 'Resident',
        content: "The community at Aaponaloi is welcoming and peaceful. The design of the apartments makes everyday life enjoyable and relaxing.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
        id: 4,
        name: 'Hasan Ali',
        role: 'New Resident',
        content: "Moving into Aaponaloi was smooth and easy. The apartments are spacious, and the staff always helps when needed.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
        id: 5,
        name: 'Nabila Akter',
        role: 'Resident',
        content: "The facilities here are well-maintained, and the apartments are designed with comfort in mind. I enjoy living at Aaponaloi every day.",
        rating: 4,
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    {
        id: 6,
        name: 'Fahim Chowdhury',
        role: 'Resident',
        content: "The location of Aaponaloi is perfect, close to everything I need. Maintenance requests are resolved quickly and efficiently.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/men/40.jpg'
    },
    {
        id: 7,
        name: 'Rumana Begum',
        role: 'Resident',
        content: "I appreciate the security and cleanliness of Aaponaloi. It feels safe for families and provides a peaceful environment.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
        id: 8,
        name: 'Shahriar Hossain',
        role: 'Resident',
        content: "The apartments reflect quality and good design. The management listens to residents and takes quick action on requests.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
    },
    {
        id: 9,
        name: 'Taslima Sultana',
        role: 'Resident',
        content: "Aaponaloi provides a great mix of comfort and modern living. The community is friendly, and the amenities are excellent.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/women/77.jpg'
    },
    {
        id: 10,
        name: 'Imran Ahmed',
        role: 'New Resident',
        content: "My experience at Aaponaloi has been fantastic. The apartments are clean, and the staff is always ready to assist.",
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/men/88.jpg'
    }
];


// Star rating component
const StarRating = ({ rating }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
            <FaStar
                key={i}
                className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`}
            />
        ))}
    </div>
);

// Custom arrow components
const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Next testimonial"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
    </button>
);

const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Previous testimonial"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    </button>
);

const TestimonialsSection = () => {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background image with gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-cover bg-center"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                    duration: 30,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}

            >

                <img
                    src={testimonialBg}
                    alt="Happy clients background"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center -mt-5 mb-20"
                >
                    <div className=''>
                        <div className="flex justify-center">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
                                    <FaUsers className="text-primary text-5xl" />
                                    What Our <span className='text-primary'>Clients Say</span>
                                </h2>
                        </div>

                        <p className="text-lg text-white mb-12 max-w-2xl mx-auto">
                            Trusted by homeowners, investors, and design professionals worldwide
                        </p>
                    </div>
                </motion.div>

                {/* Content grid - testimonials on left, stats on right */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-25 items-center">
                    {/* Testimonials slider - left side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:pr-8"
                    >
                        <Slider {...settings} className="pb-10 px-10">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="px-2 py-2 focus:outline-none">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg h-full flex flex-col border border-white/20 hover:shadow-xl transition-all duration-300"
                                    >
                                        <FaQuoteLeft className="text-secondary text-3xl mb-6 opacity-70" />
                                        <p className="text-gray-800 mb-6 flex-grow">{testimonial.content}</p>
                                        <div className="mt-auto">
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/30"
                                                    loading="lazy"
                                                />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                                    <p className="text-sm text-gray-700">{testimonial.role}</p>
                                                </div>
                                            </div>
                                            <StarRating rating={testimonial.rating} />
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </Slider>
                    </motion.div>

                    {/* Stats - right side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-col justify-center space-y-12"
                    >
                        <div className="text-center lg:text-left">
                            <div className="text-5xl font-bold text-white mb-2">200+</div>
                            <div className="text-xl text-gray-200">Happy Clients</div>
                            <p className="text-gray-300 mt-3 max-w-md mx-auto lg:mx-0">
                                Join our growing family of satisfied homeowners and investors
                            </p>
                        </div>

                        <div className="text-center lg:text-left">
                            <div className="text-5xl font-bold text-white mb-2">4.9<span className="text-2xl">/5</span></div>
                            <div className="text-xl text-gray-200">Average Rating</div>
                            <div className="flex justify-center lg:justify-start mt-3">
                                <StarRating rating={5} />
                            </div>
                            <p className="text-gray-300 mt-2 max-w-md mx-auto lg:mx-0">
                                Consistently high ratings across all review platforms
                            </p>
                        </div>

                        <div className="text-center lg:text-left">
                            <div className="text-5xl font-bold text-white mb-2">15</div>
                            <div className="text-xl text-gray-200">Years Experience</div>
                            <p className="text-gray-300 mt-3 max-w-md mx-auto lg:mx-0">
                                Decades of expertise in delivering exceptional properties
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;