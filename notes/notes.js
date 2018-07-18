const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    title : {
        type:String
    },
    text : {
        type:String
    }
})

const Note = mongoose.model('Notes',NotesSchema);

module.exports = Note;