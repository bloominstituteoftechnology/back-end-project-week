const mongoose = require("mongoose");
const User = require(`${__dirname}/User`);

const noteSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true,
    },
    userRef: User._id.$oid
})