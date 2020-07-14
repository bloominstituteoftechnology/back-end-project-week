const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title : {
        type:String
    },
    text : {
        type:String
    },
    owner : {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User'
    }
})

const Note = mongoose.model('Note',NotesSchema);

module.exports = Note;