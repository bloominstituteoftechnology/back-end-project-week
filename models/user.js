const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String
});

const user =  mongoose.model('users', userSchema);