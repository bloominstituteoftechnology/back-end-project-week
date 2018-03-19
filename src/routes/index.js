const { createUser, login } = require('../controllers');
const { validateToken } = require('../services/auth');

module.exports = server => {
	server.post('/api/login', login);
	server.post('/api/user', createUser);
}
