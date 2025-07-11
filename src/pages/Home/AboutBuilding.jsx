import React from 'react';
import {
  FaBuilding,
  FaMapMarkedAlt,
  FaHome,
  FaShieldAlt,
  FaLeaf,
  FaWifi,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardData = [
  {
    icon: <FaBuilding className="text-3xl text-blue-600 mb-4" />,
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
    icon: <FaHome className="text-3xl text-yellow-600 mb-4" />,
    title: 'Diverse Apartments',
    description:
      'Choose from studio, 2BHK, and 3BHK units—designed for modern families and professionals.',
  },
  {
    icon: <FaShieldAlt className="text-3xl text-red-500 mb-4" />,
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
      className="relative mt-0 pt-24 pb-20 px-6 md:px-20  z-10 rounded-t-3xl"
    >
      <motion.div
        className="text-center"
        initial="visible"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
          custom={0}
          variants={fadeUp}
        >
          About Our <span className='text-secondary'>Building</span>
        </motion.h2>
        <motion.p
          className="text-base md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          custom={1}
          variants={fadeUp}
        >
          Welcome to <span className="font-semibold text-secondary">Aaponaloi</span>, your modern living solution. Our thoughtfully designed complex blends comfort, security, and sustainability for every lifestyle.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              custom={index + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="bg-accent rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all"
            >
              {card.icon}
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutBuilding;
