import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes({userState}) {
    return (
        userState ? <Outlet /> : <Navigate to='/'/>
    )
};

export default ProtectedRoutes;