const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

require('./userModels.js');

const NoteSchema = new mongoose.Schema({
 author: {
   type: ObjectId,
   required: true,
	 ref: 'User'
 },
 title: {
   type: String,
	 required: true,
 },
 content: {
   type: String,
	 required: true,
 },
 createdOn: {
   type: Date,
   default: Date.now
 }
});

const noteModel = mongoose.model('Note', NoteSchema);

module.exports = noteModel;
