const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config.json');

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

User.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, config.BCRYPT_COST)
        .then(hashed => {
            user.password = hashed;
            next();
        })
        .catch(err => {
            throw new Error(err);
        })
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;