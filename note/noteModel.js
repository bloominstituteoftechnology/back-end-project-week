const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 24
    },
    content: {
        type: String,
        maxlength: 240,
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;