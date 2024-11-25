import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
    role: string;
    exp: number;
    [key: string]: any;
}

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: React.ReactNode;
}

export const getRoleFromToken = (token: string): string | null => {
    try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.role;
    } catch (error) {
        return null;
    }
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const token = localStorage.getItem('jwt');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const role = getRoleFromToken(token);
        if (!role || !allowedRoles.includes(role)) {
            return <Navigate to="/login" />;
        }
        return <>{children}</>;
    } catch (error) {
        console.error('Error decoding token:', error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;