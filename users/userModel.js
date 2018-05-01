const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('User', User);