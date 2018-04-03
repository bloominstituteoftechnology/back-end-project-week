const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title.']
    },
    description: {
        type: String,
    },
    createdOn: {
        type: String,
        default: new Date(),
    }
});

module.exports = mongoose.model('notes', NoteSchema);