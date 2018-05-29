const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteModel = new Schema({
    title :{
        type: String,
        required: true
    },
    content :{
        type: String,
        required: true
    }
})

const Note = mongoose.model('Note', noteModel);

module.exports = Note;
