const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const definition = {
    firstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now,
    },
};

const options = {
    timestamp: true
}

const userSchema = new mongoose.Schema(definition, options);
const userModel = mongoose.model('User', userSchema, 'users');
module.exports = userModel;