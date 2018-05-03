const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
Title:{
    type: String,
    required: true,
    lowercase: false
},
Body:{
    type: String,
    required: true,
    lowercase: true

}

})
const noteModel = mongoose.model('Note', noteSchema);
module.exports = noteModel;