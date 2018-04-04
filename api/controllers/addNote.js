const Note = require('../models/noteModel');
const User = require('../models/userModel');

const addNote = (req, res) => {
  const { title, content } = req.body;
  const author = req.decoded.id;
  const newNote = new Note({ author, title, content });

  newNote
    .save()
    .then(note => {
      res.status(200).json({ message: 'Note successfully saved.'});
    })
    .catch(err => {
      res.status(422).json({ message: 'Note could not be saved.', err});
    });
};

module.exports = addNote;
