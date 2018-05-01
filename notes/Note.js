const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = mongoose.Schema({
  name:{
    type:String, 
    required:true
  }
});

module.exports = mongoose.model('Note',Note);
