const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    textBody: {
        type: String,
        required: true,
    }
});

const notesModel = mongoose.model('Note', NoteSchema);

module.exports = notesModel;
