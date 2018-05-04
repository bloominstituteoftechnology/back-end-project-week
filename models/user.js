const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    googleId: String,
    note: {
        type: ObjectId,
        ref: "notes"
    }
});

const user =  mongoose.model('users', userSchema);