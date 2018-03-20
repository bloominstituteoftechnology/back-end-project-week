const mongoose = require('mongoose');
const { Schema } = mongoose;
const SALT = 11;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', next => {
    bcrypt.hash(this.password, SALT).then(hashedPass => {
        this.password = hashedPass;
        next();
    });
});

userSchema.methods.comparePass = (unencryptPass, match) => {
    bcrypt.compare(unencryptPass, this.password, (err, isMatch) => {
        if (err) return err;
        match(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);