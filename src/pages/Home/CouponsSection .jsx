import React, { useEffect, useState } from 'react';
import { FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IoIosGift } from "react-icons/io";
import axios from 'axios';

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
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get('https://aaponaloi-server.vercel.app/coupons');
        setCoupons(res.data);
      } catch (err) {
        console.error('Failed to fetch coupons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <section id='coupons' className="max-w-screen-2xl mx-auto pb-30 px-6 md:px-20">
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

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading coupons...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coupons.map((coupon, index) => (
              <motion.div
                key={coupon.code}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className={`relative bg-accent rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all ${
                  index === coupons.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <FaTag className={`text-2xl ${coupon.color?.split(' ')[1]}`} />
                  <div>
                    <h3 className="text-xl font-bold">{coupon.code}</h3>
                    <p className="text-sm text-gray-500">{coupon.description}</p>
                  </div>
                </div>

                <span className="absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full bg-lime-200">
                  {coupon.discount} OFF
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CouponsSection;
