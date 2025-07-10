import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('http://localhost:5000/announcements');
        setAnnouncements(res.data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <p>Loading announcements...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-[#D9822B]">Announcements</h1>

      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements found.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((ann) => (
            <li key={ann._id} className="border-b pb-3">
              <h2 className="font-semibold text-lg">{ann.title || 'Announcement'}</h2>
              <p className="text-gray-700">{ann.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                Date: {new Date(ann.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Announcements;
