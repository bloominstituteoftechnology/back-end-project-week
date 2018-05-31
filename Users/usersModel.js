const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 11;


//User Model Schema
const userModel = mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
    },
});

//Add in Bcrypt for PW hashing
userModel.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        return next();
    })
});

userModel.methods.checkPassword = function (plainTextPW, callBack) {
    return bcrypt.compare(plainTextPW, this.password, function(err, isValid) {
        if(err) {
            return callBack(err);
        }
        callBack(null, isValid)
    })
};

module.exports = mongoose.model('User', userModel);