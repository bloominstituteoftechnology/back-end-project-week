const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        passwordHash: String,
        required: true,
        minlength: 8,
    },
});

UserSchema.pre('save', function(next){
    bcrypt.hash (this.password, 2, (err,hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;

        return next();
    });
});

UserSchema.methods.isPasswordValid = function(password){
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Users', UserSchema, );