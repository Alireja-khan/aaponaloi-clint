import React, { useContext, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { BsPersonLinesFill } from 'react-icons/bs';
import { FaBullhorn, FaBars, FaTimes } from 'react-icons/fa';

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
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center p-4 lg:hidden shadow-md bg-primary/10">
        <h2 className="text-xl font-bold text-[#222222]">User Dashboard</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-800 focus:outline-none">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-primary/10 shadow-md p-6 flex-col transition-all duration-300
        ${menuOpen ? 'flex' : 'hidden'} lg:flex lg:w-72`}
      >
        <h2 className="text-2xl font-bold mb-6 text-[#222222] hidden lg:block">User Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150
                ${isActive
                  ? 'bg-primary/50 text-black font-semibold shadow'
                  : 'text-gray-700 hover:text-black hover:bg-primary/20'}`
              }
              onClick={() => setMenuOpen(false)} // Close on mobile
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
