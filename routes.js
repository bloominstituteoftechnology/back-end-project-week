const NoteController = require('./controllers/note.controller');
const UserController = require('./controllers/user.controller');
const AuthController = require('./controllers/auth.controller');

const requireLogIn = require('./config/passport').requireLogIn;
const requireAuth = require('./config/passport').requireAuth;

module.exports = (app) => {
  //= =================
  // Auth-User Routes
  //= =================

  // app.all('*', AuthController.logIn);

  // Register a new user
  app.route('/users')
    .post(UserController.createUser);

  // View all the users
  app.route('/users', requireAuth)
    .get(UserController.getUsers);

  // Login an existing user
  app.route('/login', requireLogIn)
    .post(AuthController.logIn);

  //= =================
  // Note Routes
  //= =================

  // require login needs to restrict these routes
  app.route('/')

  app.route('/notes')
    .get(NoteController.getNotes);

  app.route('/new-note')
    .post(NoteController.addNote);

  app.route('/notes/:id')
    .get(NoteController.viewNote);

  app.route('/edit-note')
    .put(NoteController.editNote);

  app.route('/notes/:id')
    .delete(NoteController.deleteNote);

}