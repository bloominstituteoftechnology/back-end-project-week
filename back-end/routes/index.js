const loggedIn = require('../middleware/loggedIn');

module.exports = (app) => {
  const userController = require('../controllers/users');
  const noteController = require('../controllers/notes');

  //create user
  app.route('/notes/createuser').post(userController.createUser);

  //login user
  app.route('/notes/login/').post(userController.loginUser);

  //logout user
  app.route('/notes/logout/').post(userController.logoutUser);

  //create note
  app.route('/notes/:userId').post(loggedIn, noteController.createNote);

  //update note
  app.route('/notes/:userId/:noteId').put(loggedIn, noteController.updateNote);

  //delete note
  app.route('/notes/:userId/:noteId').delete(loggedIn, noteController.deleteNote);

  //get note
  app.route('/notes/:userId/:noteId').get(loggedIn, noteController.getNote);

  //get notes
  app.route('/notes/:userId').get(loggedIn, noteController.getNotes);
};
