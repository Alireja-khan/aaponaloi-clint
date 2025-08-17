import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaSearch,
  FaCalendarAlt,
  FaKey,
  FaRegCheckCircle,
  FaPhoneAlt,
  FaHome,
  FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router';

// Sample building images (replace with your actual images)
const buildingImages = [
  'https://i.ibb.co.com/7Jrm0rNV/alex-tyson-a-Bz-Zu-Gs-GOVA-unsplash.jpg',
  'https://i.ibb.co.com/67NRX50M/lisa-anna-cwu4-D-i4-EFw-unsplash.jpg',
  'https://i.ibb.co.com/HkP5J6s/steven-lewis-lsi8dck-KHgw-unsplash.jpg',
];

const steps = [
  {
    icon: <FaSearch className="text-white text-xl" />,
    title: "Find Your Perfect Home",
    description: "Browse our curated collection of modern apartments with high-quality photos, virtual tours, and detailed floor plans.",
    features: ["Filter by amenities", "Save favorites", "Neighborhood guides"],
    accentColor: "bg-secondary"
  },
  {
    icon: <FaCalendarAlt className="text-white text-xl" />,
    title: "Schedule a Tour",
    description: "Book a visit at your convenience - choose between in-person or virtual tours with our leasing agents.",
    features: ["Flexible scheduling", "Live Q&A", "Same-day tours available"],
    accentColor: "bg-secondary"
  },
  {
    icon: <FaKey className="text-white text-xl" />,
    title: "Move In",
    description: "Complete your paperwork digitally and get keys to your new home with our seamless move-in process.",
    features: ["Digital signing", "24h key pickup", "Move-in checklist"],
    accentColor: "bg-secondary"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const FadeInOnView = ({ children, direction = 'up', delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay },
      });
    }
  }, [controls, inView, direction, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 20 : -20 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <div className="pb-12 md:pb-20 lg:pb-30 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeInOnView direction="up" delay={0}>
        <div className="text-center max-w-4xl mx-auto pt-12 pb-6 md:pb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <FaHome className="text-secondary text-4xl sm:text-5xl" />
            <span>Finding Your Dream Home <span className="text-secondary">Made Simple</span></span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Three easy steps to secure your perfect apartment in our premier buildings.
          </p>
        </div>
      </FadeInOnView>

      {/* Steps with Images - Alternating Layout */}
      <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-80 lg:h-96 relative rounded-lg md:rounded-xl overflow-hidden shadow-lg">
              <img
                src={buildingImages[index % buildingImages.length]}
                alt={`Step ${index + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className={`absolute ${index % 2 === 0 ? '-left-3 md:-left-4' : '-right-3 md:-right-4'} top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold z-10`}>
                <span className="text-lg md:text-xl font-bold">{index + 1}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 px-2 sm:px-0">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${step.accentColor} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                {step.icon}
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5">{step.description}</p>

              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {step.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <FaRegCheckCircle className={`${step.accentColor.replace('bg', 'text')} mr-2 mt-0.5 flex-shrink-0`} />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 sm:mt-20 md:mt-24 w-full shadow-sm p-6 sm:p-8 md:p-12 lg:p-16 border relative overflow-hidden rounded-lg md:rounded-xl"
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <img
            src="https://i.ibb.co/DgMM4Mpw/prydumano-design-VZ2z8ozzy10-unsplash.jpg"
            alt="Luxury Living Background"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="block h-1 w-16 sm:w-20 bg-primary mx-auto mb-2 sm:mb-3"></span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Ready to Experience <span className="text-primary">Aaponaloi Living?</span>
              </h3>
            </div>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed">
              Join our community of satisfied residents and find your perfect home today.
            </p>
          </div>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary hover:bg-primary-dark px-4 sm:px-6 py-2 sm:py-3 border border-primary rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FaPhoneAlt /> Schedule a Call
              </motion.button>
            </Link>
            <Link to="/apartments" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-transparent text-white border border-white hover:bg-primary hover:text-black hover:border-primary px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FaHome /> View All Properties
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;