// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el hook useAuth

const PrivateRoute = ({ children }) => {
    const { username } = useAuth(); // Cambié 'user' a 'username' según el contexto que definimos

    return username ? children : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
