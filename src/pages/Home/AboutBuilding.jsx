import React from 'react';
import {
  FaBuilding, FaMapMarkedAlt, FaHome, FaShieldAlt,
  FaLeaf, FaWifi, FaCar, FaToolbox, FaSwimmingPool
} from 'react-icons/fa';
import { MdElevator } from 'react-icons/md';
import { motion } from 'framer-motion';
import { BsInfoSquareFill } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cardData = [
  { icon: FaBuilding, color: "text-blue-600", title: 'Modern Architecture', description: 'Sleek urban design reflecting modern city life with peaceful interiors.' },
  { icon: FaMapMarkedAlt, color: "text-indigo-600", title: 'Prime Location', description: 'Heart of the city with access to markets, schools, and transport.' },
  { icon: FaHome, color: "text-yellow-600", title: 'Diverse Apartments', description: 'Studio, 2BHK, and 3BHK units designed for families and professionals.' },
  { icon: FaShieldAlt, color: "text-red-600", title: '24/7 Security', description: 'CCTV, access control, and on-site staff ensure your safety.' },
  { icon: FaLeaf, color: "text-green-600", title: 'Green Living', description: 'Eco-conscious design with rooftop gardens and solar-powered lighting.' },
  { icon: FaWifi, color: "text-purple-600", title: 'High-Speed Internet', description: 'Reliable Wi-Fi ideal for work-from-home and streaming.' },
  { icon: FaCar, color: "text-emerald-700", title: 'Ample Parking', description: 'Secure underground and surface parking for residents and visitors.' },
  { icon: FaToolbox, color: "text-cyan-600", title: 'On-site Maintenance', description: 'Quick-response staff for plumbing, electrical, and repairs.' },
  { icon: MdElevator, color: "text-rose-700", title: 'Elevator Access', description: 'Multiple elevators with backup power for easy movement.' },
  { icon: FaSwimmingPool, color: "text-cyan-500", title: 'Swimming Pool & Fitness', description: 'Enjoy a modern swimming pool and fully-equipped gym.' },
  { icon: FaHome, color: "text-orange-600", title: 'Luxury Interiors', description: 'Spacious layouts with premium finishes.' },
  { icon: FaLeaf, color: "text-lime-600", title: 'Rooftop Garden', description: 'Peaceful green space for relaxation.' },
  { icon: FaCar, color: "text-teal-600", title: 'Guest Parking', description: 'Dedicated parking area for visitors.' },
  { icon: FaWifi, color: "text-pink-600", title: 'Smart Home Ready', description: 'IoT-enabled smart systems included.' },
];

const buildingImages = [
  'https://i.ibb.co.com/q3PKX8B0/interior-2685521.jpg',
  'https://i.ibb.co.com/xtDf2VKq/danilo-rios-Ag-K-XAq-Sbfk-unsplash.jpg',
  'https://i.ibb.co.com/wFsgR7gn/alex-tyson-Ir-VNm-D3u8j-Y-unsplash.jpg',
  'https://i.ibb.co.com/45pwd51/alex-tyson-j-KZQy7-Fnw-Jk-unsplash.jpg',
  'https://i.ibb.co.com/Dfdt0vPN/lisa-anna-hp-Aexk-H82-Xg-unsplash.jpg',
  'https://i.ibb.co.com/jvdj07bX/alex-tyson-Nq-Ljnjw-Kq-KA-unsplash.jpg',
  'https://i.ibb.co.com/2750pjZm/tony-lee-Qt-OFl-R9-VO1-Y-unsplash.jpg',
  'https://i.ibb.co.com/QFKGv8GF/leon-seibert-Whgt84a2f-SQ-unsplash.jpg',
  'https://i.ibb.co.com/TBVntQ9p/alex-tyson-Ii-Vd1wp-Tdtg-unsplash.jpg',
  'https://i.ibb.co.com/My0MnZM3/alex-tyson-1f-Koe-HQJj-Xw-unsplash.jpg',
  'https://i.ibb.co.com/pB0PQKB7/alex-tyson-MSFQXXr-Of-Dc-unsplash-1.jpg',
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const AboutBuilding = () => {
  // Vertical scroll settings for cards
  const cardSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  // Image carousel settings
  const imageSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  };

  return (
    <section id="about" className="relative max-w-screen-2xl mx-auto py-20 mb-10 mt-5 px-6 md:px-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Section: Text & Hero */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <BsInfoSquareFill className="text-secondary text-5xl" />
            About Our <span className="text-secondary">Building</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to <span className="font-semibold text-secondary">Aaponaloi</span>,
            a modern living solution where design meets comfort.
            Our complex blends <span className="font-medium">security, sustainability, and convenience</span>
            to create the perfect home for urban lifestyles.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Slider {...imageSettings}>
              {buildingImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Building ${i + 1}`}
                  className="w-full h-80 object-cover"
                />
              ))}
            </Slider>
          </div>
        </motion.div>

        {/* Right Section: Features (Vertical Scroll) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className='mt-8'
        >
          <Slider {...cardSettings}>
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-primary/50 rounded-xl max-w-xl shadow-md p-5 flex items-start gap-4 hover:shadow-xl transition-all m-2"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 ${card.color}`}>
                  <card.icon className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </Slider>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutBuilding;
