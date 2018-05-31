const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    notes: {type: ObjectId, ref: 'Note'}
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 11, (err, hash) => {
        if (err) {
            return next(err);
        }

        this.password = hash;

        return next();
    });
});
UserSchema.methods.isPasswordValid = function(passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
  };

const User = mongoose.model('User', UserSchema );

module.exports = User;