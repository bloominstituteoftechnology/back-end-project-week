const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 13

const UserSchema = Schema({
    
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        require: true,
        trim: true,
    }
});

UserSchema.pre('save', function(next) {
// https://github.com/kelektiv/node.bcrypt.js#usage
// Fill this middleware in with the Proper password encrypting, bcrypt.hash()
// if there is an error here you'll need to handle it by calling next(err);
// Once the password is encrypted, call next() so that your userController and create a user
bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
    })
});

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
    bcrypt.compare(plainTextPW, this.password, (err, matched) => {
        if (err) return callBack(err);
        if (!err && matched) callBack(null, matched);
    })
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
