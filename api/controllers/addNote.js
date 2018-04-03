const User = require('../models/userModel');
const Note = require('../models/noteModel');

const addNote = (req, res) => {
  const { title, content, userId } = req.body;
  const note = { title, content };
  const newNote = new Note(note);

  newNote
    .save()
    .then(note => {
      const id = note._id;
      User.findOneAndUpdate({ _id: userId }, { $push: { notes: id } })
        .then(() => {
          res.status(201).send(note);
        })
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
};

module.exports = {
  addNote,
};
