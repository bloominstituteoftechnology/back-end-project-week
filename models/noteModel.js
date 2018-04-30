const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Note', noteSchema);