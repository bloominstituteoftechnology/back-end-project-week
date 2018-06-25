const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    _id: {
       type: String,
       required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const notesModel = mongoose.model('Note', NoteSchema);

module.exports = notesModel; 