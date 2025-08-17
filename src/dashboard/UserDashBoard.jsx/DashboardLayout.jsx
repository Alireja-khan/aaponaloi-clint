import React, { useContext, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { BsPersonLinesFill } from 'react-icons/bs';
import { FaBullhorn, FaBars, FaTimes } from 'react-icons/fa';
import AaponaloiLogo from '../../shared/AaponaloiLogo';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const navItems = [
    { path: '/user-dashboard/profile', label: 'My Profile', icon: <BsPersonLinesFill /> },
    { path: '/user-dashboard/announcements', label: 'Announcements', icon: <FaBullhorn /> },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-primary/20">
      {/* Mobile Header */}
      <header className="lg:hidden bg-primary/10 shadow-md">
        <div className="flex justify-between items-center p-4">
          <Link to="/" className="flex items-center">
            <span className="w-10 h-8">
              <AaponaloiLogo />
            </span>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">User Dashboard</h1>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`bg-primary/10 shadow-md p-6 flex-col transition-all duration-300
          ${menuOpen ? 'flex' : 'hidden'} lg:flex lg:w-72`}
      >
        {/* Logo with Home Link - Consistent across all devices */}
        <Link 
          to="/" 
          className="flex items-center gap-3 mb-8 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="w-14 h-12">
            <AaponaloiLogo />
          </span>
          <span className="text-xl font-bold tracking-tight hidden lg:block">Aaponaloi</span>
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 hidden lg:block">User Dashboard</h2>
        
        <nav className="flex flex-col gap-2">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive
                  ? 'bg-primary/60 text-black font-medium shadow-md'
                  : 'text-gray-700 hover:bg-primary/30 hover:text-black'}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-sm lg:text-base">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;