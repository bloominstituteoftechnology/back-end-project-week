const mongoose = require('mongoose');
const ObjId = mongoose.Schema.Types.ObjectId;

const Note = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: ObjId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Note', Note);