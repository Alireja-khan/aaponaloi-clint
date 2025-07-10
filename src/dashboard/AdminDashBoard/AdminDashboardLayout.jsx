import React from 'react';
import { NavLink, Outlet } from 'react-router';

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8f9fa] to-[#e2e8f0]">
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-[#222222]">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/admin-dashboard/profile" className={({ isActive }) => isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'}>
            Admin Profile
          </NavLink>
          <NavLink to="manage-members" className={({ isActive }) => isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'}>
            Manage Members
          </NavLink>
          <NavLink to="make-announcement" className={({ isActive }) => isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'}>
            Make Announcement
          </NavLink>
          <NavLink to="agreement-requests" className={({ isActive }) => isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'}>
            Agreement Requests
          </NavLink>
          <NavLink to="manage-coupons" className={({ isActive }) => isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'}>
            Manage Coupons
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
