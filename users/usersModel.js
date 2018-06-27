const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique:true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    }
})


module.exports = mongoose.model('users', userSchema, 'users');