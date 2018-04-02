const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String, required: true, unique: true},
	createdOn: {type: Date, default: Date.now}
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;




