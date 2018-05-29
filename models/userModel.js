const mongoose = require('mongoose'); // import mongoose functionality

//define Schema definitions and options
const definitions = {
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
const userScheme = new mongoose.Schema(definitions, options);

// define the user model using the scheme
const userModel = mongoose.model('User', userScheme, 'users');

// export
module.exports = userModel;