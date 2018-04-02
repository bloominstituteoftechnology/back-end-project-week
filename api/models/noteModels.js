const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

require('./userModels.js');

const NoteSchema = new mongoose.Schema({
 user: {
   type: ObjectId,
	 ref: 'User'
 },
 title: {
   type: String,
	 required: true,
 },
 content: {
   type: String,
	 required: true,
 }
});

const noteModel = mongoose.model('Note', NoteSchema);

module.exports = noteModel;
