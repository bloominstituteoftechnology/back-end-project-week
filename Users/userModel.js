const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;



const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    notes: [{type: ObjectId, ref: 'Note'}]
})


module.exports = mongoose.model('User', User) 