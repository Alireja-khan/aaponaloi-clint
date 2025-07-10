import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8f9fa] to-[#e2e8f0]">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-[#f8f9fa] to-[#e2e8f0] shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-[#222222]">User Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-[#222222]' : 'text-gray-700 hover:text-[#222222]'
            }
          >
            My Profile
          </NavLink>
          <NavLink
            to="announcements"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-[#222222]' : 'text-gray-700 hover:text-[#222222]'
            }
          >
            Announcements
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
