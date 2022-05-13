import React from 'react';
import Login from '../pages/login/Login';
import { Outlet } from 'react-router-dom';

function ProtectedRoutes({userState}) {
    return (
        userState ? <Outlet /> : <Login/>
    )
};

export default ProtectedRoutes;