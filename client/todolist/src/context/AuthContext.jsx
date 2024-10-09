// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
export const AuthContext = createContext();

// Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    const login = (token, user) => {
        setIsAuthenticated(true);
        setUsername(user);
        localStorage.setItem('token', token);
        localStorage.setItem('username', user);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
