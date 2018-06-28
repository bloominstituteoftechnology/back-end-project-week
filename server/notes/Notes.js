const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},

	content: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Notes', notesSchema, 'notes');
//my lovely notes schema. It's pretty boring, but very functional.
