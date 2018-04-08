const {
  addCollab,
  getNotes,
  addNote,
  editNote,
  deleteNote,
  userCreate,
  userLogin,
  userLogout,
} = require('../controllers/index');

module.exports = server => {
  server
    .route('/api/notes/:id')
    .get(getNotes)
    .delete(deleteNote);
  server
    .route('/api/notes')
    .post(addNote)
    .put(editNote);
  server.route('/api/notes/collab').post(addCollab);
  server.route('/api/users').post(userCreate);
  server.route('/api/login').post(userLogin);
  server.route('/api/logout').post(userLogout);
};
