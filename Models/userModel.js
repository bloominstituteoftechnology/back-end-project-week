const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 11;

const UserSchema = new Schema({
    
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
    },

    Password: {
        type: String,
        required: true,
    },
});


UserSchema.pre('Save', function(next) {
    let user = this;
    bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
});


UserSchema.methods.checkPassword = function(plainTextPw, cb) {
    bcrypt.compare(plainTextPw, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(isMatch);
    });
};



module.exports = mongoose.model('User', UserSchema);


// module.exports = userModel;





