import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { BsPersonLinesFill } from 'react-icons/bs';
import { FaBullhorn, FaMoneyBillWave, FaHistory } from 'react-icons/fa';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const navItems = [
    { path: 'profile', label: 'My Profile', icon: <BsPersonLinesFill /> },
    { path: 'announcements', label: 'Announcements', icon: <FaBullhorn /> },
  ];

  return (
    <div className="min-h-screen flex bg-primary/20">
      {/* Sidebar */}
      <aside className="w-72 bg-primary/10 shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-[#222222]">User Dashboard</h2>
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

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
