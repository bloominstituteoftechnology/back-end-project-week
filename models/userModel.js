const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const HASH_ROUNDS = 12;

const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50, 
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    active_Since: {
        type: Date,
    },
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, HASH_ROUNDS, (err,hash) => {
        if (err) {
            next(err);
        } else {
            this.password = hash;

            next();
        }
    })
});

userSchema.methods.checkPassword = function(originalPW, callBack) {
    bcrypt.compare(originalPW, this.password, function(err, isValid) {
        if (err) {
            return callBack(err);
        } 
            callBack(null, isValid);
    })
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;