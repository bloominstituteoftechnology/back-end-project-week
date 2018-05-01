const User = require('../Models/User');
const Note = require('../Models/Note');

const noteAdd = (req, res) => {
  const { title, content } = req.body;
  const author = req.decoded.id;

  if (author) {
    const newNote = new Note({ author, title, content });
    newNote
      .save()
      .then(savedNote => {
        res.status(200).json({ Message: 'Note successfully saved!' });
      })
      .catch(err => {
        res.status(500).json({ Error: `Unable to save new note: ${err}` });
      });
  } else {
    res.status(422).json({ Error: `User error: ${err}` });
  }
};

module.exports = noteAdd;
