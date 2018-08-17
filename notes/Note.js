const mongoose = require('mongoose');

const Note = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [30, 'The note title may only contain a maximum of 30 characters.'],
    },
    text: {
        type: String,
        maxlength: [1000, 'The note text may only contain a maximum of 1000 characters.']
    }
});

module.exports = mongoose.model('Note', Note, 'notes'); 