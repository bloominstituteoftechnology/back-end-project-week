const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username or password'],
        lowercase: true,
        unique: [true, 'This username is already in use']
    },
    password: {
        type: String,
        required: [true, 'Please provide a username or password']
    },
    Notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }],
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;