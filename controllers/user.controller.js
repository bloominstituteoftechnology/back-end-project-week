const mongoose = require('mongoose');
const User = mongoose.model('User');

const Users = mongoose.model('User');

function setUserInfo(req) {
  const getUserInfo = {
    _id: req._id,
    username: req.username,
    email: req.email,
  };

  return getUserInfo;
}

exports.createUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return (err)
    if (user) return (null, false, { error: 'That email is already in use.' });
    let newUser = new User({ email, password }).save();
  });
  next();
};

exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
};