const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
        min: 1,
        max: 120,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const options = {
    timestamps: true
};


const User = mongoose.model('User', UserSchema );

module.exports = User;