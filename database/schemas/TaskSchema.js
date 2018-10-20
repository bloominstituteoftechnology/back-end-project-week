const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const { JWT_SECRET } = process.env;

const Schema = mongoose.Schema;

const Task = new Schema({
  userId: { type: String, require: true },
  taskName: { type: String, required: true },
  taskDescription: String
});

// verifyToken
Task.statics.verifyToken = async jwtToken => {
  try {
    const { username } = jwt.verify(jwtToken, JWT_SECRET);

    return await User.findOne({ username })
      .select('username')
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
  catch (err) {
    return { err: 'Error' };
  }
}

module.exports = Task;