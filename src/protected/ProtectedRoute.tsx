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

export const getUsernameFromToken = (token: string): string | null => {
    try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.username;
    } catch (error) {
        return null;
    }
}

export const getIdFromToken = (token: string): string | null => {
    try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.id;
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

const ProtectedHome: React.FC = () => {
    const token = localStorage.getItem('jwt');
    const roles = ['author', 'admin'];

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const role = getRoleFromToken(token);
        if (!role || !roles.includes(role)) {
            return <Navigate to="/login" />;
        }
        if (role === 'author') {
            return <Navigate to="/author" />;
        } else if (role === 'admin') {
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/login" />;
    } catch (error) {
        console.error('Error decoding token:', error);
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
export { ProtectedHome };
