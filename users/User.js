const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const User = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  notes:[{
    type:ObjectId,
    ref:"Note"
  }],
});

User.methods.comparePassword = function(input){
  return bcrypt.compareSync(input,this.password);
};

module.exports = mongoose.model('User',User);
