const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.Objectid;

const User = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('User',User);
