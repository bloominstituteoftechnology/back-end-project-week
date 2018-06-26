const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  friendsRequest: [
    { 
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]

});

module.exports = User = mongoose.model('User', UserSchema);