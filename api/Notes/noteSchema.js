const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

const NoteSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        unique: true
    },

    contents: {
        type: String,
        required: true
    },

    tags: {
        type: Array,
        default: []
    },

    timestamp: {
        type: Date,
        default: Date.now(),

    user: {
        type: ObjectId,
        ref: "User"
    }

    }
});

module.exports = mongoose.model('Note', NoteSchema);