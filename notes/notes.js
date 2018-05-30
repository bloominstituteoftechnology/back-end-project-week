const mongoose = require('mongoose');

//New schema
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Note', NoteSchema);