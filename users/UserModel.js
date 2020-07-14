const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    } 
    ,notes: [{
        type: ObjectId,
        ref: 'Note'
    }]
});

// ---------------
//pre doesnt work cuz everytime we add a note to a user, it hashes the password again so u cant 
//log in 


// userSchema.methods.hashPassword = function(password) {
//     return bcrypt
//         .hash(password, 10)
//         .then(hash => {
//             this.password = hash;
//             return next();
//         })
//         .catch(err => {
//             return next(err);
//         });
// };

userSchema.methods.validatePassword = function (passwordGuess) {
    return bcrypt.compare(passwordGuess, this.password);
};

userSchema.methods.addNote = function(note_id) {
    // console.log(typeof this.notes.push)
    let arr = Array.from(this.notes)
    arr.push(note_id)
    this.notes = arr
    console.log(this.notes)
    return;
}



module.exports = mongoose.model('User', userSchema);
