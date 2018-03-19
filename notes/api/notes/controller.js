const Note = require('./model');

module.exports = {
  create: note => {
    return new Note(note).save();
  },
  request: cb => {
    return Note.getAllNotes(cb);
  },
  requestBy: _id => {
    return Note.findOne({ _id });
  },
  update: (_id, note) => {
    return Note.findByIdAndUpdate(_id, note, { new: true });
  },
  del: _id => {
    return Note.findByIdAndRemove({ _id });
  },
};
