import React, { useEffect, useState } from 'react';
import { FaTag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IoIosGift } from "react-icons/io";
import { useNavigate } from 'react-router';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample building images (replace with your actual image paths)
const buildingImages = [
  'https://i.ibb.co.com/q3PKX8B0/interior-2685521.jpg',
  'https://i.ibb.co.com/xtDf2VKq/danilo-rios-Ag-K-XAq-Sbfk-unsplash.jpg',
  'https://i.ibb.co.com/wFsgR7gn/alex-tyson-Ir-VNm-D3u8j-Y-unsplash.jpg',
  'https://i.ibb.co.com/45pwd51/alex-tyson-j-KZQy7-Fnw-Jk-unsplash.jpg',
  'https://i.ibb.co.com/Dfdt0vPN/lisa-anna-hp-Aexk-H82-Xg-unsplash.jpg',
  'https://i.ibb.co.com/jvdj07bX/alex-tyson-Nq-Ljnjw-Kq-KA-unsplash.jpg',
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

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
    aria-label="Next"
  >
    <FaChevronRight className="text-gray-700" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
    aria-label="Previous"
  >
    <FaChevronLeft className="text-gray-700" />
  </button>
);

const CouponsSection = ({ onCouponApplied }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get('https://aaponaloi-server.vercel.app/coupons');
        setCoupons(res.data.map((coupon, index) => ({
          ...coupon,
          bgImage: buildingImages[index % buildingImages.length]
        })));
      } catch (err) {
        console.error('Failed to fetch coupons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleApplyCoupon = (couponCode) => {
    // If there's a callback function from parent (MakePayment component)
    if (onCouponApplied) {
      onCouponApplied(couponCode);
    } else {
      // Update the path to include the member-dashboard prefix
      navigate('/member-dashboard/make-payment', {
        state: { appliedCoupon: couponCode }
      });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id='coupons' className="max-w-screen-2xl mt-25 mx-auto pb-30 px-6 md:px-20">
      <div className="text-center">
        <div className="flex justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <IoIosGift className="text-secondary text-5xl" />
            Exclusive <span className="text-secondary ml-1">Coupons</span>
          </h2>
        </div>

        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Unlock amazing savings for your next apartment experience with our limited-time offers.
        </p>



        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading coupons...</p>
        ) : (
          <div className="relative px-8">
            <Slider {...settings}>
              {coupons.map((coupon, index) => (
                <motion.div
                  key={coupon.code}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={fadeUp}
                  className="px-4 py-6"
                >
                  <div
                    className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${coupon.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Offer Circle */}
                    <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">{coupon.discount} OFF</span>
                    </div>

                    {/* Coupon Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-4 mb-3">
                        <FaTag className="text-2xl text-yellow-300" />
                        <div>
                          <h3 className="text-2xl font-bold">{coupon.code}</h3>
                          <p className="text-sm opacity-90">{coupon.description}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t flex justify-center items-center gap-5 border-white/20">
                        <button
                          onClick={() => handleApplyCoupon(coupon.code)}
                          className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-primary transition-colors"
                        >
                          Apply Coupon
                        </button>

                        {/* View All Apartments Button */}
                        <button
                          onClick={() => navigate('/apartments')}
                          className="bg-primary text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                          View All Apartments
                        </button>

                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default CouponsSection;