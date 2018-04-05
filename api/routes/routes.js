const cors = require('cors');

const { getNotes } = require('../controllers/getNotes');
const { addNote } = require('../controllers/addNote');
const { editNote } = require('../controllers/editNote');
const { deleteNote } = require('../controllers/deleteNote');
const { userCreate } = require('../controllers/userCreate');
const { userLogin } = require('../controllers/userLogin');
const { userLogout } = require('../controllers/userLogout');

module.exports = server => {
  server
    .options('*', cors())
    .route('/api/notes/:id')
    .get(getNotes)
    .delete(deleteNote);
  server
    .options('*', cors())
    .route('/api/notes/')
    .post(addNote)
    .put(editNote);
  server
    .options('*', cors())
    .route('/api/users')
    .post(userCreate);
  server
    .options('*', cors())
    .route('/api/login')
    .post(userLogin);
  server
    .options('*', cors())
    .route('/api/logout')
    .post(userLogout);
};

//server.get('/api/notes', authenticate, getAllJokes);
