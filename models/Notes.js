const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as const { Scheama } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String
},
    body: {
        type: String
}
});

const NoteModel = mongoose.model('notes', noteSchema);