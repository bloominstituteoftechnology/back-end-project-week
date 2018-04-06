const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Note = require('../Models/noteModel')
const ObjectId = mongoose.Schema.Types.ObjectId

const NoteSchema = new Schema ({
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true,
    }
});

// const noteModel = mongoose.model('Note', noteSchema);

module.exports = mongoose.model('Note', NoteSchema);
