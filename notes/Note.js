const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Note', noteSchema);