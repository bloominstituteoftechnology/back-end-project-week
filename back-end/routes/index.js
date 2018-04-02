module.exports = (app) => {
  const userController = require('../controllers/users');
  const noteController = require('../controllers/notes');

  //create user
  app.route('/').post(userController.createUser);

  //login user
  app.route('/').post(userController.loginUser);

  //logout user
  app.route('/').post(userController.logoutUser);

  //create note
  app.route('/').post(noteController.createNote);

  //update note
  app.route('/').put(noteController.updateNote);

  //delete note
  app.route('/').delete(noteController.deleteNote);

  //get note
  app.route('/').get(noteController.getNote);

  //get notes
  app.route('/').get(noteController.getNotes);
};
