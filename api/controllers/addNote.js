const Note = require('../models/noteModel');
const User = require('../models/userModel');

const addNote = (req, res) => {
  const { title, content } = req.body;
  const author = req.decoded.id;

  if(author) {
    const newNote = new Note({ author, title, content });
  
    newNote
      .save()
      .then(note => {
        res.status(200).json({ message: 'Note successfully saved.', id: note.id });
      })
      .catch(err => {
        res.status(422).json({ message: 'Note could not be saved.', err});
      });
  } else {
    res.status(422).json({ message: 'Note could not be saved.', err});
  }
};

module.exports = addNote;
