import React from 'react';
import Login from '../pages/login/Login';
import { Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    const status = localStorage.getItem('token');
    return (
        status !== '' ? <Outlet /> : <Login/>
    )
};

export default ProtectedRoutes;