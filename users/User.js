const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.Objectid;

const User = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  pass:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('User',User);
