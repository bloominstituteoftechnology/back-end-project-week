const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
});

NoteSchema.methods.getNoteTitle = function() {
    return this.title;
};

NoteSchema.methods.getNoteContent = function() {
    return this.content.length;
};

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note; 