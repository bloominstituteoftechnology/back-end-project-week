const mongoose = require('mongoose');

const Notes = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unqiue: true
    },
    content: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.model('Notes', Notes)