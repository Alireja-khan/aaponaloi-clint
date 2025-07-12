import React, { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import useClickOutside from '../hooks/useClickOutside';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import AaponaloiLogo from './AaponaloiLogo';
import { triggerScrollToTop } from './ScrollToTop';

const Navbar = () => {
  const { user, signOutUser, role } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  const handleLogout = async () => {
    await signOutUser();
    navigate('/login');
  };

  const sectionLinks = ['about', 'coupons', 'location', 'Highlights', 'faq'];

  const handleSectionClick = (section) => {
    setIsOpen(false);
    setActiveSection(section); // set active section

    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `font-medium px-3 py-1.5 rounded ${isActive && activeSection === '' ? 'bg-primary font-semibold' : ''
            }`
          }
          onClick={(e) => {
            setIsOpen(false);
            setActiveSection('');
            if (window.location.pathname === '/') {
              e.preventDefault(); // prevent reload
              triggerScrollToTop(); // manual scroll
            }
          }}
        >
          Home
        </NavLink>


      </li>
      <li>
        <NavLink
          to="/apartments"
          className="font-medium"
          onClick={(e) => {
            setIsOpen(false);
            setActiveSection('');
            if (window.location.pathname === '/apartments') {
              e.preventDefault(); // prevent unnecessary navigation
              triggerScrollToTop();
            }
          }}
        >
          Apartments
        </NavLink>

      </li>

      {sectionLinks.map((section) => (
        <li key={section}>
          <button
            className={`font-medium cursor-pointer py-1.5 px-3 rounded transition ${activeSection === section ? 'bg-primary ' : ''
              }`}
            onClick={() => handleSectionClick(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        </li>
      ))}
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-[#adc17826] backdrop-blur-2xl shadow-md px-4 lg:px-36">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown Button */}
        <div className="dropdown lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {isOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          )}
        </div>

        {/* Logo */}






        <div className="flex items-center gap-2 cursor-pointer">
          <span className="w-15 h-13"><AaponaloiLogo /></span>
          <span className="text-xl font-bold tracking-tight">Aaponaloi</span>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-md text-black btn-primary">Sign In</NavLink>
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
                  className="absolute right-0 mt-3 w-56 rounded-lg bg-white text-black shadow-lg z-50"
                >
                  <div className="p-4 border-b">
                    <p className="font-semibold">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <ul className="flex flex-col">
                    <li>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="block w-full px-4 py-2 hover:bg-accent transition text-left"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-red-400 hover:text-white text-red-500 font-medium transition"
                      >
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
