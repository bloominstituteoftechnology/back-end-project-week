const mongoose = require('mongoose');

const Note = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The note title is required.'],
        maxlength: [20, 'The note title may only contain a maximum of 20 characters.'],
    },
    text: {
        type: String,
        required: [true, 'The note text content is required.'],
        maxlength: [1000, 'The note text content may only contain a maximum of 1000 characters.']
    }
});

module.exports = mongoose.model('Note', Note, 'notes'); 