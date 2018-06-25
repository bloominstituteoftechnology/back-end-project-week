const userRoutes = require('../users/userRoutes.js');
const authRoutes = require('../auth/authRoutes.js');
const noteRoutes = require('../notes/noteRoutes.js');

module.exports = function(server) {

	server.get('/', function(req, res) {
		res.send({ api: 'running' });
	});

	server.use('/api/users', userRoutes);
	server.use('/api/auth', authRoutes);
	server.use('/notes', noteRoutes);

};
