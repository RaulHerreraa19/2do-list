const express = require('express');
const router = express.Router();
const TaskController = require('../Controller/TareasController');
const UserController = require('../Controller/UserController');
const AuthController = require('../Controller/AuthController');
const validateToken = require('../middleware/validateToken');

// Rutas
router.post('/login', AuthController.login);
router.post('/CreateUser', UserController.CreateUser);

// Rutas de tareas
router.post('/tasks', validateToken, TaskController.getAllTasks);      
router.post('/getTask', validateToken, TaskController.GetTaskById);    
router.post('/addtask', validateToken, TaskController.addTask);       
router.post('/edittasks', validateToken, TaskController.updateTask); 
router.post('/deleteTask', validateToken, TaskController.deleteTask);   


module.exports = router;
