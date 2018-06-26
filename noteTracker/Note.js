const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as const { Scheama } = mongoose;

const Note = new Schema({
    title: {
        type: String
},
    body: {
        type: String
}
});

const NoteModel = mongoose.model('Note', Note);
module.exports = NoteModel;