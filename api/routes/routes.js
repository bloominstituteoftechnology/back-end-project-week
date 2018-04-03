const { userCreate } = require('../controllers/userCreate');
const { getNotes } = require('../controllers/getNotes');
const { addNote } = require('../controllers/addNote');
const { userLogin } = require('../controllers/userLogin');
const { userLogout } = require('../controllers/userLogout');

module.exports = server => {
  server.route('/api/login').post(userLogin);
  server.route('/api/notes/:id').get(getNotes);
  server.route('/api/notes/').post(addNote);
  server.route('/api/users').post(userCreate);
  server.route('/api/logout').post(userLogout);
};




//server.get('/api/notes', authenticate, getAllJokes);