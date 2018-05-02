const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
title:{
    type: String,
    unique: true,
    required: true,
    lowercase: false
},
body:{
    type: String,
    required: true,
    lowercase: true

}

})
const noteModel = mongoose.model('Note', noteSchema);
module.exports = noteModel;