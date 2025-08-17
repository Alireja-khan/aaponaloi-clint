import React from 'react';
import {
  FaBuilding, FaMapMarkedAlt, FaHome, FaShieldAlt,
  FaLeaf, FaWifi, FaCar, FaToolbox, FaSwimmingPool
} from 'react-icons/fa';
import { MdElevator } from 'react-icons/md';
import { motion } from 'framer-motion';
import { BsInfoSquareFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Reduced data for better mobile display
const cardData = [
  { icon: FaBuilding, color: "text-blue-600", title: 'Modern Architecture', description: 'Sleek urban design with peaceful interiors.' },
  { icon: FaMapMarkedAlt, color: "text-indigo-600", title: 'Prime Location', description: 'Heart of the city with easy access to amenities.' },
  { icon: FaHome, color: "text-yellow-600", title: 'Diverse Apartments', description: 'Studio, 2BHK, and 3BHK units available.' },
  { icon: FaShieldAlt, color: "text-red-600", title: '24/7 Security', description: 'CCTV and on-site staff for safety.' },
  { icon: FaLeaf, color: "text-green-600", title: 'Green Living', description: 'Eco-conscious design with gardens.' },
  { icon: FaWifi, color: "text-purple-600", title: 'High-Speed Internet', description: 'Reliable Wi-Fi for work and streaming.' },
  { icon: FaCar, color: "text-emerald-700", title: 'Ample Parking', description: 'Secure parking for residents.' },
  { icon: FaSwimmingPool, color: "text-cyan-500", title: 'Pool & Fitness', description: 'Swimming pool and gym facilities.' },
];

const buildingImages = [
  'https://i.ibb.co.com/q3PKX8B0/interior-2685521.jpg',
  'https://i.ibb.co.com/xtDf2VKq/danilo-rios-Ag-K-XAq-Sbfk-unsplash.jpg',
  'https://i.ibb.co.com/wFsgR7gn/alex-tyson-Ir-VNm-D3u8j-Y-unsplash.jpg',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const AboutBuilding = () => {
  // Vertical scroll settings for cards (only on lg+)
  const cardSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          vertical: false,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: "unslick" // Disable slick on mobile
      }
    ]
  };

  // Image carousel settings
  const imageSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  };

  return (
    <section id="about" className="relative max-w-screen-2xl mx-auto py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left Section: Text & Hero - shown on all screens */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="w-full lg:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <BsInfoSquareFill className="text-secondary text-4xl lg:text-5xl" />
            About Our <span className="text-secondary">Building</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            Welcome to <span className="font-semibold text-secondary">Aaponaloi</span>,
            a modern living solution where design meets comfort.
            Our complex blends <span className="font-medium">security, sustainability, and convenience</span>
            to create the perfect home for urban lifestyles.
          </p>
          
          {/* Image slider - only on lg+ screens */}
          <div className="hidden lg:block rounded-2xl overflow-hidden shadow-lg">
            <Slider {...imageSettings}>
              {buildingImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Building ${i + 1}`}
                  className="w-full h-80 object-cover"
                />
              ))}
            </Slider>
          </div>
        </motion.div>

        {/* Right Section: Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="w-full lg:mt-15 lg:w-1/2"
        >
          {/* Mobile/Tablet Grid View */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-primary/50 rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-xl transition-all"
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 ${card.color}`}>
                  <card.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Slider View */}
          <div className="hidden lg:block h-[500px]">
            <Slider {...cardSettings}>
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-primary/50 rounded-xl max-w-xl shadow-md p-5 flex items-start gap-4 hover:shadow-xl transition-all m-2"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 ${card.color}`}>
                    <card.icon className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBuilding;