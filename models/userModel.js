import { truncate } from 'fs';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
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
    notes: [{ type: ObjectId, ref: '' }]
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 12).then(hash => {
        this.password = hash;

        next();
    });
});

userSchema.methods.verifyPassword = function(guess, callBack) {
    bcrypt.compare(guess, this.password, function(err, isValid) {
        if(err) {
            return callBack(err);
        }
        
        callBack(null, isValid);
    });
};

module.exports = mongoose.model('User', userSchema, 'users');