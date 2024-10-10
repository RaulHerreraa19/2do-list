// src/pages/Register.jsx

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createUser = async (e) => {
        e.preventDefault(); // Prevenir la recarga de la página
        try {
            const response = await axios.post('http://localhost:3000/CreateUser', formData);
            console.log(response.data);
            if (response.data) {
                alert('Usuario creado correctamente');
                navigate('/login'); // Redirigir a la página de inicio de sesión después de crear el usuario
            } else {
                alert('Error al crear el usuario');
            }
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al crear el usuario');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Regístrate</h2>
            <form onSubmit={createUser}>
                <input type="text" name="username" placeholder="Nombre" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Correo" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" required onChange={handleChange} />
                <input type="number" name="cellphone" placeholder="Teléfono" maxLength={10} required onChange={handleChange} />
                <button type="submit">Registrarse</button>
            </form>
            <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default Register;
