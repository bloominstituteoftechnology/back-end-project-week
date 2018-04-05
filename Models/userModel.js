const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 11;
const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    Password: {
        type: String,
        required: true,
    },
});


userSchema.pre('Save', function(next) {
    bcrypt.hhash(this.password, SALT_ROUNDS, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
});


userSchema.methods.checkPassword = function(plainTextPw, cb) {
    bcrypt.compare(plainTextPw, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(isMatch);
    });
};
// const userModel = mongoose.model('User', userSchema);


module.exports = mongoose.model('User', userSchema);





