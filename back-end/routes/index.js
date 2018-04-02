module.exports = (app) => {
  const userController = require('../controllers/users');
  const noteController = require('../controllers/notes');

  //create user
  app.route('/notes/createuser').post(userController.createUser);

  //login user
  app.route('/notes/login').post(userController.loginUser);

  //logout user
  app.route('/notes/logout').post(userController.logoutUser);

  //create note
  app.route('/notes/').post(noteController.createNote);

  //update note
  app.route('/notes/:id').put(noteController.updateNote);

  //delete note
  app.route('/notes/:id').delete(noteController.deleteNote);

  //get note
  app.route('/notes/:id').get(noteController.getNote);

  //get notes
  app.route('/notes').get(noteController.getNotes);
};
