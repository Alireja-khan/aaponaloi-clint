import { NavLink, useNavigate } from 'react-router';
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import AaponaloiLogo from './AaponaloiLogo2';

const Footer = () => {
  const navigate = useNavigate();

  const sectionLinks = ['about', 'coupons', 'location', 'stats', 'faq'];

  const handleSectionClick = (section) => {
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

  return (
    <footer className="bg-[#0f172a] text-white px-6 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        {/* Logo and Intro */}
        <div>
          <div className="flex flex-col">
            <AaponaloiLogo />
            <p className="-mt-5 text-xl">Aaponaloi</p>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Aaponaloi helps you manage your building efficiently. Join us to
            make your property smarter and smoother.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-white font-semibold' : 'hover:text-white transition'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/apartments"
                className={({ isActive }) =>
                  isActive ? 'text-white font-semibold' : 'hover:text-white transition'
                }
              >
                Apartments
              </NavLink>
            </li>
            {sectionLinks.map((section) => (
              <li key={section}>
                <button
                  className="hover:text-white transition text-sm"
                  onClick={() => handleSectionClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="text-gray-400 text-sm space-y-3">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-secondary" />
              <span>+880 123 456 789</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-secondary" />
              <span>Ambarkhana Point, Sylhet, Bangladesh</span>
            </li>
          </ul>

          <div className="flex gap-4 mt-6 text-gray-300">
            <a href="#" className="hover:text-primaryLight" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primaryLight" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primaryLight" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primaryLight" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Aaponaloi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
