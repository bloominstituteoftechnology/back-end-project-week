const mongoose = require('mongoose');
const Schema = mongoose.Schema; // same as const { Scheama } = mongoose;

const noteSchema = new Schema({
    title: String,
    body: String
});

mongoose.model('notes', noteSchema);