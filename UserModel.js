const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT = 11;

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    notes:[{
        title: String,
        content: String,
        id: Number,
    }]
});

userSchema.pre('save', next => {
    bcrypt.hash(this.password, SALT, (err, hash) => {
        if (err)
            return next(err);
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);  
