const mongoose = require('mongoose');
const { Schema } = mongoose;
const SALT = 11;

const UsersSchema = new Schema({
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

UsersSchema.pre('save', next => {
    bcrypt.hash(this.password, SALT).then(hashedPass => {
        this.password = hashedPass;
        next();
    });
});

UsersSchema.methods.comparePass = (unencryptPass, match) => {
    bcrypt.compare(unencryptPass, this.password, (err, isMatch) => {
        if (err) return err;
        match(null, isMatch);
    });
};

module.exports = mongoose.model('User', UsersSchema);