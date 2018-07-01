const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
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
    notes: [{ type: ObjectId, ref: 'Note' }],
});

UserSchema.pre('save', function(next) {
    return bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        });
});

UserSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
}

module.exports = mongoose.model('User', UserSchema);