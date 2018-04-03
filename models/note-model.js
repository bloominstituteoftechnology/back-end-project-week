const mongoose = require('mongoose');
const { Schema } = mongoose;

const Note = new Schema({
    title: {
        type: String,
    },
    content: {
        required: true,
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

Note.methods.getNoteTitle = function() {
    return this.noteTitle;
};

Note.statics.getNotes = (cb) => {
    Note.find({}, (err, users) => {
        if (err) console.error(err);
        cb(users);
    });
};

const NoteModel = mongoose.model('Note', Note);

module.exports = NoteModel;