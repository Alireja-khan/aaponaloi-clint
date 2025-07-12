import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaFileContract,
  FaBullhorn,
  FaStar,
} from 'react-icons/fa';

/* ---------- data ---------- */
const stats = [
  {
    icon: FaBuilding,
    label: 'Apartments',
    value: 120,
    color: 'text-yellow-800', // 🏢 Building/real estate
  },
  {
    icon: FaUsers,
    label: 'Members',
    value: 85,
    color: 'text-blue-800', // 👥 Community / people
  },
  {
    icon: FaMoneyBillWave,
    label: 'Payments',
    value: 542,
    color: 'text-green-800', // 💵 Finance
  },
  {
    icon: FaFileContract,
    label: 'Agreements',
    value: 47,
    color: 'text-purple-800', // 📄 Contracts / formalities
  },
  {
    icon: FaBullhorn,
    label: 'Announcements',
    value: 23,
    color: 'text-red-800', // 📣 Alerts / notices
  },
];

/* ---------- framer variants ---------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariantsLeft = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 90 } },
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 90 } },
};

/* ---------- component ---------- */
const StatsSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  /* Trigger Framer when in view */
  useEffect(() => {
    if (inView) controls.start('show');
    else controls.start('hidden');
  }, [inView, controls]);

  return (
    <section id="stats" className="relative py-20 overflow-hidden">
      {/* radial‑gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-transparent"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-5">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FaStar className="text-secondary text-5xl" />
            Aaponaloi <span className="text-secondary ml-1">Highlights</span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg font-light">
            Explore the numbers behind our thriving community — from apartments and agreements to member engagement and more.
          </p>
        </div>

        {/* card grid */}
        <motion.ul
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {stats.map(({ icon: Icon, label, value, color }, index) => (
            <motion.li
              key={label}
              variants={index % 2 === 0 ? cardVariantsLeft : cardVariantsRight}
              whileHover={{ y: -6, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
              className="group rounded-2xl bg-accent backdrop-blur-md p-6 text-center shadow transition cursor-pointer"
            >
              <Icon
                className={`mx-auto mb-4 text-4xl transition group-hover:scale-110 ${color}`}
              />

              <div className="text-3xl md:text-4xl font-bold text-gray-900">
                <CountUp end={value} duration={2.5} enableScrollSpy />
              </div>

              <p className="mt-1 text-sm md:text-base font-medium text-gray-700">
                {label}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default StatsSection;
