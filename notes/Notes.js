const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    field: {
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
