const { userCreate } = require('../controllers/userCreate');
const { getNotes } = require('../controllers/getNotes');
const { addNote } = require('../controllers/addNote');
const { userLogin } = require('../controllers/userLogin');

module.exports = server => {
  //server.get('/api/notes', authenticate, getAllJokes);
  server
    .route('/api/notes/:id')
    .get(getNotes)
    .post(addNote);
  server.route('/api/users').post(userCreate);
  server.route('/api/login').post(userLogin);
};
