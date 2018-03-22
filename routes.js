// const AuthController = require('./controllers/auth.controller');
const NoteController = require('./controllers/note.controller');
const UserController = require('./controllers/user.controller');
const AuthController = require('./controllers/auth.controller');
// const express = require('express');
// const passport = require('passport');
const requireLogIn = require('./config/passport').requireLogIn;
const requireAuth = require('./config/passport').requireAuth;

// middleware to make login/auth required
// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // const apiRoutes = express.Router();
  // const authRoutes = express.Router();
  // const userRoutes = express.Router();
  // const noteRoutes = express.Router();
  //= =================
  // Auth Routes
  //= =================
  // apiRoutes.use('/auth', authRoutes);

  // registration route
  // authRoutes.post('/register', AuthController.register);

  // login route
  // authRoutes.post('/login', requireLogin, AuthController.login);

  //= =================
  // User Routes
  //= =================

  // apiRoutes.use('/user', userRoutes);

  // view user profile route
  // userRoutes.get('/userId', requireAuth, UserController.viewProfile)

  // Test protected route
  // apiRoutes.get('/protected', requireAuth, (req, res) => {
  //   res.send({ content: 'The protected test route is working!'})
  // });

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
  // apiRoutes.use('/notes', noteRoutes);
  app.route('/')

  app.route('/notes', requireLogIn)
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