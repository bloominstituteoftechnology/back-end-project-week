const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title.']
    },
    description: {
        type: String,
    },
    tags: {
        type: String,
    },
    image: {
        type: String,
    },

});

module.exports = mongoose.model('Notes', NoteSchema);