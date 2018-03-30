const { createUser, getUsers, login } = require('../controllers');
const { validateToken } = require('../services/auth');
module.exports = server => {
	server.post('/login', login);
	server.post('/users', createUser)
	server.route('/notes')
		  .get(validateToken, getNotes);
 	server.post('/notes/create', createNote);
    server.put('/update');
    server.delete('/notes/delete', deleteNote);
};