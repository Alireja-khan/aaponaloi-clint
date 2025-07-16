import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBullhorn } from 'react-icons/fa';
import { VscEmptyWindow } from 'react-icons/vsc';
import noFound from '../../assets/images/Empty-cuate.png';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true });

    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('https://aaponaloi-server.vercel.app/announcements');
        setAnnouncements(res.data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pl-10 max-w-5xl">
      <h2
        className="text-2xl sm:text-3xl lg:text-4xl pb-6 sm:pb-8 lg:pb-9 font-bold flex items-center gap-2 sm:gap-3 text-gray-800"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
      >
        <FaBullhorn className="text-secondary text-xl sm:text-2xl lg:text-3xl" />
        Latest <span className="text-secondary">Announcements</span>
      </h2>


      {loading ? (
        <p className="text-gray-500">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <div
          className="text-center"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-in-out"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span>
              <VscEmptyWindow className="text-4xl text-gray-400" />
            </span>
            <h1 className="text-3xl font-semibold text-gray-500">
              No Announcements Available
            </h1>
          </div>
          <div className="flex justify-center items-center" data-aos="zoom-in" data-aos-delay="100">
            <img className="w-60" src={noFound} alt="Not Found" />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {announcements.map((ann, index) => (
            <motion.div
              key={ann._id}
              className="p-5 rounded-xl bg-white shadow hover:shadow-lg border hover:border-secondary transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{ann.title || 'Announcement'}</h3>
              <p className="text-gray-600">{ann.description}</p>
              <p className="text-sm text-gray-500 mt-3">
                📅 {new Date(ann.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
