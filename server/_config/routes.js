const userRoutes = require('../users/userRoutes.js');
const authRoutes = require('../auth/authRoutes.js');
const noteRoutes = require('../notes/noteRoutes.js');

module.exports = function(server) {

	server.get('/', function(req, res) {
		res.send({ api: 'running' });
	});

	server.use('/notes/users', userRoutes);
	server.use('/notes/auth', authRoutes);
	server.use('/notes', noteRoutes);

};

//This is kind of like Mother Russia, a riddle wrapped in a mystery inside an enigma. At least in terms of nesting. I call my individual route files here, set up where they should direct. Then in my server.js, I call this file. I once had a server.js file that was over 300 lines long and this is my fancy way of avoiding such things. It does make sense, I swear. This could also just be set up in server.js if it seems too confusing to have it nested this way.
//I set it up so that the base route just shows that the api is running. Once connected with the front end, the base route becomes /notes, so that the user does not have to go to homepage.com/notes, they can just use homepage.com. I set up user and auth routes for later, if I ever get auth up and running.
