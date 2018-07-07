const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config()
const salt_rounds = process.env.ROUNDS || 12;

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: process.env.MIN_LENGTH
    },
    confirmedPassword: {
        type:String,
    },
    firstName: {
        type:String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    cohort:{
        type: String,
        required: true
    }

});

authSchema.pre("save", function(next) { //works
    return bcrypt
        .hash(this.password, salt_rounds)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        })

});

authSchema.methods.validatePassword = function(guess){ //works
    return bcrypt.compare(guess, this.password);
};

const authModel = mongoose.model("Auth", authSchema, "auths");

module.exports = authModel;