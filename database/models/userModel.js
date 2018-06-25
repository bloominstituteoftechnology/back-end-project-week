const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt');

const userModel = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        minlength: 6,
        type: String
    },
    notes: [{
        title: {
            type: String,
            maxlength: 50,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    }],
    age: {
        type: Number
    },
    facebook: {
        type: String
    },
    phone: {
        type: String,
        minlength: 12
    }
})

userModel.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

userModel.methods.authenticate = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userModel)