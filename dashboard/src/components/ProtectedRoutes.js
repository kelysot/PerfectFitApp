import React from 'react';
import { Outlet , Navigate} from 'react-router-dom';

function ProtectedRoutes() {
    
    const status = localStorage.getItem('token');

    if(localStorage.getItem('token') === null) {
        localStorage.setItem('token', '');
    }

    return (
       status !== '' ? <Outlet /> : <Navigate to='/' />
    )
};

export default ProtectedRoutes;