import React, { useContext, useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaUserCircle, FaTimes, FaBars } from 'react-icons/fa';
import useClickOutside from '../hooks/useClickOutside';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import AaponaloiLogo from './AaponaloiLogo';

const Navbar = ({ bannerLoading }) => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useClickOutside(dropdownRef, () => setDropdownOpen(false));
  useClickOutside(mobileMenuRef, () => setIsOpen(false));

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    navigate('/login');
  };

  const sectionLinks = ['about', 'coupons', 'location', 'Highlights', 'faq'];

  const handleSectionClick = (section) => {
    setIsOpen(false);
    setActiveSection(section);

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
          className="font-medium text-lg px-3 py-1.5 rounded"
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartments"
          className="font-medium text-lg px-3 py-1.5 rounded"
          onClick={() => setIsOpen(false)}
        >
          Apartments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className="font-medium text-lg px-3 py-1.5 rounded"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </NavLink>
      </li>
      {location.pathname === '/' && sectionLinks.map((section) => (
        <li key={section}>
          <button
            className="font-medium py-1.5 px-3 rounded text-lg transition"
            onClick={() => handleSectionClick(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        </li>
      ))}
    </>
  );

  const getNavbarStyle = () => {
    // For mobile (always show the blurred background)
    if (window.innerWidth < 1024) { // Tailwind's lg breakpoint
      return 'bg-[#adc17826] backdrop-blur-2xl shadow-md text-black';
    }

    // For desktop on home page
    if (location.pathname === '/') {
      return isScrolled
        ? 'bg-[#adc17826] backdrop-blur-2xl shadow-md text-black'
        : bannerLoading
          ? 'bg-transparent text-black'
          : 'bg-transparent text-white';
    }

    // For desktop on other pages
    return 'bg-[#adc17826] backdrop-blur-2xl shadow-md text-black';
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${getNavbarStyle()} transition-all duration-300`}>
      <div className="navbar px-4 lg:px-36">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Hamburger - Only show on mobile */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost p-2"
              aria-label="Menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Logo - Only show on desktop */}
          <div className="hidden lg:flex items-center gap-2 cursor-pointer">
            <span className="w-20 h-18">
              <AaponaloiLogo />
            </span>
            <span className="text-2xl font-bold tracking-tight">Aaponaloi</span>
          </div>
        </div>

        {/* Navbar center - Only show on desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
        </div>

        {/* Navbar End - Show login/signup or user dropdown based on auth state */}
        <div className="navbar-end">
          {user ? (
            <div ref={dropdownRef} className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center bg-primary gap-1 cursor-pointer mr-10 lg:mr-0 md:mr-20 rounded-full border p-1 hover:scale-105 transition"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover object-top"
                  />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
                <FaChevronDown
                  className={`text-sm text-black transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                />
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
                      <p className="font-semibold">{user?.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <ul className="flex flex-col">
                      <li>
                        <button
                          onClick={() => {
                            const userData = localStorage.getItem('user');
                            const role = userData ? JSON.parse(userData)?.role?.toLowerCase() : null;
                            setDropdownOpen(false);
                            if (role === 'admin') navigate('/admin-dashboard');
                            else if (role === 'member') navigate('/member-dashboard');
                            else if (role === 'user') navigate('/user-dashboard');
                            else navigate('/dashboard');
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-accent transition"
                        >
                          Dashboard
                        </button>
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
          ) : (
            !['/login', '/register'].includes(location.pathname) && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-ghost hover:bg-primary border border-secondary/50 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-ghost hover:bg-primary border border-secondary/50 font-medium"
                >
                  Sign Up
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="lg:hidden fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-40 pt-16"
          >
            <ul className="menu p-4 space-y-2">{navLinks}</ul>
            {!user && !['/login', '/register'].includes(location.pathname) && (
              <div className="px-4 space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/login');
                  }}
                  className="btn btn-ghost w-full justify-start"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/register');
                  }}
                  className="btn btn-primary w-full justify-start"
                >
                  Sign Up
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;