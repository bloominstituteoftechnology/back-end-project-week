const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength = 8
    }
})

// User.pre('save', function (next) {
//     bcrypt.hash(this.password, 11, (err, hash) => {
//         if (err) {
//             return next(err)
//         } else {
//             this.password = hash;
//             return next()
//         }
//     })
// })

module.exports = mongoose.model('User', User)