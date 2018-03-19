const User = require('./model');

module.exports = {
  create: user => {
    return new User(user).save();
  },
  // request: cb => {
  //   return Note.getAllNotes(cb);
  // },
  // requestBy: _id => {
  //   return Note.findOne({ _id });
  // },
  // update: (_id, note) => {
  //   return Note.findByIdAndUpdate(_id, note, { new: true });
  // },
  // del: _id => {
  //   return Note.findByIdAndRemove({ _id });
  // },
};
