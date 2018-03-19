const { createUser, getUsers, login } = require('../controllers');
const { validateToken } = require('../services/auth');
module.exports = server => {
	server.post('/login', login);
	server.route('/users')
		  .post(createUser)
		  .get(validateToken, getUsers);
};