const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    paragraph: {
        type: String,
        required: true,
    }
});


NotesSchema.methods.getNotesTitle = function() {
    return this.title;
};

const Note = mongoose.model('Note', NotesSchema);

module.exports = Note;