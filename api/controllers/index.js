const { createNote, editNote, deleteNote, viewNote } = require('./notes');
const { login } = require('./login');
const { createUser } = require('./user');

module.exports = {
	createNote, 
	editNote,
	deleteNote,
	viewNote,
	login,
	createUser
};
