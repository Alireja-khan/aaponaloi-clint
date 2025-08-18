import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBullhorn, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { BsMegaphoneFill } from 'react-icons/bs';
import noFound from '../../assets/images/Empty-cuate.png';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredAnnouncements = announcements.filter(ann =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
              <BsMegaphoneFill className="text-primary" />
              Latest <span className="text-primary">Announcements</span>
            </h2>
            <p className="text-gray-600 mt-2">Stay updated with community news and important notices</p>
          </div>

          {announcements.length > 0 && (
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="" />
              </div>
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {!loading && announcements.length === 0 && (
          <motion.div
            className="text-center bg-primary/20 rounded-xl shadow-sm p-8 border border-secondary/50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <img
                src={noFound}
                alt="No announcements found"
                className="w-64 h-64 mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Announcements Available
              </h3>
              <p className="text-gray-500 mb-6">
                There are currently no announcements. Check back later for updates.
              </p>
            </div>
          </motion.div>
        )}

        {/* Announcements Grid */}
        {filteredAnnouncements.length > 0 && (
          <motion.div
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {filteredAnnouncements.map((ann, index) => (
              <motion.div
                key={ann._id}
                className="bg-primary/20 rounded-xl shadow-sm overflow-hidden border border-secondary/50 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary bg-opacity-10 rounded-full">
                      <FaBullhorn className="text-primary text-lg" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                      {ann.title || 'Announcement'}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {ann.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(ann.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No results for search */}
        {announcements.length > 0 && filteredAnnouncements.length === 0 && (
          <motion.div
            className="text-center bg-primary/20 rounded-xl shadow-sm p-8 border border-secondary/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-md mx-auto">
              <FaSearch className="text-4xl  mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No announcements found
              </h3>
              <p className="text-gray-500 mb-4">
                No announcements match your search for "<span className="font-medium">{searchTerm}</span>"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Announcements;