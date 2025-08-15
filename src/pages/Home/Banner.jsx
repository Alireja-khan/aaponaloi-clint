import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Link, useNavigate } from 'react-router';

import img1 from '../../assets/Apartment-3/living-room-3.jpg';
import img2 from '../../assets/Apartment-3/bed-room-3.jpg';
import img3 from '../../assets/Apartment-3/Kids-room-3.jpg';
import img4 from '../../assets/Apartment-3/Study-room-3.jpg';
import img5 from '../../assets/Apartment-3/washroom-3.jpg';
import img6 from '../../assets/Apartment-3/kitchen-3.jpg';

const bannerImages = [
  { url: img1, title: 'Modern and Spacious Living Room', desc: 'Experience comfort and style in every corner.' },
  { url: img2, title: 'Cozy and Serene Bedroom Retreat', desc: 'A perfect place to rest and relax.' },
  { url: img3, title: 'Colorful and Playful Kids Room', desc: 'Safe and joyful space for your little ones.' },
  { url: img4, title: 'Productive and Peaceful Study Room', desc: 'Stay focused and inspired in a calm environment.' },
  { url: img5, title: 'Elegant and Modern Washroom Design', desc: 'Clean, modern, and thoughtfully designed.' },
  { url: img6, title: 'Stylish Kitchen for Culinary Delight', desc: 'Cook with love in a space that feels like home.' },
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

const Banner = ({ onFirstImageLoad }) => {
  const navigate = useNavigate();
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  React.useEffect(() => {
    // On mount, mark as "loading" again
    setFirstImageLoaded(false);
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleImageLoad = () => {
    if (!firstImageLoaded) {
      setFirstImageLoaded(true);
      onFirstImageLoad();
    }
  };

  return (
    <section id="banner" className="relative w-full h-screen overflow-hidden z-0">
      <Slider {...settings} className="overflow-hidden">
        {bannerImages.map((slide, index) => (

          <div key={index} className="w-full h-screen overflow-hidden relative">
            {/* preload for first image */}
            {index === 5 && (
              <img src={slide.url} alt={slide.title} className="hidden" onLoad={handleImageLoad} />
            )}

            {/* Background image with zoom effect */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.url})` }}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{
                duration: 30,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent z-10" />

            {/* Content stays still */}
            <motion.div
              className="relative z-20 text-white px-8 max-w-3xl ml-[10%] lg:ml-[15%] h-full flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {slide.title}
              </h2>

              <div className="w-20 h-1 bg-primary mb-6"></div>

              <p className="text-lg md:text-2xl mb-8">{slide.desc}</p>

              <div className="flex flex-wrap gap-4">
                <Link to="/apartments">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary text-black px-8 py-3 rounded-md font-semibold shadow-lg hover:bg-primary-dark transition-colors duration-300"
                  >
                    Explore Properties
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition-colors duration-300"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>


        ))}
      </Slider>

    </section>
  );
};

export default Banner;


