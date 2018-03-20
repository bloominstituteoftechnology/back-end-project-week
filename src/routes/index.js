const { createUser, login } = require('../controllers/UserController');
const {
	createNote,
	getNotes,
	getNoteById,
	updateNote,
	deleteNote
} = require('../controllers/NoteController');
const { validateToken } = require('../services/auth');

module.exports = server => {
	server.post('/api/login', login);
	server.post('/api/user', createUser);
	server
		.route('/api/notes')
		.post(createNote)
		.get(validateToken, getNotes);

	server
		.route('/api/notes/:id')
		.get(getNoteById)
		.put(updateNote)
		.delete(deleteNote);
}
