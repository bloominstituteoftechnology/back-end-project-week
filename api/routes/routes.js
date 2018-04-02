const createUser = require('../controllers/createUser');
const addNote = require('../controllers/addNote');
const login = require('../controllers/login');


module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/notes').post(addNote);
  server.route('/api/login').post(login);
};