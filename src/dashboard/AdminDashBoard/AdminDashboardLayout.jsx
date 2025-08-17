import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaBullhorn, FaFileContract, FaTags, FaBars, FaTimes } from 'react-icons/fa';
import { BsPersonLinesFill } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi2';
import AaponaloiLogo from '../../shared/AaponaloiLogo';

const AdminDashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: '/admin-dashboard/dashboard-overview', label: 'Dashboard Overview', icon: <BsPersonLinesFill /> },
    { path: '/admin-dashboard/profile', label: 'Admin Profile', icon: <BsPersonLinesFill /> },
    { path: 'manage-members', label: 'Manage Members', icon: <HiUserGroup /> },
    { path: 'make-announcement', label: 'Make Announcement', icon: <FaBullhorn /> },
    { path: 'agreement-requests', label: 'Agreement Requests', icon: <FaFileContract /> },
    { path: 'manage-coupons', label: 'Manage Coupons', icon: <FaTags /> },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-primary/20">
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center p-4 lg:hidden shadow-md bg-primary/10">
        <h2 className="text-xl font-bold text-[#222222]">Admin Dashboard</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-800 focus:outline-none">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-primary/10 shadow-md p-6 flex-col transition-all duration-300
        ${menuOpen ? 'flex' : 'hidden'} lg:flex lg:w-72`}
      >

        <Link to="/" className="hidden lg:flex items-center gap-2 mb-6 cursor-pointer">
          <span className="w-14 h-12"><AaponaloiLogo /></span>
          <span className="text-xl font-bold tracking-tight">Aaponaloi</span>
        </Link>


        <h2 className="text-2xl font-bold mb-6 text-[#222222] hidden lg:block">Admin Dashboard</h2>
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
              onClick={() => setMenuOpen(false)} // close on mobile after selection
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

export default AdminDashboardLayout;
