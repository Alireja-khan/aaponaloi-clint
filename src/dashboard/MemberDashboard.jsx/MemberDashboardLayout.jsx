import React from 'react';
import { NavLink, Outlet } from 'react-router';

const MemberDashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8f9fa] to-[#e2e8f0]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-[#222222]">Member Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/member-dashboard/profile"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="/member-dashboard/make-payment"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'
            }
          >
            Make Payment
          </NavLink>
          <NavLink
            to="/member-dashboard/payment-history"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'
            }
          >
            Payment History
          </NavLink>
          <NavLink
            to="/member-dashboard/announcements"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-[#D9822B]' : 'text-gray-700 hover:text-[#D9822B]'
            }
          >
            Announcements
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MemberDashboardLayout;
