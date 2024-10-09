// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Dashboard = () => {
  const [data, setData] = useState([]); // Hook de useState debe estar dentro del componente
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username');
  // Función para obtener las tareas

  const GetTasks = () => {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    axios.post('http://localhost:3000/tasks', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      });
  };

  // Llamada a GetTasks cuando el componente se monta
  useEffect(() => {
    GetTasks();
  }, []); // [] asegura que se ejecute solo una vez cuando el componente se monta

  return (
    <div>
      <h2>Bienvenido al Dashboard </h2>
      <h4>Usuario conectado: {user}</h4>
      <p>Aquí puedes ver el resumen de tus actividades.</p>
      <div className="container mt-5">
        <h2>Data Table</h2>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
              <th scope="col">Descripción</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No se encontraron tareas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
