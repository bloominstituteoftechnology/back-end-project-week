const mongoose = require('mongoose');

const Note = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the note'],
    },
    entry: {
        type: String,
    },
    timeStamp: {
        type: String,
        default: new Date(),
    },
    label: {
        type: String,
        enum: ['red', 'blue', 'tan', 'orange', 'purple', 'default'],
        default: 'default'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const NotesModel = mongoose.model('Note', Note);

module.exports = NotesModel;