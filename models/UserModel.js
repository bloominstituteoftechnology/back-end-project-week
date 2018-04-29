const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Salt_Rounds = 12;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: Number,
    notes: [{ type: ObjectId, ref: ''}],
});

UserSchema.pre('save', function(next) {
    console.log('saved');
    bcrypt.hash(this.password, Salt_Rounds, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        return next();
    });
});

UserSchema.methods.checkPassword = function (plainTextPW, callback) {
    bcrypt.compare (plainTextPW, this.password, (error, isValid) => {
        if (error) {
            return callback(error);
        }
        callback(null, isValid);
    });
};

UserSchema.methods.getUserName = function () {
    return this.username;
};

UserSchema.statics.getAllData = async function () {
    try{
        const data = await UserSchema.find({});
        return data;
    } catch (error) {
        return error;
    }
};

UserSchema.path('password').validate(function(password) {
    return password && password.length >= 5;
}, 'Password must contain five characters');

module.exports = mongoose.model('User', UserSchema, 'users');