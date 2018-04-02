const createUser = require('../controllers/createUser');
const addNote = require('../controllers/addNote');


module.exports = server => {
  server.route('/api/users').post(createUser);
  server.route('/api/notes').post(addNote);
};