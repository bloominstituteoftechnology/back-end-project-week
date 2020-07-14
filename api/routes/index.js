const { userController } = require('../controllers');
const { notesController } = require('../controllers');
const { authenticate } = require('../utils/middleware');

// a server function being exported
module.exports = server => {
  // general route
  server.get('/api', (req, res) => {
    res.status(200).json({ msg: 'api running' });
  });
  // user routes
  server
    .route('/api/users')
    .get(userController.getUsers)
    .post(userController.createUser);
  server
    .route('/api/users/:id')
    .get(userController.getUserById)
    .put(userController.editUser)
    .delete(userController.deleteUser);

  server.put('/api/users/:id/changepassword', userController.changePassword);

  server.route('/api/users/login').post(userController.login);

  // note routes
  server.get('/api/notes', authenticate, notesController.getNotes); // need to change so only certain users can access
  server
    .route('/api/users/:id/notes')
    .get(authenticate, notesController.getUserNotes)
    .post(authenticate, notesController.createNote);

  server
    .route('/api/users/:id/notes/:note_Id')
    .get(authenticate, notesController.getNoteById)
    .put(authenticate, notesController.updateNoteById)
    .delete(authenticate, notesController.deleteNoteById);
};
