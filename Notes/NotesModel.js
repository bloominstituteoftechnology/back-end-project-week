const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const ObjectId = mongoose.Schema.Types.ObjectId; 

const NotesModel = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    }, 
    text: {
        type: String,
        required: true, 
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Note', NotesModel, 'notes'); 