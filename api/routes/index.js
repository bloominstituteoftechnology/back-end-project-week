const { getUserController } = require('../controllers');
// a server function being exported
module.exports = server => {
  server
    .route('/users')
    .get(getUserController.getUsers)
    .post(getUserController.createUser);
  server
    .get('/users/:id', getUserController.getUserById)
    .put('/users/:id', getUserController.editUser)
    .delete('/users/:id', getUserController.deleteUser);
  server.put('/users/:id/changepassword', getUserController.changePassword);
};
