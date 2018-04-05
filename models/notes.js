const mongoose = require('mongoose');

const Note = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the note'],
    },
    entry: {
        type: String,
    },
    dateCreated: {
        type: String,
        default: Date.now,
    },
    label: {
        type: String,
        enum: ['red', 'blue', 'tan', 'orange', 'purple', 'default'],
        default: 'default'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
Note.index({ title: 'text', entry: 'text' });
const NotesModel = mongoose.model('Note', Note);

module.exports = NotesModel;