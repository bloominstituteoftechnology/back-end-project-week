const mongoose = require('mongoose');

const noteModel = {
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
        required: true
    }
};

const noteSchema = new mongoose.Schema(nnoteModel);

module.exports = mongoose.model('Note', noteSchema);