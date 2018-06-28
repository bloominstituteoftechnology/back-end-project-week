const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 4,
    },
    notes: [{
        type: ObjectId,
        ref: 'Note'
    }] 
});

const User = mongoose.model('User', UserSchema);

UserSchema.pre('save', function(next) {
    bcrypt
        .hash(this.password, 12, (error, hash) => {
            if (error) {
                return next(error);
            }
            this.password = hash
            return next();
        });
});

UserSchema.methods.validatePassword = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
}


module.exports = User;
