// src/pages/Register.jsx

import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const createUser = async (user) => {
    axios.post('http://localhost:3001/CreateUser', user)
        .then((response) => {
            console.log(response.data);
            if (response.data) {
                alert('Usuario creado correctamente');
            }
            else{
                alert('Error al crear el usuario');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }  


const Register = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Registrate</h2>
            <form>
                {/* Aquí puedes añadir los campos de registro */}
                <input type="text" placeholder="Nombre" required />
                <input type="email" placeholder="Correo" required />
                <input type="password" placeholder="Contraseña" required />
                <input type="text" placeholder="telefono" maxLength={10} required />
                <button type="submit" onClick={createUser}>Registrarse</button>
            </form>
            <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default Register;
