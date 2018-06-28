const mongoose = require('mongoose');


const noteModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('noteModel', noteModel)