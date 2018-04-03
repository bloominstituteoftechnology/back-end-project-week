module.exports = (app) => {
  const userControllers = require('../controllers/userControllers');
  const todoControllers = require('../controllers/todoControllers');

  app.route('/newuser')
  .post(userControllers.createUser);

  app.route('/login')
  .post(userControllers.login);

  app.route('/newtodo')
  .post(todoControllers.createNewTodo);

  app.route('/todos')
  .get(todoControllers.getAllTodos);

  app.route('/todos/:id')
  .get(todoControllers.getTodoById)
  .delete(todoControllers.deleteTodo);
};