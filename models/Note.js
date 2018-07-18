const mongoose = require('mongoose');
const { Schema } = mongoose;

const Note = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 15
    },
    content: {
        type: String,
        required: true,
        maxlength: 100
    }
})

module.exports = mongoose.model('Note', Note)