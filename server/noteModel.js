const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
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
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

const notesModel = mongoose.model('Note', NoteSchema);

module.exports = notesModel; 