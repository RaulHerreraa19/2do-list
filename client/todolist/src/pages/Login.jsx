import { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

function Login() {
    const [body, setBody] = useState({ username: '', password: '' })

    const handleChange = (e) => {
        setBody({ ...body, [e.target.name]: e.target.value })
    }

    //login with axios
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/login', body)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow">
                <h1 className="text-center mb-4">Iniciar sesión</h1>
                <form>
                    <div className="form-group mb-3">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={body.username}
                            name="username"
                            onChange={handleChange}
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
                        />
                    </div>
                </form>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Iniciar sesión
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setBody({ username: '', password: '' })}
                    >
                        Limpiar
                    </button>
                </div>
                <div className="text-center mt-3">
                    <a href="localhost:3000/register">Crear Cuenta</a>
                </div>
            </div>
        </div>
    );
}

export default Login;