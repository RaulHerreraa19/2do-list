// src/pages/Index.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Bienvenido a la Lista de Tareas</h1>
            <p>
                Esta aplicación te permite gestionar tus tareas de manera eficiente.
                Puedes agregar, eliminar y marcar tareas como completadas.
            </p>
            <p>¿Aún no tienes una cuenta? Regístrate ahora.</p>
            <Link to="/register">
                <button style={{ margin: '10px', padding: '10px 20px' }}>
                    Registrarse
                </button>
            </Link>
            <p>Si ya tienes una cuenta, puedes iniciar sesión.</p>
            <Link to="/login">
                <button style={{ margin: '10px', padding: '10px 20px' }}>
                    Iniciar Sesión
                </button>
            </Link>
        </div>
    );
};

export default Index;
