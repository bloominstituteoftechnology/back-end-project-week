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
    owner: [{ type: String, required: true }]
})

module.exports = mongoose.model('Note', noteSchema)