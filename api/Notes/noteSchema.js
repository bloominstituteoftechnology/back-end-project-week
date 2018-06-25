const mongoose = require('mongoose');

const Note = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    contents: {
        type: String,
        required: true
    },

    tags: {
        type: Array,
        default: []
    },

    timestamp: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Note', Note);