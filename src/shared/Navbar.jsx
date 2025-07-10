import React, { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import useClickOutside from '../hooks/useClickOutside';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import AaponaloiLogo from './AaponaloiLogo';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext); // ✅ renamed
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const links = (
    <>
      <li><NavLink to="/" className="font-medium">Home</NavLink></li>
      <li><NavLink to="/apartments" className="font-medium">Apartments</NavLink></li>

      {user && (

          <>
          </>

        )
      }
    </>
  );

  const handleLogout = async () => {
    await signOutUser(); // ✅ fixed
    navigate('/login');
  };

  return (
    <div className="navbar bg-gradient-to-br from-[#f8f9fa] sticky to-[#e2e8f0] top-0 z-50 shadow-md px-4 lg:px-16">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className='w-15 h-13'><AaponaloiLogo /></span>
          <span className="text-xl font-bold tracking-tight">Aaponaloi</span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-md btn-primary">Sign In</NavLink>
            <NavLink to="/register" className="btn btn-md btn-secondary">Sign Up</NavLink>
          </div>
        ) : (
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer rounded-full border p-1 hover:scale-105 transition"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="user" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <FaUserCircle className="text-3xl" />
              )}
            </div>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-52 rounded-lg bg-white text-black shadow-lg z-50"
                >
                  <div className="p-4">
                    <p className="font-semibold">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <hr />
                  <ul className="menu p-2">
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li>
                      <button onClick={handleLogout} className="text-red-500 font-medium">
                        Logout
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
