const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
});

module.exports = mongoose.model('User', User);