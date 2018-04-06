const { addCollab } = require('../controllers/addCollab');
const { getNotes } = require('../controllers/getNotes');
const { addNote } = require('../controllers/addNote');
const { editNote } = require('../controllers/editNote');
const { deleteNote } = require('../controllers/deleteNote');
const { userCreate } = require('../controllers/userCreate');
const { userLogin } = require('../controllers/userLogin');
const { userLogout } = require('../controllers/userLogout');

module.exports = server => {
  server
    .route('/api/notes/:id')
    .get(getNotes)
    .delete(deleteNote);
  server
    .route('/api/notes')
    .post(addNote)
    .put(editNote);
  server
    .route('/api/notes/collab')
    .post(addCollab)
  server.route('/api/users').post(userCreate);
  server.route('/api/login').post(userLogin);
  server.route('/api/logout').post(userLogout);
};

//server.get('/api/notes', authenticate, getAllJokes);
