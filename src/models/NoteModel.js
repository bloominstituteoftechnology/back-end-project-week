const mongoose = require('mongoose');

require('./UserModel');

const NoteSchema = new mongoose.Shcema({

	title: {
		type: String,
		required: true,
		index: true
	},
	body: {
		type: String
	},
	users: [{ type: mongoose.Shcema.Types.ObjectId, ref: 'User'}],
	cretedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
