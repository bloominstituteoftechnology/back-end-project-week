const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        dafault: Date.now,
    }
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;