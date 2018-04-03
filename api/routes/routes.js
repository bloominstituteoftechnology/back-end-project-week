 const express = require('express');
 const userControllers = require('../controllers/userControllers');
  const todoControllers = require('../controllers/todoControllers');
  const app = express();

  app.route('/newuser').post(userControllers.createUser);

  app.route('/login').post(userControllers.login);

  app.route('/newtodo').post(todoControllers.createNewTodo);

  app.route('/todos').get(todoControllers.getTodos);

  app
    .route('/todos/:id')
    .get(todoControllers.updateTodo)
    .delete(todoControllers.deleteTodo);

module.exports = app;