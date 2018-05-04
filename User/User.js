const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const HASH = 10;

const userSchema = new mongoose.Schema({
    username: {
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
        text: String,
        id: Number,
    }]
});

userSchema.pre('save', function (next) {
    
    bcrypt.hash(this.password, HASH, (err, hash) => {
        if (err)
            return next(err);
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);  