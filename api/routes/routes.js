const { userCreate } = require('../controllers/userCreate');
const { getNotes } = require('../controllers/getNotes');
const { addNote } = require('../controllers/addNote');

module.exports = server => {
  server
    .route('/api/notes')
    .get(getNotes)
    .post(addNote);
  server
  .route('/api/users')
  .post(userCreate);
  server
  .route('/api/login'); //.post(login);
};
