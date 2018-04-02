const createUser = require('../controllers/createUser');


module.exports = server => {
  server.route('/api/users').post(createUser);
};