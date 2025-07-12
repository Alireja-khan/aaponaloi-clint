import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaBullhorn, FaFileContract, FaTags } from 'react-icons/fa';
import { BsPersonLinesFill } from 'react-icons/bs';
import { HiUserGroup } from "react-icons/hi2";

const AdminDashboardLayout = () => {
  const navItems = [
    { path: '/admin-dashboard/profile', label: 'Admin Profile', icon: <BsPersonLinesFill /> },
    { path: 'manage-members', label: 'Manage Members', icon: <HiUserGroup /> },
    { path: 'make-announcement', label: 'Make Announcement', icon: <FaBullhorn /> },
    { path: 'agreement-requests', label: 'Agreement Requests', icon: <FaFileContract /> },
    { path: 'manage-coupons', label: 'Manage Coupons', icon: <FaTags /> },
  ];

  return (
    <div className="min-h-screen flex bg-primary/20">
      <aside className="w-74 bg-primary/10 shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-[#222222]">Admin Dashboard</h2>
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
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
