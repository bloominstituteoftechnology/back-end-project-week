const mongoose = require('mongoose'); // import mongoose functionality

//define Schema definitions and options
const definitions = {
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tag: {
        type: String
    },
    image: {},
}

const options = {
    timestamps: true,
}

// Define the scheme as definitions and options
const noteScheme = new mongoose.Schema(definitions, options);

// define the note model using the scheme
const noteModel = mongoose.model('note', noteScheme, 'notes');

// export
module.exports = noteModel;