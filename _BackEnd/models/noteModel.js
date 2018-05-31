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
    createdOn: {
        type: Date,
        default: Date.now,
    },
}

const options = {
    timestamps: true,
}

// Define the scheme as definitions and options
const noteScheme = new mongoose.Schema(definitions, options);

// define the note model using the scheme
const noteModel = mongoose.model('Note', noteScheme, 'notes');

// export
module.exports = noteModel;