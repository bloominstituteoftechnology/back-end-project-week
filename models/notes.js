const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    body: {
        type: String,
        required: true,
        unique: false
    },
    //references user collection of current logged in user
    User: {
        type: ObjectId,
        ref: "users"
    }
});

const notes = mongoose.model('notes', notesSchema);