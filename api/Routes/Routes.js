const { authenticate } = require('../Utils/middleware');
const userCreate = require('../Controllers/userCreate');
const userLogin = require('../Controllers/userLogin');
const noteAdd = require('../Controllers/noteAdd');
const noteDelete = require('../Controllers/noteDelete');
const noteEdit = require('../Controllers/noteEdit');
const noteGet = require('../Controllers/noteGet');

module.exports = server => {
  server.get('/api/notes', authenticate, noteGet);
  server.route('/api/notes').post(authenticate, noteAdd);
  server.route('/api/routes').delete(authenticate, noteDelete);
  server.route('/api/notes').put(authenticate, noteEdit);
  server.route('/api/login').post(userLogin);
  server.route('/api/signup').post(userCreate);
};
