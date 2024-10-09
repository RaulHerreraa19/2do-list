// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aquí puedes manejar la autenticación

    return (
        <AuthContext.Provider value={{ user, setUser }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
