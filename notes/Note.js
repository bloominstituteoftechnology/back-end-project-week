const mongoose = require('mongoose');

const definition = {
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}

const options = {
    timestamp: true, 
    strict: false
}

const noteSchema = new mongoose.Schema(definition, options);

module.exports = mongoose.model('Note', noteSchema) 