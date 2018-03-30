const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const NoteSchema = mongoose.Schema({
	title: {
		type: String,
		lowercase: true,
		required: true
	},
	body: {
		type: String,
		lowercase: true,
		required: true
	},
	username: {
		type: String,
		lowercase: true
	}
});

// mongoose.connect('mongodb://localhost/notes-db');

module.exports = mongoose.model('Notes', NoteSchema);
