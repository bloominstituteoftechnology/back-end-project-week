const User = require('./model');

module.exports = {
  create: user => {
    return new User(user).save();
  },
  request: cb => {
    return User.getAllUsers(cb);
  },
  requestBy: query => {
    return User.findOne(query);
  },
  update: (_id, user) => {
    return User.findByIdAndUpdate(_id, user, { new: true });
  },
  del: _id => {
    return User.findByIdAndRemove({ _id });
  },
};
