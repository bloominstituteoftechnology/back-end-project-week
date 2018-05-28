const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
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
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;