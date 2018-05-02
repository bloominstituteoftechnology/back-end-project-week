const {model, Schema} = require("mongoose");
const User = require(`${__dirname}/User`);


const noteSchema = new Schema({
    body:{
        type: String,
        required: true,
    },
    userRef: {
        type: Schema.Types.ObjectId,
        ref:'User',
    }
})


module.exports = model("Note", userSchema);