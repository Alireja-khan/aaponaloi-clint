import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router';

import img1 from '../../assets/Apartment-3/living-room-3.jpg';
import img2 from '../../assets/Apartment-3/bed-room-3.jpg';
import img3 from '../../assets/Apartment-3/Kids-room-3.jpg';
import img4 from '../../assets/Apartment-3/Study-room-3.jpg';
import img5 from '../../assets/Apartment-3/washroom-3.jpg';
import img6 from '../../assets/Apartment-3/kitchen-3.jpg';

const bannerImages = [
  {
    url: img1,
    title: 'Modern and Spacious Living Room',
    desc: 'Experience comfort and style in every corner.',
  },
  {
    url: img2,
    title: 'Cozy and Serene Bedroom Retreat',
    desc: 'A perfect place to rest and relax.',
  },
  {
    url: img3,
    title: 'Colorful and Playful Kids Room',
    desc: 'Safe and joyful space for your little ones.',
  },
  {
    url: img4,
    title: 'Productive and Peaceful Study Room',
    desc: 'Stay focused and inspired in a calm environment.',
  },
  {
    url: img5,
    title: 'Elegant and Modern Washroom Design',
    desc: 'Clean, modern, and thoughtfully designed.',
  },
  {
    url: img6,
    title: 'Stylish Kitchen for Culinary Delight',
    desc: 'Cook with love in a space that feels like home.',
  },
];


const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 text-white bg-black/50 hover:bg-primary hover:text-black p-2 rounded-full"
    onClick={onClick}
  >
    ❯
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 text-white bg-black/50 hover:bg-primary hover:text-black p-2 rounded-full"
    onClick={onClick}
  >
    ❮
  </button>
);

const Banner = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section id="banner" className="relative w-full min-h-[70vh] max-h-[80vh] overflow-hidden z-0">
      <Slider {...settings}>
        {bannerImages.map((slide, index) => (
          <div key={index}>
            <motion.div
              className="h-[70vh] bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.url})` }}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

              {/* Content */}
              <motion.div
                className="z-20 text-center text-white px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                  
                <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                  <Typewriter
                    words={[slide.title]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={60}
                    deleteSpeed={30}
                    delaySpeed={1500}
                  />
                </h2>


                <p className="text-base md:text-lg lg:text-xl font-light mb-6 max-w-xl mx-auto">
                  {slide.desc}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-secondary px-6 py-2 rounded-lg font-bold shadow-md hover:bg-primary hover:text-black transition duration-300"
                    onClick={() => {
                      const section = document.getElementById('apartment-section');
                      section?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Apartments
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-black px-6 py-2 rounded-lg font-bold shadow-md hover:bg-white hover:text-secondary transition duration-300"
                    onClick={() => navigate('/register')}
                  >
                    Keep in Touch
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
