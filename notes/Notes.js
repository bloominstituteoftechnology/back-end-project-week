const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    notesDate: String,
});

notesSchema.methods.getNotesTitle = function () {
    return this.title;
};

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
