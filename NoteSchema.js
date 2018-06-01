const mongoose = require('mongoose');

const definition = {
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
        createdOn: {
        type: Date,
        default: Date.now,
    },

}

const options = {
    timestamp: true
}
const noteSchema = new mongoose.Schema(definition, options);

const Note = mongoose.model('Note', noteSchema, 'notes');

module.exports = Note;