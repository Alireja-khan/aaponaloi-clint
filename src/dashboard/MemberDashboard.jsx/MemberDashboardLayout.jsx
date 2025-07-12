import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { BsPersonLinesFill } from 'react-icons/bs';
import { FaMoneyBillWave, FaHistory, FaBullhorn } from 'react-icons/fa';

const MemberDashboardLayout = () => {
  const navItems = [
    { path: '/member-dashboard/profile', label: 'My Profile', icon: <BsPersonLinesFill /> },
    { path: '/member-dashboard/make-payment', label: 'Make Payment', icon: <FaMoneyBillWave /> },
    { path: '/member-dashboard/payment-history', label: 'Payment History', icon: <FaHistory /> },
    { path: '/member-dashboard/announcements', label: 'Announcements', icon: <FaBullhorn /> },
  ];

  return (
    <div className="min-h-screen flex bg-primary/20">
      <aside className="w-74 bg-primary/10 shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-[#222222]">Member Dashboard</h2>
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

export default MemberDashboardLayout;
