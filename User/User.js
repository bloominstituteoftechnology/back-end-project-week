import { ENGINE_METHOD_DIGESTS } from 'constants';
import { builtinModules } from 'module';

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        minLength: 6
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
});

User.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return err
        else {
            this.password = hash;
            next();
        }
    });    
});

User.methods.checkPassword = function(pass, cb) {
    return bcrypt.compare(pass, this.password, function(err, success) {
        if (success) return cb(null, success)
        else {
            return cb(err)
        }
    });
};

module.exports = mongoose.model('User', User);