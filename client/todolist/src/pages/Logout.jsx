import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí borras el token de autenticación o cualquier dato relevante en localStorage
        localStorage.clear(); // O localStorage.removeItem('tuClaveDeAutenticacion');

        // Redirigir al usuario a la página de inicio
        navigate('/');
    }, [navigate]);

    // Puedes retornar null o algún componente de carga mientras se redirige
    return(
        <div>
            <h1>Cerrando sesión...</h1></div>
    )
};

export default Logout;