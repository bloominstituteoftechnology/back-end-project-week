const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
        default: "Insert Body"
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Note', Note);