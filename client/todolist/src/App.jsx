import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [body, setBody] = useState({ username, password })

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value })
  }

  //login with axios
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/login', body)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <form className='form-control'>
        <div>
          <label>Usuario:</label>
          <input value={username} onChange={handleChange} />
        </div>
        <div>
          <label>Contraseña:</label>
          <input value={password} onChange={handleChange} />
        </div>
      </form>

      <button className='btn btn-primary' onClick={handleSubmit}>Iniciar sesión</button>
    </>
  )
}

export default App
