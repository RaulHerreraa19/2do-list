const express = require('express');
const router = express.Router();
const TaskController = require('../Controller/TareasController');
const UserController = require('../Controller/UserController');

// Rutas
router.get('/GetUser', UserController.Login);
router.post('/CreateUser', UserController.CreateUser);
router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.post('/addtasks', TaskController.addTask);
router.post('/edittasks/:id', TaskController.updateTask);
router.post('/tasks/:id', TaskController.deleteTask);

module.exports = router;
