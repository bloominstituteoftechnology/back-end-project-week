const mongoose = require("mongoose");
const User = require(`${__dirname}/User`);


const noteSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})


module.exports = mongoose.model("Note", noteSchema);