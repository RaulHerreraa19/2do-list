import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const { login } = useContext(AuthContext); // Agregar contexto de autenticación
    const [body, setBody] = useState({ username: '', password: '' });
    const [error, setError] = useState(''); // Para manejar errores
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBody({ ...body, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', body);
            let token = response.data.data.token;
            let username = response.data.data.username;

            // Almacenar el token y el nombre de usuario

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            // Actualizar el estado de autenticación
            login(token, username); // Suponiendo que login actualiza el estado

            // Redirigir al dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Usuario o contraseña incorrectos'); // Manejo de errores
        }
    };
    useState(() => {
        localStorage.clear();
    }
        , []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow">
                <h1 className="text-center mb-4">Iniciar sesión</h1>
                {error && <div className="alert alert-danger">{error}</div>} {/* Mensaje de error */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={body.username}
                            name="username"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={body.password}
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                            Iniciar sesión
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setBody({ username: '', password: '' })}
                        >
                            Limpiar
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <a href="http://localhost:3000/register">Crear Cuenta</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
