const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    tag: String,
    author: [{ type: ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Note', noteSchema)