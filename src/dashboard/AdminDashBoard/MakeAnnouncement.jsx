import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaBullhorn, FaCalendarAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import announcementImg from '../../assets/images/Happy announcement-cuate.png';

const MakeAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('https://aaponaloi-server.vercel.app/announcements', { title, description });
      toast.success('Announcement created successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-14 lg:pl-10 px-4">
      <h2
  className="text-2xl sm:text-3xl md:text-4xl pb-6 md:pb-9 font-bold flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-gray-800"
  data-aos="fade-down"
>
  <FaBullhorn className="text-secondary text-3xl sm:text-4xl" />
  <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
    Make <span className="text-secondary">Announcement</span>
  </span>
</h2>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Form Section */}
        <motion.div
          className="w-full lg:w-2/3 bg-primary/20 rounded-2xl shadow-lg border border-secondary p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Enter title"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Enter description"
                rows={5}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 bg-primary text-black hover:text-white rounded-lg font-semibold hover:bg-secondary/80 transition duration-200 flex items-center justify-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </motion.div>

        {/* Preview Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="bg-primary/20 rounded-xl shadow-lg border border-secondary p-6 w-full min-h-[200px] overflow-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
            {title || description ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-white border-l-4 border-primary">
                  <h4 className="font-bold text-gray-800">{title || 'Announcement Title'}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {description || 'Announcement description will appear here...'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Your announcement preview will appear here</p>
              </div>
            )}
          </div>

          <div className="hidden lg:block mt-6">
            <img
              src={announcementImg}
              alt="Announcement illustration"
              className="w-full max-w-xs mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
