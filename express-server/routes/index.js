const express = require('express');
const toDoController = require('../controllers/index');
const { validateToken } = require('../services/auth');

const server = express.Router();

server.route('/')
.get(toDoController.getToDos)
.post(toDoController.addToDo)
.put(toDoController.updateToDo);

server.route('/:id')
.get(toDoController.getToDo)
.delete(toDoController.deleteToDo);

export default server;