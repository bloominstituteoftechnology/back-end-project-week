const mongoose = require('mongoose');

const Note = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    entry: {
        type: String,
    },
    timeStamp: {
        type: String,
        default: new Date(),
    }
});

const NotesModel = mongoose.model('Note', Note);

module.exports = NotesModel;