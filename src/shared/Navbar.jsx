  import React, { useContext, useRef, useState, useEffect } from 'react';
  import { NavLink, useNavigate } from 'react-router';
  import { motion, AnimatePresence } from 'framer-motion';
  import { FaChevronDown, FaUserCircle } from 'react-icons/fa';
  import useClickOutside from '../hooks/useClickOutside';
  import { AuthContext } from '../contexts/AuthContext/AuthContext';
  import AaponaloiLogo from './AaponaloiLogo';
  import { triggerScrollToTop } from './ScrollToTop';

  const Navbar = ({bannerLoading}) => {
    const { user, signOutUser } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => setDropdownOpen(false));

    useEffect(() => {
      const onScroll = () => {
        setIsScrolled(window.scrollY > 80); // show bg after 80px
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
          <NavLink to="/" end className="font-medium text-lg px-3 py-1.5 rounded">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/apartments" className="font-medium text-lg px-3 py-1.5 rounded">
            Apartments
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="font-medium text-lg px-3 py-1.5 rounded">
            Contact
          </NavLink>
        </li>
        {sectionLinks.map((section) => (
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

    return (
      <div
        className={`transition-all duration-300 ${
        location.pathname === '/' && !isScrolled
          ? bannerLoading
            ? 'absolute top-0 left-0 w-full bg-transparent text-black'
            : 'absolute top-0 left-0 w-full bg-transparent text-white'
          : 'fixed top-0 left-0 w-full bg-[#adc17826] backdrop-blur-2xl shadow-md text-black'
      } z-50`}  
      >
        <div className="navbar px-4 lg:px-36">
          {/* Navbar Start */}
          <div className="navbar-start">
            {/* Hamburger */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost">
                ☰
              </button>
            </div>

            {/* Logo */}
            <div className="hidden lg:flex items-center gap-2 cursor-pointer">
              <span className="w-20 h-18"><AaponaloiLogo /></span>
              <span className="text-2xl font-bold tracking-tight">Aaponaloi</span>
            </div>
          </div>

          {/* Navbar center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end ">
            <div ref={dropdownRef} className=" relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center bg-primary gap-1 cursor-pointer rounded-full border p-1 hover:scale-105 transition"
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
                  className={`text-sm text-black transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : 'rotate-0'
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
          </div>
        </div>
      </div>
    );
  };

  export default Navbar;
