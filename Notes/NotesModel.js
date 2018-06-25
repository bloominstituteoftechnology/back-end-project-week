const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 

const NotesModel = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    }, 
    text: {
        type: String,
        required: true, 
    }
});

module.exports = mongoose.model('NotesModel', NotesModel); 