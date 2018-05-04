const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    note: {
        type: ObjectId,
        ref: "notes"
    }
});

const user =  mongoose.model('users', userSchema);