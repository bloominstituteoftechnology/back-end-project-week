const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Notes: {
    //     type: ref,
    // },
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;