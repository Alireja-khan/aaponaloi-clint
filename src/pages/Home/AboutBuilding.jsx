import React from 'react';
import {
  FaBuilding,
  FaMapMarkedAlt,
  FaHome,
  FaShieldAlt,
  FaLeaf,
  FaWifi,
  FaCar,
  FaToolbox,
} from 'react-icons/fa';
import { MdElevator } from 'react-icons/md';

import { motion } from 'framer-motion';
import { BsInfoSquareFill } from "react-icons/bs";

const cardData = [
  {
    icon: <FaBuilding className="text-3xl text-blue-800 mb-4" />,
    title: 'Modern Architecture',
    description:
      'Crafted with sleek urban design, our building reflects modern city life while offering peaceful interiors.',
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-indigo-600 mb-4" />,
    title: 'Prime Location',
    description:
      'Located at the heart of the city with easy access to markets, schools, and transportation.',
  },
  {
    icon: <FaHome className="text-3xl text-yellow-800 mb-4" />,
    title: 'Diverse Apartments',
    description:
      'Choose from studio, 2BHK, and 3BHK units—designed for modern families and professionals.',
  },
  {
    icon: <FaShieldAlt className="text-3xl text-red-800 mb-4" />,
    title: '24/7 Security',
    description:
      'Equipped with CCTV, access control, and on-site staff to ensure your safety at all times.',
  },
  {
    icon: <FaLeaf className="text-3xl text-green-600 mb-4" />,
    title: 'Green Living',
    description:
      'Our eco-conscious design includes rooftop gardens, natural ventilation, and solar-powered lighting.',
  },
  {
    icon: <FaWifi className="text-3xl text-purple-600 mb-4" />,
    title: 'High-Speed Internet',
    description:
      'Enjoy fast and reliable Wi-Fi access throughout the building—ideal for work-from-home and streaming.',
  },
  {
    icon: <FaCar className="text-3xl text-green-900 mb-4" />,
    title: 'Ample Parking',
    description:
      'Secure underground and surface parking options available for residents and visitors.',
  },
  {
    icon: <FaToolbox className="text-3xl text-cyan-600 mb-4" />,
    title: 'On-site Maintenance',
    description:
      'Quick response maintenance staff for plumbing, electrical, and general repairs.',
  },
  {
    icon: <MdElevator className="text-3xl text-rose-900 mb-4" />,
    title: 'Elevator Access',
    description:
      'Multiple elevators with backup power for easy and accessible movement on all floors.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const AboutBuilding = () => {
  return (
    <section
      id="about"
      className="relative max-w-screen-2xl mx-auto mt-0 py-30 px-6 md:px-20 z-10 rounded-t-3xl "
    >
      <motion.div
        className="text-center"
        initial="visible"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >

        <motion.h2
          className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2"
          custom={0}
          variants={fadeUp}
        >
          <BsInfoSquareFill className="text-secondary text-4xl mr-5 md:text-5xl" />
          About Our <span className="text-secondary ml-2">Building</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          custom={1}
          variants={fadeUp}
        >
          Welcome to <span className="font-semibold text-secondary">Aaponaloi</span>, your modern living solution. Our thoughtfully designed complex blends comfort, security, and sustainability for every lifestyle.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {cardData.map((card, index) => (
    <motion.div
      key={index}
      custom={index + 2}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={fadeUp}
      whileHover={{ scale: 1.03 }}
      className={`bg-accent rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all ${
        index === cardData.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {card.icon}
      <div className='-mt-5 mb-5'>
        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
        <p className="text-gray-600">{card.description}</p>
      </div>
    </motion.div>
  ))}
</div>

        
      </motion.div>
    </section>
  );
};

export default AboutBuilding;
