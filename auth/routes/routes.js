const { registerUser, getUsers, login } = require('../controllers');
const { generateToken } = require('../services/auth');
module.exports = server => {
  server.post('/login', login);
  server.post('/users', registerUser);
  server.route('/notes');
  server.get(generateToken, getNotes);
  server.post('/notes/create', createNote);
  server.put('/update');
  server.delete('/notes/delete', deleteNote);
};
