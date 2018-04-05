module.exports = async (app) => {
  const userControllers = require('../controllers/userControllers');
  //const postControllers = require('../controllers/postControllers');

  app.route('/register')
    .post(userControllers.createUser);
  
  app.route('/login')
    .post(userControllers.login);
  
  app.route('/new-note')
    .post(userControllers.createNewNote);

  app.route('/notes/:uid')
    .get(userControllers.getAllNotes);

  // app.route('/notes/:id')
  //   .get(userControllers.getNoteById);
  
  app.route('/edit/:id&:userUID')
    .put(userControllers.editNoteById);

  app.route('/delete/:id&:userUID')
    .delete(userControllers.deleteNote);
};