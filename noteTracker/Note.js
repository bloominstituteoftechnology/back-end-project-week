const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as const { Scheama } = mongoose;

const Note = new Schema({
    title: {
        type: String,
        required: true
},
    body: {
        type: String,
        required: true
}
});

const NoteModel = mongoose.model('Note', Note);
module.exports = NoteModel;