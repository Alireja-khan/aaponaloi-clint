import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const PrivateRoutes = () => {
  const { user, loading, role } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to role-specific dashboards when accessing just "/dashboard"
  if (location.pathname === '/dashboard') {
    if (role === 'admin') return <Navigate to="/admin-dashboard" replace />;
    if (role === 'member') return <Navigate to="/member-dashboard" replace />;
    return <Navigate to="/dashboard/user" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
