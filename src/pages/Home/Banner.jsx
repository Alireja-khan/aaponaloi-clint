import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

import img1 from '../../assets/Apartment-3/living-room-3.jpg';
import img2 from '../../assets/Apartment-3/bed-room-3.jpg';
import img3 from '../../assets/Apartment-3/Kids-room-3.jpg';
import img4 from '../../assets/Apartment-3/Study-room-3.jpg';
import img5 from '../../assets/Apartment-3/washroom-3.jpg';
import img6 from '../../assets/Apartment-3/kitchen-3.jpg';

const bannerImages = [
  {
    url: img1,
    title: 'Modern Living Room',
    desc: 'Experience comfort and style in every corner.',
  },
  {
    url: img2,
    title: 'Cozy Bedroom',
    desc: 'A perfect place to rest and relax.',
  },
  {
    url: img3,
    title: 'Colorful Kids Room',
    desc: 'Safe and joyful space for your little ones.',
  },
  {
    url: img4,
    title: 'Productive Study Room',
    desc: 'Stay focused and inspired in a calm environment.',
  },
  {
    url: img5,
    title: 'Elegant Washroom',
    desc: 'Clean, modern, and thoughtfully designed.',
  },
  {
    url: img6,
    title: 'Stylish Kitchen',
    desc: 'Cook with love in a space that feels like home.',
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <section
    id='banner' 
    className="relative w-full min-h-[70vh] max-h-[80vh] overflow-hidden z-0">
      <Slider {...settings}>
        {bannerImages.map((slide, index) => (
          <div key={index}>
            <div
              className="h-[70vh] bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.url})` }}
            >
              <div className="absolute inset-0 bg-black/50 z-10" />

              <motion.div
                className="z-20 text-center text-white px-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
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
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
