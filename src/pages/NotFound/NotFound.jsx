// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router';
import img404 from '../../assets/images/404 error with person looking for-cuate.png'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img className='w-150 h-150' src={img404} alt="" />
      <Link
        to="/"
        className="bg-[#678314] hover:bg-[#5a7410] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
