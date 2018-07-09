const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    notes: [{ type: ObjectId, ref: 'Note' }]
});

userSchema.pre('save', function(next) {
    return bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => next(err));
});

userSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', userSchema);
