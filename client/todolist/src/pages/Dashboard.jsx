import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';
import ProfileDropdown from '../pages/DropDawnProfile';
import profileimage from '../assets/perfil.jpg'

// Formato de fecha
const formatDate = (date) => {
  if (!date) return '';

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('es-MX', options);
};

// Conversión de fecha
const convertDateToDateTime = (dateString) => {
  if (!dateString) return null;

  const [day, month, year] = dateString.split('/');

  if (day && month && year) {
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() === parseInt(year) && date.getMonth() === (parseInt(month) - 1) && date.getDate() === parseInt(day)) {
      return date;
    }
  }

  console.error('Fecha no válida:', dateString);
  return null;
};

const Dashboard = () => {

  const navigate = useNavigate();
  const { isAuthenticated, username } = useAuth();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal para ver/editar tarea
  const [showAddModal, setShowAddModal] = useState(false); // Modal para agregar tarea
  const [modalType, setModalType] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', status: '', created_date: '', end_date: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', status: '', created_date: '', end_date: '' });
  const userImage = profileimage;

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username');

  // Obtener tareas
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    // Verifica si el token existe
    if (!token) {
      navigate('/login'); // Redirige al login si no hay token
    } else {
      // Llama a la función GetTasks si el token es válido
      GetTasks();
      // Aquí podrías agregar más lógica para verificar la validez del token
    }
  }, [navigate]);

  // Mostrar modal para ver detalles o editar
  const handleShowModal = (task, type) => {
    setSelectedTask(task);
    setModalType(type);
    if (type === 'edit') {
      setEditForm({
        title: task.title,
        description: task.description,
        status: task.status,
        created_date: task.created_date.split('T')[0], // Ajustar formato para el input de tipo date
        end_date: task.end_date.split('T')[0] // Ajustar formato para el input de tipo date
      });
    }
    setShowModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  // Cerrar modal de agregar tarea
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewTask({ title: '', description: '', status: '', created_date: '', end_date: '' });
  };

  // Manejar cambios en el formulario de edición
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // Guardar cambios al editar
  const handleSaveEdit = () => {
    const updatedTask = { ...selectedTask, ...editForm };

    axios.post(`http://localhost:3000/editTasks/`, {
      id: selectedTask.id,
      ...updatedTask
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setData(data.map(task => (task.id === selectedTask.id ? updatedTask : task)));
        handleCloseModal();
      })
      .catch(error => {
        console.error("Error updating task:", error.response?.data || error.message);
      });
  };

  // Manejar la eliminación de la tarea
  const handleDeleteTask = (id) => {
    axios.post('http://localhost:3000/deleteTask/', {
      id: id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Tarea eliminada:', response.data);
        setData(data.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar la tarea:', error.response?.data || error.message);
      });
  };

  // Manejar cambios en el formulario de nueva tarea
  const handleAddChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  // Guardar nueva tarea
  const handleSaveNewTask = () => {
    // Verifica si las fechas están definidas antes de convertirlas
    if (!newTask.created_date || !newTask.end_date) {
      console.error('Las fechas son requeridas');
      return;
    }

    let createdDate;
    let endDate;

    try {
      // Intenta convertir las fechas
      createdDate = convertDateToDateTime(newTask.created_date);
      endDate = convertDateToDateTime(newTask.end_date);
    } catch (error) {
      console.error('Error al convertir las fechas:', error.message);
      alert('Las fechas no son válidas, no se enviarán los datos');
      return;
    }

    const formData = {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      created_date: createdDate,
      end_date: endDate
    };

    console.log(formData)

    axios.post('http://localhost:3000/addtask', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setData([...data, response.data.data]); // Agregar nueva tarea a la tabla
        handleCloseAddModal(); // Cerrar el modal al guardar
      })
      .catch(error => {
        console.error("Error adding task:", error.response?.data || error.message);
      });
  };


  return (
    <div>
      <div className="container mt-5 d-flex justify-content-between align-items-center">
        <div className="container text-center">
          <h4>Usuario conectado: {user}</h4>
          <p>Aquí puedes ver tus tareas pendientes</p>
          <hr />
        </div>
        <ProfileDropdown userImage={userImage} />
      </div>

      <div className="container mt-5">
        <Button className="mb-3" variant="success" onClick={() => setShowAddModal(true)}>
          Agregar Tarea
        </Button>
        <hr />
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
              <th scope="col">Descripción</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha de creación</th>
              <th scope="col">Fecha de término</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{formatDate(item.created_date)}</td>
                  <td>{formatDate(item.end_date)}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleShowModal(item, 'view')}>
                      Ver Detalles
                    </button>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleShowModal(item, 'edit')}>
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTask(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron tareas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para ver detalles o editar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'view' ? 'Detalles de la tarea' : 'Editar tarea'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'view' ? (
            <>
              <p><strong>Título:</strong> {selectedTask?.title}</p>
              <p><strong>Descripción:</strong> {selectedTask?.description}</p>
              <p><strong>Estado:</strong> {selectedTask?.status}</p>
              <p><strong>Fecha de Creación:</strong> {formatDate(selectedTask?.created_date)}</p>
              <p><strong>Fecha de Fin:</strong> {formatDate(selectedTask?.end_date)}</p>
            </>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="status"
                  value={editForm.status}
                  defaultValue={"Pendiente"}
                  onChange={handleEditChange}
                >
                  <option readOnly value="Sin estatus"  >Seleccione un estado</option>
                  <option value="Pendiente" selected>Pendiente</option>
                  <option value="Urgente">Urgente</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de creación</Form.Label>
                <Form.Control
                  readOnly
                  type="date"
                  name="created_date"
                  value={editForm.created_date}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de término</Form.Label>
                <Form.Control
                  type="date"
                  name="end_date"
                  value={editForm.end_date}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          {modalType === 'edit' && (
            <Button variant="primary" onClick={handleSaveEdit}>
              Guardar Cambios
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar tarea */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleAddChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newTask.description}
                onChange={handleAddChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="status"
                value={newTask.status}
                defaultValue={"Pendiente"}
                onChange={handleEditChange}
              >
                <option value="Sin estatus" >Seleccione un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Urgente">Urgente</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de creación</Form.Label>
              <Form.Control
                type="date"
                name="created_date"
                value={newTask.created_date}
                onChange={handleAddChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de término</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={newTask.end_date}
                onChange={handleAddChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveNewTask}>
            Guardar Tarea
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
