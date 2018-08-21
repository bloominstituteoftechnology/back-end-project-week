const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    text: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }  
})

module.exports = mongoose.model('Todo', TodoSchema);