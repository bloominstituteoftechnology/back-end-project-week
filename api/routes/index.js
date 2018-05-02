const { userController } = require('../controllers');
const { notesController } = require('../controllers');
const { authenticate } = require('../utils/middleware');

// a server function being exported
module.exports = server => {
  // general route
  server.get('/', (req, res) => {
    res.status(200).json({ msg: 'api running' });
  });
  // user routes
  server
    .route('/users')
    .get(userController.getUsers)
    .post(userController.createUser);
  server
    .route('/users/:id')
    .get(userController.getUserById)
    .put(userController.editUser)
    .delete(userController.deleteUser);

  server.put('/users/:id/changepassword', userController.changePassword);

  server.route('/users/login').post(userController.login);

  // note routes
  server.get('/notes', authenticate, notesController.getNotes); // need to change so only certain users can access
  server
    .route('/users/:id/notes')
    .get(authenticate, notesController.getUserNotes)
    .post(authenticate, notesController.createNote);

  server
    .route('/users/:id/notes/:note_Id')
    .get(authenticate, notesController.getNoteById)
    .put(authenticate, notesController.updateNoteById)
    .delete(authenticate, notesController.deleteNoteById);
};
