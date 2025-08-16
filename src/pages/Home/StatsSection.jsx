import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaBuilding,
  FaUsers,
  FaStar,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaLeaf
} from 'react-icons/fa';

const stats = [
  {
    icon: <FaBuilding className="text-2xl" />,
    label: 'Total Units',
    value: 120,
    suffix: '+',
    description: 'Modern apartments available'
  },
  {
    icon: <FaUsers className="text-2xl" />,
    label: 'Happy Residents',
    value: 85,
    suffix: '%',
    description: 'Satisfaction rate'
  },
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    label: 'Prime Locations',
    value: 5,
    description: 'Across the city'
  },
  {
    icon: <FaLeaf className="text-2xl" />,
    label: 'Green Spaces',
    value: 8,
    description: 'Community gardens & parks'
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    label: 'Security',
    value: 24,
    suffix: '/7',
    description: 'Monitored safety'
  }
];

// building images
const images = [
  "https://i.ibb.co.com/1xrvmmX/lisa-anna-4l1-Jv-BHUcz-U-unsplash.jpg",
  "https://i.ibb.co.com/MxBVLzGR/alex-tyson-bi-SGs-H1wo-QE-unsplash.jpg",
  "https://i.ibb.co.com/k6GyHqgk/devon-janse-van-rensburg-WEDFTZV0q-U-unsplash.jpg",
  "https://i.ibb.co.com/gMHRBq4Q/patrick-perkins-G3ql-ZQXs-BOE-unsplash.jpg",
  "https://i.ibb.co.com/fYPftJvm/patrick-perkins-i-Ri-Vz-ALa4p-I-unsplash.jpg",
  "https://i.ibb.co.com/pGbHtZB/patrick-perkins-3wyl-Drjx-H-E-unsplash.jpg",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const StatsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section id='Highlights' className="py-20 px-4 sm:px-6 ">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-5">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <FaStar className="text-secondary text-5xl" />
          Aaponaloi <span className="text-secondary ml-1">Highlights</span>
        </h2>
        <p className="text-gray-600 text-base md:text-lg font-light">
          Explore the numbers behind our thriving community — from apartments and agreements to member engagement and more.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid grid-cols-1 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {stats.map((stat, index) => {
          const showImageFirst = index % 2 === 0; // 0,2,4 => show image first

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative rounded-xl p-6 shadow-sm hover:shadow-md transition-all border overflow-hidden group"
            >
              {/* Image first (for 1,3,5) */}
              {showImageFirst ? (
                <>
                  <motion.img
                    src={images[index % images.length]}
                    alt="Building"
                    className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                  />
                  <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/60 rounded-lg mb-4 mx-auto">
                      {stat.icon}
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        <CountUp
                          end={stat.value}
                          duration={2}
                          enableScrollSpy
                          scrollSpyDelay={200}
                        />
                        {stat.suffix}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{stat.label}</h3>
                      <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                    </div>
                  </div>
                </>
              ) : (
                /* Data only (for 2,4) */
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/60 rounded-lg mb-4 mx-auto">
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      <CountUp
                        end={stat.value}
                        duration={2}
                        enableScrollSpy
                        scrollSpyDelay={200}
                      />
                      {stat.suffix}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{stat.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Features */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-20 w-full rounded-2xl shadow-sm p-8 md:p-10 border relative overflow-hidden"
      >
        {/* Background Image */}
        <img
          src="https://i.ibb.co.com/fYPftJvm/patrick-perkins-i-Ri-Vz-ALa4p-I-unsplash.jpg" // replace with your image
          alt="Amenities Background"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Premium Amenities Included</h3>
          <p className="mb-6 max-w-3xl mx-auto">
            All our residences come with high-end finishes, smart home features, and access to community spaces.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Fitness Center', 'Rooftop Lounge', 'Co-Working Spaces', 'Pet Spa', 'Concierge'].map((item, i) => (
              <span
                key={i}
                className="bg-primary/90 px-4 py-2 text-black rounded-full text-sm font-medium shadow-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
