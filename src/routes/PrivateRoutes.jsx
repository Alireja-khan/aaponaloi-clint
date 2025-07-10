import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const PrivateRoutes = () => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    // Render nested routes here
    return <Outlet />;
};

export default PrivateRoutes;
