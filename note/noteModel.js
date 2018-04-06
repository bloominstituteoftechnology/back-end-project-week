const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
	title: { type: String, required: true},
	content: { type: String, required: true},
	user: { type: ObjectId, ref: 'User', required: true },
	createdOn: {type: Date, default: Date.now },
	collab: { type: Boolean, default: false },
	collabUsers:[{type: ObjectId, ref: 'User'}]
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;