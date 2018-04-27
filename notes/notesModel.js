const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
});

const notesModel = mongoose.model('Note', noteSchema);

module.exports = notesModel;