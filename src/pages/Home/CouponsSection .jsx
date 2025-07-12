import React, { useEffect } from 'react';
import { FaTag } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { IoIosGift } from "react-icons/io";

const coupons = [
  {
    code: 'SAVE20',
    description: 'Get 20% off on your first apartment rent!',
    discount: '20%',
    color: 'bg-green-100 text-green-800',
  },
  {
    code: 'FAMILY10',
    description: '10% off for family apartments (2BHK, 3BHK).',
    discount: '10%',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    code: 'LOYAL50',
    description: '50% discount for long-term tenants (1 year+)',
    discount: '50%',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    code: 'STUDENT15',
    description: '15% off for students on studio apartments.',
    discount: '15%',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    code: 'SUMMER25',
    description: 'Summer special: Get 25% off!',
    discount: '25%',
    color: 'bg-pink-100 text-pink-800',
  },
  {
    code: 'REFER30',
    description: 'Refer a friend and both get 30% off!',
    discount: '30%',
    color: 'bg-orange-100 text-orange-800',
  },
  // ✅ NEW COUPONS
  {
    code: 'NEWYEAR40',
    description: 'Celebrate the new year with 40% off your rent!',
    discount: '40%',
    color: 'bg-red-100 text-red-800',
  },
  {
    code: 'WORKFROMHOME',
    description: '25% discount for remote workers renting 1BHK.',
    discount: '25%',
    color: 'bg-teal-100 text-teal-800',
  },
  {
    code: 'WEEKENDDEAL',
    description: 'Book your apartment over the weekend and save 20%.',
    discount: '20%',
    color: 'bg-indigo-100 text-indigo-800',
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



const CouponsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
    });
  }, []);

  return (
    <section
      id='coupons'
      className="pb-30 px-6 md:px-20 ">
      <div className="text-center">
        <div className="flex justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <IoIosGift className="text-secondary text-5xl" />
            Exclusive <span className="text-secondary ml-1">Coupons</span>
          </h2>
        </div>


        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Unlock amazing savings for your next apartment experience with our limited-time offers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon, index) => (

            <motion.div
              custom={index + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              key={coupon.code}
              className="bg-accent rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all"
              data-aos={index % 2 === 0 ? 'flip-left' : 'fade-down-left'}
            >
              <div className="flex items-center gap-4 mb-4">
                <FaTag className={`text-2xl ${coupon.color.split(' ')[1]}`} />
                <div>
                  <h3 className="text-xl font-bold">{coupon.code}</h3>
                  <p className="text-sm text-gray-500">{coupon.description}</p>
                </div>
              </div>

              <span
                className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${coupon.color}`}
              >
                {coupon.discount} OFF
              </span>
            </motion.div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponsSection;
