const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // key: { type: Number, unique: true },
    //key stops my db and cant figure out why so rollin.
    notesAuthor: [{ type: ObjectId, ref: 'User' }],
});

notesSchema.methods.getNotesTitle = function () {
    return this.title;
};

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
