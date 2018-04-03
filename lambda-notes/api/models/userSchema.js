const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const COST = 11;

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    posts: []
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, COST, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    })
});

UserSchema.methods.checkPassword = function (plainPassword, callBack) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return callBack(err);
        callBack(null, isMatch);
    })
};


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;