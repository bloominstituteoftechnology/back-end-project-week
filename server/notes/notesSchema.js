const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20
    },
    text: {
        type: String,
        required: true,
        maxlength: 1000
    }
}); 

module.exports = mongoose.model('Note', notesSchema, 'notes'); 