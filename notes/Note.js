const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Note = mongoose.Schema({
  title:{
    type:String, 
    required:true
  },
  text:{
    type:String
  },
  username:{
    type:String
  }
});

module.exports = mongoose.model('Note',Note);
